import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Application, Profile } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export type Screen =
  | "login"
  | "register"
  | "dashboard"
  | "loans"
  | "creditCards"
  | "creditScore"
  | "profile";

interface AppContextType {
  screen: Screen;
  setScreen: (s: Screen) => void;
  profile: Profile | null;
  setProfile: (p: Profile | null) => void;
  applications: Application[];
  setApplications: (a: Application[]) => void;
  isLoadingProfile: boolean;
  refetchProfile: () => void;
  refetchApplications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("login");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const refetchProfile = useCallback(async () => {
    if (!actor || isFetching) return;
    setIsLoadingProfile(true);
    try {
      const p = await actor.getCallerUserProfile();
      setProfile(p);
      if (p) {
        setScreen("dashboard");
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingProfile(false);
    }
  }, [actor, isFetching]);

  const refetchApplications = useCallback(async () => {
    if (!actor || isFetching) return;
    try {
      const apps = await actor.getMyApplications();
      setApplications(apps);
    } catch {
      // ignore
    }
  }, [actor, isFetching]);

  useEffect(() => {
    if (identity && actor && !isFetching) {
      refetchProfile();
      refetchApplications();
    }
  }, [identity, actor, isFetching, refetchProfile, refetchApplications]);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        profile,
        setProfile,
        applications,
        setApplications,
        isLoadingProfile,
        refetchProfile,
        refetchApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
