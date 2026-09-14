import type { ISODate } from "@/lib/date";
import { toggleMark } from "./engine";
import { seedHabits } from "./seed";
import type { Habit, HabitDraft, StudioState } from "./types";

export type Action =
  | { type: "create"; draft: HabitDraft; today: ISODate; id?: string }
  | { type: "update"; id: string; draft: HabitDraft }
  | { type: "toggle"; id: string; day: ISODate }
  | { type: "shelve"; id: string; today: ISODate }
  | { type: "unshelve"; id: string }
  | { type: "remove"; id: string }
  | { type: "move"; id: string; direction: -1 | 1 }
  | { type: "seed"; today: ISODate }
  | { type: "clear" };

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `h_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** All state transitions in one pure function, so they can be tested directly. */
export function reducer(state: StudioState, action: Action): StudioState {
  switch (action.type) {
    case "create": {
      const habit: Habit = {
        id: action.id ?? newId(),
        ...action.draft,
        createdAt: action.today,
        shelvedAt: null,
        marks: {},
      };
      return { ...state, habits: [...state.habits, habit] };
    }
    case "update":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, ...action.draft } : habit,
        ),
      };
    case "toggle":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? toggleMark(habit, action.day) : habit,
        ),
      };
    case "shelve":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, shelvedAt: action.today } : habit,
        ),
      };
    case "unshelve":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, shelvedAt: null } : habit,
        ),
      };
    case "remove":
      return { ...state, habits: state.habits.filter((habit) => habit.id !== action.id) };
    case "move": {
      const index = state.habits.findIndex((habit) => habit.id === action.id);
      const target = index + action.direction;
      if (index < 0 || target < 0 || target >= state.habits.length) return state;
      const habits = [...state.habits];
      [habits[index], habits[target]] = [habits[target], habits[index]];
      return { ...state, habits };
    }
    case "seed":
      return { version: 1, habits: seedHabits(action.today) };
    case "clear":
      return { version: 1, habits: [] };
  }
}
