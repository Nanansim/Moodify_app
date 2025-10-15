import { memo } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

const Section = ({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

const MusicRecommendation = ({ label, track }) => {
  if (!track) {
    return null;
  }

  const handlePress = () => {
    if (track?.url) {
      Linking.openURL(track.url);
    }
  };

  return (
    <Pressable
      style={styles.musicItem}
      onPress={handlePress}
      accessibilityRole="link"
      accessibilityLabel={`${label} · ${track.title} - ${track.artist}를 유튜브에서 재생`}
    >
      <Text style={styles.musicLabel}>{label}</Text>
      <Text style={styles.musicTitle}>{track.title}</Text>
      <Text style={styles.musicArtist}>{track.artist}</Text>
      <Text style={styles.musicDescription}>{track.description}</Text>
      <Text style={styles.musicLink}>YouTube에서 듣기</Text>
    </Pressable>
  );
};

const DailyCard = memo(function DailyCard({ dateLabel, phase, mood }) {
  return (
    <View style={styles.card}>
      <Text style={styles.dateLabel}>{dateLabel}</Text>
      <Text style={styles.phaseTitle}>{phase.name} 단계</Text>
      <Text style={styles.hormone}>{phase.hormones}</Text>

      <View style={styles.keywordContainer}>
        {phase.keywords.map((keyword) => (
          <View key={keyword} style={styles.keywordChip}>
            <Text style={styles.keywordText}>{keyword}</Text>
          </View>
        ))}
      </View>

      {mood ? (
        <View style={styles.moodBox}>
          <Text style={styles.moodLabel}>오늘의 기분</Text>
          <Text style={styles.moodTitle}>{mood.title}</Text>
          <Text style={styles.moodAffirmation}>{mood.affirmation}</Text>
        </View>
      ) : (
        <Text style={styles.moodPrompt}>지금의 기분을 선택하면 맞춤 루틴을 만들 수 있어요.</Text>
      )}

      <Section
        title="몸을 위한 루틴"
        content={phase.suggestions.body}
      />
      <Section
        title="마음을 위한 포커스"
        content={phase.suggestions.mind}
      />
      <Section
        title="관계에 불어넣을 에너지"
        content={phase.suggestions.connection}
      />
      <Section title="오늘의 포근한 한 끼" content={phase.suggestions.food} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘의 사운드트랙</Text>
        <View style={styles.musicGrid}>
          <MusicRecommendation
            label="해외 음악"
            track={phase.suggestions.music.global}
          />
          <MusicRecommendation
            label="한국 음악"
            track={phase.suggestions.music.korean}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 28,
    shadowColor: "#432f70",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 6,
    gap: 16,
  },
  dateLabel: {
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#7f72a4",
  },
  phaseTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2f2346",
  },
  hormone: {
    fontSize: 16,
    color: "#4d3f6d",
    lineHeight: 22,
  },
  keywordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  keywordChip: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#f3ecff",
  },
  keywordText: {
    color: "#5c4a8a",
    fontWeight: "600",
    fontSize: 12,
  },
  moodBox: {
    backgroundColor: "#fff6fb",
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  moodLabel: {
    color: "#a85ca5",
    fontSize: 12,
    fontWeight: "600",
  },
  moodTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#833f84",
  },
  moodAffirmation: {
    fontSize: 14,
    color: "#8f5b9d",
  },
  moodPrompt: {
    fontSize: 14,
    color: "#6c5e8f",
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#342456",
  },
  sectionContent: {
    fontSize: 14,
    color: "#4f3f76",
    lineHeight: 21,
  },
  musicGrid: {
    flexDirection: "column",
    gap: 12,
  },
  musicItem: {
    backgroundColor: "#f5f1ff",
    borderRadius: 18,
    padding: 16,
    gap: 6,
  },
  musicLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6d5aa8",
    textTransform: "uppercase",
  },
  musicTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3b2f64",
  },
  musicArtist: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5d4b86",
  },
  musicDescription: {
    fontSize: 13,
    color: "#675a8a",
    lineHeight: 20,
  },
  musicLink: {
    fontSize: 13,
    color: "#6a4bff",
    fontWeight: "600",
  },
});

export default DailyCard;
