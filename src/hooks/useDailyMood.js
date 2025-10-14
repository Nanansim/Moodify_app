import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const STORAGE_KEY = "moodify@dailyMood";

const buildKey = (dateKey) => `${STORAGE_KEY}:${dateKey}`;

export function useDailyMood() {
  const todayKey = useMemo(() => dayjs().format("YYYY-MM-DD"), []);
  const [moodId, setMoodId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMood = async () => {
      try {
        const stored = await AsyncStorage.getItem(buildKey(todayKey));
        if (stored) {
          setMoodId(stored);
        }
      } catch (error) {
        console.warn("Failed to load mood", error);
      } finally {
        setLoading(false);
      }
    };

    loadMood();
  }, [todayKey]);

  const saveMood = useCallback(
    async (id) => {
      try {
        setMoodId(id);
        await AsyncStorage.setItem(buildKey(todayKey), id);
      } catch (error) {
        console.warn("Failed to save mood", error);
      }
    },
    [todayKey]
  );

  return { moodId, setMood: saveMood, loading };
}
