export interface XPEvent {
  type: string;
  points: number;
}

export interface GamerState {
  xp: number;
  streakDays: number;
  unlocked: string[];
  lastActionDate: string | null;
}

const KEY = 'cohortai_gamification_v1';

const defaultState: GamerState = {
  xp: 0,
  streakDays: 0,
  unlocked: [],
  lastActionDate: null,
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function readState(): GamerState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function writeState(state: GamerState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function awardXP(event: XPEvent, unlock?: string) {
  const state = readState();
  const today = todayKey();
  const last = state.lastActionDate;

  let streakDays = state.streakDays || 0;
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streakDays = last === yesterday ? streakDays + 1 : 1;
  }

  const unlocked = unlock && !state.unlocked.includes(unlock)
    ? [...state.unlocked, unlock]
    : state.unlocked;

  const next = {
    xp: state.xp + event.points,
    streakDays,
    unlocked,
    lastActionDate: today,
  };

  writeState(next);
  return next;
}
