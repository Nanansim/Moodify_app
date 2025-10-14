import { memo, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import dayjs from "dayjs";

function formatDate(dateString) {
  return dayjs(dateString).format("MMM D, YYYY");
}

const CycleSettings = memo(function CycleSettings({ settings, onChange }) {
  const [lengthDraft, setLengthDraft] = useState(String(settings.cycleLength));
  const [dateDraft, setDateDraft] = useState(formatDate(settings.lastPeriodStart));

  useEffect(() => {
    setLengthDraft(String(settings.cycleLength));
    setDateDraft(formatDate(settings.lastPeriodStart));
  }, [settings.cycleLength, settings.lastPeriodStart]);

  const lastStartLabel = useMemo(() => formatDate(settings.lastPeriodStart), [settings.lastPeriodStart]);

  const handleApply = () => {
    const normalizedLength = parseInt(lengthDraft, 10);
    const parsedDate = dayjs(dateDraft);
    if (!Number.isNaN(normalizedLength) && normalizedLength >= 20 && normalizedLength <= 40) {
      onChange({ cycleLength: normalizedLength });
    }
    if (parsedDate.isValid()) {
      onChange({ lastPeriodStart: parsedDate.startOf("day").toISOString() });
    }
  };

  const setToToday = () => {
    const today = dayjs().startOf("day");
    setDateDraft(formatDate(today));
    onChange({ lastPeriodStart: today.toISOString() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tune your cycle rhythm</Text>
      <Text style={styles.description}>
        We combine your hormone phase with your present mood to craft a daily ritual.
        Update these numbers anytime.
      </Text>

      <View style={styles.fieldRow}>
        <View style={styles.field}>
          <Text style={styles.label}>Cycle length</Text>
          <TextInput
            keyboardType="number-pad"
            value={lengthDraft}
            onChangeText={setLengthDraft}
            style={styles.input}
            maxLength={2}
            accessibilityLabel="Average cycle length in days"
          />
          <Text style={styles.hint}>Typical range is 20-40 days.</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Last period day</Text>
          <TextInput
            value={dateDraft}
            onChangeText={setDateDraft}
            style={styles.input}
            accessibilityLabel="First day of your last period"
            placeholder="MMM D, YYYY"
          />
          <Pressable onPress={setToToday} style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>Set to today</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={handleApply} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Save rhythm</Text>
      </Pressable>

      <Text style={styles.snapshot}>Currently tracking from {lastStartLabel}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2f2346",
  },
  description: {
    fontSize: 14,
    color: "#5b4a82",
    lineHeight: 21,
  },
  fieldRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  field: {
    flexBasis: "48%",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4d3a78",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9c6ff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2f2346",
    backgroundColor: "#fff",
  },
  hint: {
    fontSize: 12,
    color: "#7a6b98",
  },
  inlineButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#efe4ff",
    borderRadius: 10,
  },
  inlineButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4f35a2",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  applyButton: {
    backgroundColor: "#5d3bea",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#5d3bea",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 4,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  snapshot: {
    fontSize: 12,
    color: "#6c5b94",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default CycleSettings;
