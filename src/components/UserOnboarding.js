import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";

const buildRange = (start, end) => {
  const items = [];
  for (let value = start; value <= end; value += 1) {
    items.push(value);
  }
  return items;
};

function getDaysInMonth(year, month) {
  return dayjs(`${year}-${String(month).padStart(2, "0")}-01`).daysInMonth();
}

const currentYear = dayjs().year();
const YEARS = buildRange(currentYear - 70, currentYear);
const MONTHS = buildRange(1, 12);

const formatTwoDigits = (value) => String(value).padStart(2, "0");

export default function UserOnboarding({ onSubmit }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState(currentYear - 20);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const days = useMemo(() => {
    const total = getDaysInMonth(year, month);
    return buildRange(1, total);
  }, [year, month]);

  const isValid = name.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }
    const birthdate = `${year}-${formatTwoDigits(month)}-${formatTwoDigits(day)}`;
    onSubmit({ name: name.trim(), birthdate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moodify에 오신 것을 환영해요!</Text>
      <Text style={styles.subtitle}>
        당신의 리듬에 맞춘 경험을 위해 이름과 생년월일을 알려주세요.
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요"
          style={styles.input}
          returnKeyType="done"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>생년월일</Text>
        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={year} onValueChange={setYear}>
              {YEARS.map((value) => (
                <Picker.Item key={value} label={`${value}년`} value={value} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={month} onValueChange={setMonth}>
              {MONTHS.map((value) => (
                <Picker.Item key={value} label={`${value}월`} value={value} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={day} onValueChange={setDay}>
              {days.map((value) => (
                <Picker.Item key={value} label={`${value}일`} value={value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
        disabled={!isValid}
      >
        <Text style={styles.submitText}>시작하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2f2346",
  },
  subtitle: {
    fontSize: 16,
    color: "#544576",
    lineHeight: 24,
  },
  field: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4d3a78",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9c6ff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  pickerRow: {
    flexDirection: "row",
    gap: 12,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9c6ff",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#5d3bea",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#5d3bea",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#b7a6f6",
    shadowOpacity: 0,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
