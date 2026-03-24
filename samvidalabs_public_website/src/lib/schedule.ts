import React from "react";
import { site } from "./site";

export type Schedule = {
  updatedAt?: string;
  byCity: Record<string, string>;
};

function safeParse(text: string): Schedule | null {
  try {
    const obj = JSON.parse(text);
    if (!obj || typeof obj !== "object") return null;
    if (!obj.byCity || typeof obj.byCity !== "object") return null;
    return { updatedAt: obj.updatedAt, byCity: obj.byCity };
  } catch {
    return null;
  }
}

export function useSchedule() {
  const [schedule, setSchedule] = React.useState<Schedule>(site.scheduleFallback);

  React.useEffect(() => {
    const key = "cohortai_schedule_cache_v1";
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = safeParse(cached);
      if (parsed) setSchedule(parsed);
    }

    if (!site.scheduleUrl) return;

    fetch(site.scheduleUrl, { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => {
        const parsed = safeParse(t);
        if (parsed) {
          setSchedule(parsed);
          localStorage.setItem(key, JSON.stringify(parsed));
        }
      })
      .catch(() => {});
  }, []);

  return schedule;
}
