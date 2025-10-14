import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "moodify@userProfile";

export function useUserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (error) {
        console.warn("Failed to load user profile", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = useCallback(async (nextProfile) => {
    setProfile(nextProfile);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    } catch (error) {
      console.warn("Failed to save user profile", error);
    }
  }, []);

  return { profile, saveProfile, loading };
}
