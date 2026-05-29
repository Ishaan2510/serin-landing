"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

const NAMES = [
  "Alex", "Jordan", "Sam", "Riley", "Casey", "Avery", "Quinn", "Rowan",
  "Sage", "Blake", "Cameron", "Drew", "Emerson", "Finley", "Harper", "Kai",
  "Logan", "Morgan", "Parker", "Reese", "Skyler", "Taylor",
];

const COLORS = [
  "#C4553A", "#C4903A", "#4A8C5C", "#6B8CA3", "#8B6B99", "#A0785A",
];

const SECTION_NAMES: Record<string, string> = {
  hero: "the hero",
  features: "Features",
  how: "How it works",
  testimonials: "Testimonials",
  cta: "Reserve early access",
};

type CursorState = {
  x: number;        // fraction within the section's bounding box
  y: number;        // fraction within the section's bounding box
  section: string;
  name: string;
  color: string;
};
type PresenceState = { user: string; name: string; color: string; online_at: string };
type Notification = { id: number; name: string; color: string };

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getOrCreateIdentity() {
  if (typeof window === "undefined") return { user: "", name: "", color: "" };
  let user = sessionStorage.getItem("serin_user");
  let name = sessionStorage.getItem("serin_name");
  let color = sessionStorage.getItem("serin_color");
  if (!user || !name || !color) {
    user = crypto.randomUUID();
    name = pick(NAMES);
    color = pick(COLORS);
    sessionStorage.setItem("serin_user", user);
    sessionStorage.setItem("serin_name", name);
    sessionStorage.setItem("serin_color", color);
  }
  return { user, name, color };
}

function findSectionAtPoint(clientX: number, clientY: number) {
  // Get the section element under this client point
  const el = document.elementFromPoint(clientX, clientY);
  if (!el) return null;
  const section = el.closest("section[id], [data-section]") as HTMLElement | null;
  if (!section) return null;
  const id = section.id || section.dataset.section;
  if (!id) return null;
  const rect = section.getBoundingClientRect();
  // Position within the section
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  return { id, x, y };
}

function getMySection(): string | null {
  // Section under the center of my viewport
  const mid = findSectionAtPoint(window.innerWidth / 2, window.innerHeight / 2);
  return mid?.id || null;
}

