import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppPreferences {
  lastCourseId: string | null;
  preferredNoteMethod: string | null;
  sidebarCollapsed: boolean;
  recentCourses: string[];
}

interface AppContextType {
  preferences: AppPreferences;
  setLastCourse: (courseId: string) => void;
  setPreferredNoteMethod: (methodId: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addRecentCourse: (courseId: string) => void;
}

const defaultPreferences: AppPreferences = {
  lastCourseId: null,
  preferredNoteMethod: "cornell",
  sidebarCollapsed: false,
  recentCourses: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AppPreferences>(() => {
    const stored = localStorage.getItem("questify-preferences");
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem("questify-preferences", JSON.stringify(preferences));
  }, [preferences]);

  const setLastCourse = (courseId: string) => {
    setPreferences((prev) => ({ ...prev, lastCourseId: courseId }));
  };

  const setPreferredNoteMethod = (methodId: string) => {
    setPreferences((prev) => ({ ...prev, preferredNoteMethod: methodId }));
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    setPreferences((prev) => ({ ...prev, sidebarCollapsed: collapsed }));
  };

  const addRecentCourse = (courseId: string) => {
    setPreferences((prev) => {
      const recent = [courseId, ...prev.recentCourses.filter((id) => id !== courseId)].slice(0, 5);
      return { ...prev, recentCourses: recent };
    });
  };

  return (
    <AppContext.Provider
      value={{
        preferences,
        setLastCourse,
        setPreferredNoteMethod,
        setSidebarCollapsed,
        addRecentCourse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
