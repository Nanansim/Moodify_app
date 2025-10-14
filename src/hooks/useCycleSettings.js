import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const STORAGE_KEY = "moodify@cycleSettings";

const defaultSettings = {
  cycleLength: 28,
  lastPeriodStart: dayjs().startOf("day").toISOString(),
};

export function useCycleSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings({ ...defaultSettings, ...parsed });
        }
      } catch (error) {
        console.warn("Failed to load cycle settings", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const saveSettings = useCallback(async (updates) => {
    const next = {
      ...settings,
      ...updates,
    };
    setSettings(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn("Failed to persist cycle settings", error);
    }
  }, [settings]);

  const cycleDay = useMemo(() => {
    const lastStart = dayjs(settings.lastPeriodStart);
    const diff = dayjs().startOf("day").diff(lastStart, "day");
    const normalized = ((diff % settings.cycleLength) + settings.cycleLength) % settings.cycleLength;
    return normalized + 1;
  }, [settings]);

  return { settings, saveSettings, cycleDay, loading };
}
