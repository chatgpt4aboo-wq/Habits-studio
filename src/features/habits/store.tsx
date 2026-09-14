/* eslint-disable react-refresh/only-export-components -- the provider and its
   hook are one unit; splitting them would only please the linter. */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { todayISO, type ISODate } from "@/lib/date";
import { reducer } from "./reducer";
import { clearState, loadState, saveState } from "./storage";
import { seedHabits } from "./seed";
import type { Habit, HabitDraft, StudioState } from "./types";

export interface StudioApi {
  habits: Habit[];
  active: Habit[];
  shelved: Habit[];
  today: ISODate;
  create: (draft: HabitDraft) => void;
  update: (id: string, draft: HabitDraft) => void;
  toggle: (id: string, day?: ISODate) => void;
  shelve: (id: string) => void;
  unshelve: (id: string) => void;
  remove: (id: string) => void;
  move: (id: string, direction: -1 | 1) => void;
  loadSeed: () => void;
  reset: () => void;
  exportJSON: () => string;
}

const StudioContext = createContext<StudioApi | null>(null);

/** First run gets the demo studio; returning visitors get their own data. */
function initialState(): StudioState {
  return loadState() ?? { version: 1, habits: seedHabits() };
}

export function StudioProvider({
  children,
  initial,
}: {
  children: ReactNode;
  /** Escape hatch for tests and stories. */
  initial?: StudioState;
}) {
  const [state, dispatch] = useReducer(reducer, initial, (seed) => seed ?? initialState());
  const hydrated = useRef(false);

  useEffect(() => {
    // Skip the first write so a fresh visit doesn't persist the demo studio
    // before the visitor has touched anything.
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    saveState(state);
  }, [state]);

  const today = todayISO();

  const api = useMemo<StudioApi>(
    () => ({
      habits: state.habits,
      active: state.habits.filter((habit) => !habit.shelvedAt),
      shelved: state.habits.filter((habit) => habit.shelvedAt),
      today,
      create: (draft) => dispatch({ type: "create", draft, today }),
      update: (id, draft) => dispatch({ type: "update", id, draft }),
      toggle: (id, day) => dispatch({ type: "toggle", id, day: day ?? today }),
      shelve: (id) => dispatch({ type: "shelve", id, today }),
      unshelve: (id) => dispatch({ type: "unshelve", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      move: (id, direction) => dispatch({ type: "move", id, direction }),
      loadSeed: () => dispatch({ type: "seed", today }),
      reset: () => {
        clearState();
        dispatch({ type: "clear" });
      },
      exportJSON: () => JSON.stringify(state, null, 2),
    }),
    [state, today],
  );

  return <StudioContext.Provider value={api}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioApi {
  const api = useContext(StudioContext);
  if (!api) throw new Error("useStudio must be used inside <StudioProvider>");
  return api;
}
