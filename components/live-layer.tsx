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
  "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f472b6",
  "#fb7185", "#22d3ee", "#a3e635", "#facc15",
];

type CursorState = { x: number; y: number; name: string; color: string };
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

export function LiveLayer() {
  const [cursors, setCursors] = useState<Record<string, CursorState>>({});
  const [onlineCount, setOnlineCount] = useState(1);
  const [reserveCount, setReserveCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [me, setMe] = useState<{ user: string; name: string; color: string } | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastBroadcastRef = useRef(0);
  const notifIdRef = useRef(0);

  // Init identity on mount (client only, avoids hydration mismatch)
  useEffect(() => {
    setMe(getOrCreateIdentity());
  }, []);

  // Subscribe to the realtime channel
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
      channel.send({
        type: "broadcast",
        event: "cursor_leave",
        payload: { user: me.user },
      });
      supabase.removeChannel(channel);
    };
  }, [me]);

  // Broadcast my cursor position (throttled)
  useEffect(() => {
    if (!me) return;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastBroadcastRef.current < 50) return; // throttle to ~20/sec
      lastBroadcastRef.current = now;
      const ch = channelRef.current;
      if (!ch) return;
      ch.send({
        type: "broadcast",
        event: "cursor",
        payload: {
          user: me.user,
          name: me.name,
          color: me.color,
          x: e.clientX / window.innerWidth,
          y: (e.clientY + window.scrollY) / document.documentElement.scrollHeight,
        },
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [me]);

  // Listen for reserve clicks anywhere on the page
  const handleReserve = useCallback(() => {
    if (!me || !channelRef.current) return;
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

  return (
    <>
      {/* Live presence pill, top-right */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur px-3 py-1.5 text-xs text-zinc-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-medium">{onlineCount}</span>
        <span className="text-zinc-500">exploring Serin</span>
      </div>

      {/* Reserve counter, below the pill */}
      {reserveCount > 0 && (
        <div className="fixed top-16 right-6 z-50 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur px-3 py-1.5 text-xs text-zinc-400">
          <span className="font-medium text-zinc-200">{reserveCount}</span> reservation
          {reserveCount === 1 ? "" : "s"} this session
        </div>
      )}

      {/* Notification stack, bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="animate-in slide-in-from-right-4 fade-in duration-300 rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur px-4 py-3 shadow-lg text-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: n.color }}
              />
              <span>
                <span className="font-medium text-zinc-100">{n.name}</span>
                <span className="text-zinc-400"> reserved early access</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Remote cursors */}
      {Object.entries(cursors).map(([id, c]) => (
        <div
          key={id}
          className="pointer-events-none fixed z-40 transition-transform duration-75"
          style={{
            left: `${c.x * 100}vw`,
            top: `${c.y * document.documentElement.scrollHeight}px`,
            transform: "translate(-2px, -2px)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2.5 2L17 8.5L9 11L7 17L2.5 2Z"
              fill={c.color}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <div
            className="absolute left-4 top-4 rounded-md px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap shadow"
            style={{ backgroundColor: c.color }}
          >
            {c.name}
          </div>
        </div>
      ))}
    </>
  );
}