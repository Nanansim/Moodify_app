import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
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
import UserOnboarding from "./src/components/UserOnboarding";
import { MOODS, PHASES } from "./src/constants/phases";
import { useCycleSettings } from "./src/hooks/useCycleSettings";
import { useDailyMood } from "./src/hooks/useDailyMood";
import { useUserProfile } from "./src/hooks/useUserProfile";

function resolvePhase(cycleDay) {
  return (
    PHASES.find((phase) => cycleDay >= phase.range[0] && cycleDay <= phase.range[1]) ||
    PHASES[PHASES.length - 1]
  );
}

const LUCKY_COLORS = [
  { name: "새벽 라벤더", value: "#c6b8ff" },
  { name: "해질녘 살구", value: "#ffb47d" },
  { name: "산들바람 민트", value: "#7ddac7" },
  { name: "따뜻한 모래", value: "#f2c283" },
  { name: "은은한 장밋빛", value: "#ff8db5" },
  { name: "평온한 하늘", value: "#87b9ff" },
];

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateLuckyNumber(name, dateKey) {
  const seed = `${name}-${dateKey}`;
  const hash = hashString(seed);
  return (hash % 9) + 1;
}

function generateLuckyColor(name, dateKey) {
  const seed = `color-${name}-${dateKey}`;
  const hash = hashString(seed);
  return LUCKY_COLORS[hash % LUCKY_COLORS.length];
}

export default function App() {
  dayjs.locale("ko");
  const { settings, saveSettings, cycleDay, loading: loadingSettings } = useCycleSettings();
  const { moodId, setMood, loading: loadingMood } = useDailyMood();
  const { profile, saveProfile, loading: loadingProfile } = useUserProfile();

  const todayKey = useMemo(() => dayjs().format("YYYY-MM-DD"), []);
  const profileName = profile?.name ?? "";
  const profileBirthdate = profile?.birthdate ?? "";

  const selectedMood = useMemo(
    () => MOODS.find((item) => item.id === moodId) ?? null,
    [moodId]
  );

  const phase = useMemo(() => resolvePhase(cycleDay), [cycleDay]);

  const dateLabel = useMemo(
    () => {
      const baseLabel = `${dayjs().format("M월 D일 dddd")}`;
      const cycleLabel = `주기 ${cycleDay}일차`;
      return profileName ? `${profileName}님 · ${baseLabel} · ${cycleLabel}` : `${baseLabel} · ${cycleLabel}`;
    },
    [cycleDay, profileName]
  );

  const birthdateLabel = useMemo(() => {
    if (!profileBirthdate) {
      return null;
    }
    return dayjs(profileBirthdate).format("YYYY년 M월 D일생");
  }, [profileBirthdate]);

  const luckyNumber = useMemo(
    () => generateLuckyNumber(`${profileName}-${profileBirthdate}`, todayKey),
    [profileBirthdate, profileName, todayKey]
  );

  const luckyColor = useMemo(
    () => generateLuckyColor(`${profileName}-${profileBirthdate}`, todayKey),
    [profileBirthdate, profileName, todayKey]
  );

  const isLoading = loadingMood || loadingSettings;

  if (loadingProfile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#5d3bea" />
          <Text style={styles.loaderText}>프로필을 불러오고 있어요…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <UserOnboarding onSubmit={saveProfile} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appTitle}>Moodify 데일리</Text>
        <Text style={styles.subtitle}>기분과 주기에 맞춘 하루 루틴을 만나보세요.</Text>

        <View style={styles.luckyCard}>
          <View style={styles.luckyHeader}>
            <Text style={styles.luckyTitle}>오늘의 행운 가이드</Text>
            <Text style={styles.luckyGreeting}>{profile.name}님을 위한 맞춤 메시지</Text>
            {birthdateLabel ? (
              <Text style={styles.luckyBirthdate}>생년월일 · {birthdateLabel}</Text>
            ) : null}
          </View>
          <View style={styles.luckyContent}>
            <View style={styles.luckyNumberBox}>
              <Text style={styles.luckyLabel}>행운의 숫자</Text>
              <Text style={styles.luckyNumber}>{luckyNumber}</Text>
            </View>
            <View style={styles.luckyColorBox}>
              <Text style={styles.luckyLabel}>행운의 색</Text>
              <View style={styles.colorRow}>
                <View
                  style={[styles.colorSwatch, { backgroundColor: luckyColor.value }]}
                  accessibilityLabel={`${luckyColor.name} 색상 미리보기`}
                />
                <Text style={styles.colorName}>{luckyColor.name}</Text>
              </View>
            </View>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#5d3bea" />
            <Text style={styles.loaderText}>리듬을 맞추는 중이에요…</Text>
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
  luckyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    gap: 16,
    shadowColor: "#3d2d5d",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 3,
  },
  luckyHeader: {
    gap: 4,
  },
  luckyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2f2346",
  },
  luckyGreeting: {
    fontSize: 13,
    color: "#6c5b94",
  },
  luckyBirthdate: {
    fontSize: 12,
    color: "#8a7ab2",
  },
  luckyContent: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  luckyNumberBox: {
    flexBasis: "45%",
    gap: 8,
  },
  luckyColorBox: {
    flexBasis: "45%",
    gap: 8,
  },
  luckyLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4d3a78",
  },
  luckyNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#5d3bea",
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5dbff",
  },
  colorName: {
    fontSize: 16,
    color: "#4f3f76",
    fontWeight: "600",
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
