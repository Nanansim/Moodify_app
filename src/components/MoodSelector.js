import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MOODS } from "../constants/phases";

function MoodOption({ mood, onSelect, isActive }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      onPress={() => onSelect(mood.id)}
      style={[styles.option, isActive && styles.optionActive]}
    >
      <Text style={[styles.optionTitle, isActive && styles.optionTitleActive]}>
        {mood.title}
      </Text>
      <Text style={styles.optionTone}>{mood.tone}</Text>
    </Pressable>
  );
}

const MoodSelector = memo(function MoodSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you arriving today?</Text>
      <View style={styles.optionList}>
        {MOODS.map((mood) => (
          <MoodOption
            key={mood.id}
            mood={mood}
            onSelect={onSelect}
            isActive={selected === mood.id}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2f2346",
  },
  optionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  option: {
    flexBasis: "47%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#f5f0ff",
  },
  optionActive: {
    backgroundColor: "#d7c9ff",
    shadowColor: "#6f4dd6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a3b75",
    marginBottom: 4,
  },
  optionTitleActive: {
    color: "#301d60",
  },
  optionTone: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1,
    color: "#6f5f9c",
  },
});

export default MoodSelector;
