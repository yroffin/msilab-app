import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PocketBaseSettingsRepository } from "../../infrastructure/pocketbase/settings-repository";
import type { Settings } from "../../domain/settings";
import { useAuth } from "../../infrastructure/session/Authcontext";

type SettingsContextValue = {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// Le Provider ne contient AUCUNE logique d'accès PocketBase directement —
// il délègue au repository, il ne fait qu'orchestrer l'état React autour.
const settingsRepository = new PocketBaseSettingsRepository();

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth(); // la collection settings nécessite d'être connecté
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSettings(null);
      return;
    }

    setIsLoading(true);
    settingsRepository.getSettings("settings")
      .then(setSettings)
      .catch(() => setError("Impossible de charger les paramètres"))
      .finally(() => setIsLoading(false));
  }, [user]);

  async function updateSettings(data: Partial<Settings>) {
    const updated = await settingsRepository.setSettings(data);
    setSettings(updated);
  }

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings doit être utilisé dans un <SettingsProvider>");
  return ctx;
}