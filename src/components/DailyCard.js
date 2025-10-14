import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const Section = ({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

const DailyCard = memo(function DailyCard({ dateLabel, phase, mood }) {
  return (
    <View style={styles.card}>
      <Text style={styles.dateLabel}>{dateLabel}</Text>
      <Text style={styles.phaseTitle}>{phase.name} phase</Text>
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
          <Text style={styles.moodLabel}>Your chosen mood:</Text>
          <Text style={styles.moodTitle}>{mood.title}</Text>
          <Text style={styles.moodAffirmation}>{mood.affirmation}</Text>
        </View>
      ) : (
        <Text style={styles.moodPrompt}>
          Select how you're feeling to tailor today's ritual.
        </Text>
      )}

      <Section
        title="Body ritual"
        content={phase.suggestions.body}
      />
      <Section
        title="Mind focus"
        content={phase.suggestions.mind}
      />
      <Section
        title="Connection spark"
        content={phase.suggestions.connection}
      />
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
    letterSpacing: 1,
    textTransform: "uppercase",
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
    textTransform: "uppercase",
    letterSpacing: 1,
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
});

export default DailyCard;
