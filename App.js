import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CycleSettings from "./src/components/CycleSettings";
import DailyCard from "./src/components/DailyCard";
import MoodSelector from "./src/components/MoodSelector";
import { MOODS, PHASES } from "./src/constants/phases";
import { useCycleSettings } from "./src/hooks/useCycleSettings";
import { useDailyMood } from "./src/hooks/useDailyMood";

function resolvePhase(cycleDay) {
  return (
    PHASES.find((phase) => cycleDay >= phase.range[0] && cycleDay <= phase.range[1]) ||
    PHASES[PHASES.length - 1]
  );
}

export default function App() {
  const { settings, saveSettings, cycleDay, loading: loadingSettings } = useCycleSettings();
  const { moodId, setMood, loading: loadingMood } = useDailyMood();

  const selectedMood = useMemo(
    () => MOODS.find((item) => item.id === moodId) ?? null,
    [moodId]
  );

  const phase = useMemo(() => resolvePhase(cycleDay), [cycleDay]);

  const dateLabel = useMemo(
    () => `${dayjs().format("dddd")}, cycle day ${cycleDay}`,
    [cycleDay]
  );

  const isLoading = loadingMood || loadingSettings;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appTitle}>Moodify Daily</Text>
        <Text style={styles.subtitle}>
          Daily, hormone-smart cards that mirror your mood and cycle.
        </Text>

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#5d3bea" />
            <Text style={styles.loaderText}>Tuning into your rhythm…</Text>
          </View>
        ) : (
          <>
            <DailyCard dateLabel={dateLabel} phase={phase} mood={selectedMood} />

            <View style={styles.section}>
              <MoodSelector selected={moodId} onSelect={setMood} />
            </View>

            <View style={styles.section}>
              <CycleSettings settings={settings} onChange={saveSettings} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f0ff",
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 32,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2f2346",
  },
  subtitle: {
    fontSize: 16,
    color: "#544576",
    lineHeight: 24,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 24,
    gap: 24,
    shadowColor: "#3d2d5d",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 3,
  },
  loader: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 60,
  },
  loaderText: {
    fontSize: 16,
    color: "#5b4a82",
  },
});