export function LiveLayer() {
  const [cursors, setCursors] = useState<Record<string, CursorState>>({});
  const [onlineCount, setOnlineCount] = useState(1);
  const [reserveCount, setReserveCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [me, setMe] = useState<{ user: string; name: string; color: string } | null>(null);
  const [mySection, setMySection] = useState<string | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const subscribedRef = useRef(false);
  const lastBroadcastRef = useRef(0);
  const notifIdRef = useRef(0);

  useEffect(() => {
    setMe(getOrCreateIdentity());
  }, []);

  // Track which section the viewer is currently looking at
  useEffect(() => {
    const update = () => setMySection(getMySection());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [me]);

  useEffect(() => {
    if (!me) return;

    const channel = supabase.channel("serin-landing", {
      config: { presence: { key: me.user } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<PresenceState>();
        setOnlineCount(Object.keys(state).length);
      })
      .on("broadcast", { event: "cursor" }, ({ payload }) => {
        if (payload.user === me.user) return;
        setCursors((prev) => ({
          ...prev,
          [payload.user]: {
            x: payload.x,
            y: payload.y,
            section: payload.section,
            name: payload.name,
            color: payload.color,
          },
        }));
      })
      .on("broadcast", { event: "cursor_leave" }, ({ payload }) => {
        setCursors((prev) => {
          const next = { ...prev };
          delete next[payload.user];
          return next;
        });
      })
      .on("broadcast", { event: "reserve" }, ({ payload }) => {
        if (payload.user === me.user) return;
        setReserveCount((c) => c + 1);
        const id = ++notifIdRef.current;
        setNotifications((prev) => [
          ...prev,
          { id, name: payload.name, color: payload.color },
        ]);
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 4000);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          subscribedRef.current = true;
          await channel.track({
            user: me.user,
            name: me.name,
            color: me.color,
            online_at: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;

    return () => {
      subscribedRef.current = false;
      if (channel.state === "joined") {
        channel.send({
          type: "broadcast",
          event: "cursor_leave",
          payload: { user: me.user },
        });
      }
      supabase.removeChannel(channel);
    };
  }, [me]);

  // Broadcast cursor as a position within the section it's hovering over
  useEffect(() => {
    if (!me) return;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastBroadcastRef.current < 50) return;
      lastBroadcastRef.current = now;
      const ch = channelRef.current;
      if (!ch || !subscribedRef.current) return;

      const loc = findSectionAtPoint(e.clientX, e.clientY);
      if (!loc) return;

      ch.send({
        type: "broadcast",
        event: "cursor",
        payload: {
          user: me.user,
          name: me.name,
          color: me.color,
          section: loc.id,
          x: loc.x,
          y: loc.y,
        },
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [me]);

  const handleReserve = useCallback(() => {
    if (!me || !channelRef.current || !subscribedRef.current) return;
    setReserveCount((c) => c + 1);
    const id = ++notifIdRef.current;
    setNotifications((prev) => [...prev, { id, name: me.name, color: me.color }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
    channelRef.current.send({
      type: "broadcast",
      event: "reserve",
      payload: { user: me.user, name: me.name, color: me.color },
    });
  }, [me]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button")?.textContent?.includes("Reserve early access")) {
        handleReserve();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handleReserve]);

  // Compute cursors to render (only those in MY current section)
  const cursorsInMySection = Object.entries(cursors).filter(
    ([, c]) => c.section === mySection,
  );
  // Visitors elsewhere (for the "viewing other sections" indicator)
  const elsewhere = Object.values(cursors).filter((c) => c.section !== mySection);
  // Group elsewhere by section
  const elsewhereBySection: Record<string, CursorState[]> = {};
  elsewhere.forEach((c) => {
    if (!elsewhereBySection[c.section]) elsewhereBySection[c.section] = [];
    elsewhereBySection[c.section].push(c);
  });

  return (
    <>
      {/* Presence pill */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/80 font-medium">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="tabular-nums">{onlineCount}</span>
        <span className="text-muted-foreground">exploring Serin</span>
      </div>

      {/* Reserve counter */}
      {reserveCount > 0 && (
        <div className="fixed top-[60px] right-5 z-50 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums">{reserveCount}</span>{" "}
          reservation{reserveCount === 1 ? "" : "s"} this session
        </div>
      )}

      {/* "Viewing other sections" indicator */}
      {elsewhere.length > 0 && (
        <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-1.5 max-w-[260px]">
          {Object.entries(elsewhereBySection).slice(0, 3).map(([sectionId, people]) => (
            <div
              key={sectionId}
              className="rounded-lg glass px-3 py-2 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {people.slice(0, 3).map((p, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full ring-2 ring-background"
                      style={{ background: p.color }}
                    />
                  ))}
                </div>
                <span>
                  {people.length === 1 ? (
                    <><span className="font-medium text-foreground">{people[0].name}</span> on {SECTION_NAMES[sectionId] || sectionId}</>
                  ) : (
                    <><span className="font-medium text-foreground">{people.length}</span> on {SECTION_NAMES[sectionId] || sectionId}</>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notifications */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="animate-in slide-in-from-right-4 fade-in duration-300 rounded-xl glass px-4 py-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: n.color }}
              />
              <span>
                <span className="font-semibold text-foreground">{n.name}</span>
                <span className="text-muted-foreground"> reserved early access</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cursors: only render those in the same section as me, positioned relative to the section box */}
      {mySection && cursorsInMySection.map(([id, c]) => {
        const section = document.getElementById(c.section) || document.querySelector(`[data-section="${c.section}"]`);
        if (!section) return null;
        const rect = section.getBoundingClientRect();
        const left = rect.left + c.x * rect.width;
        const top = rect.top + c.y * rect.height;
        return (
          <div
            key={id}
            className="pointer-events-none fixed z-40"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              transition: "left 80ms linear, top 80ms linear",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: "block" }}>
              <path
                d="M3 2L19 9.5L11.5 12.5L8.5 19.5L3 2Z"
                fill={c.color}
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className="absolute left-5 top-5 rounded-md px-2 py-0.5 text-[11px] font-medium text-white whitespace-nowrap shadow"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </div>
          </div>
        );
      })}
    </>
  );
}