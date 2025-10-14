import { memo, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import dayjs from "dayjs";

function formatDate(dateString) {
  return dayjs(dateString).format("YYYY년 M월 D일");
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
      <Text style={styles.heading}>나의 주기 리듬 맞춤 설정</Text>
      <Text style={styles.description}>
        호르몬 단계와 지금의 기분을 조합해 오늘의 루틴을 만들어요. 언제든지 정보를 수정할 수 있어요.
      </Text>

      <View style={styles.fieldRow}>
        <View style={styles.field}>
          <Text style={styles.label}>평균 주기 길이</Text>
          <TextInput
            keyboardType="number-pad"
            value={lengthDraft}
            onChangeText={setLengthDraft}
            style={styles.input}
            maxLength={2}
            accessibilityLabel="평균 주기 길이 (일)"
          />
          <Text style={styles.hint}>일반적인 범위는 20~40일이에요.</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>마지막 월경 시작일</Text>
          <TextInput
            value={dateDraft}
            onChangeText={setDateDraft}
            style={styles.input}
            accessibilityLabel="마지막 월경 시작일"
            placeholder="YYYY년 M월 D일"
          />
          <Pressable onPress={setToToday} style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>오늘 날짜로 설정</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={handleApply} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>저장하기</Text>
      </Pressable>

      <Text style={styles.snapshot}>{lastStartLabel}부터 추적 중이에요</Text>
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
  },
  snapshot: {
    fontSize: 12,
    color: "#6c5b94",
  },
});

export default CycleSettings;
