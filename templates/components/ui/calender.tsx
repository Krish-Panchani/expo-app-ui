import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/* ================= CONSTANTS ================= */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ITEM_HEIGHT = 44;

/* ================= TYPES ================= */

type CalendarMode = "single" | "range";

interface CalendarTheme {
  primaryColor?: string;
  rangeColor?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  disabledTextColor?: string;
  selectedTextColor?: string;
  pickerBackground?: string;
  borderRadius?: number;
  daySize?: number;
}

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Props {
  mode?: CalendarMode;

  /* single */
  value?: Date;
  onChange?: (date: Date) => void;

  /* range */
  rangeValue?: DateRange;
  onRangeChange?: (range: DateRange) => void;

  minDate?: string;
  maxDate?: string;

  allowFutureDates?: boolean; // ✅ NEW

  theme?: CalendarTheme;
}

/* ================= COMPONENT ================= */

const Calendar: React.FC<Props> = ({
  mode = "single",

  value,
  onChange,

  rangeValue = { start: null, end: null },
  onRangeChange,

  minDate,
  maxDate,

  allowFutureDates = false, // ✅ default

  theme = {},
}) => {
  /* ---------- THEME ---------- */

  const t = {
    primaryColor: "#007AFF",
    rangeColor: "#007AFF20",
    backgroundColor: "#FFFFFF",
    textColor: "#000",
    mutedTextColor: "#999",
    disabledTextColor: "#D1D1D6",
    selectedTextColor: "#FFF",
    pickerBackground: "#FFF",
    borderRadius: 20,
    daySize: 40,
    ...theme,
  };

  /* ---------- STATE ---------- */

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialDate = mode === "single" && value ? value : today;

  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());
  const [pickerMode, setPickerMode] = useState<"month" | "year" | null>(null);

  const min = minDate ? new Date(minDate) : undefined;
  const max = maxDate ? new Date(maxDate) : undefined;

  /* ---------- SYNC FOR SINGLE MODE ---------- */

  useEffect(() => {
    if (mode === "single" && value) {
      setMonth(value.getMonth());
      setYear(value.getFullYear());
    }
  }, [value, mode]);

  /* ---------- YEARS ---------- */

  const years = useMemo(() => {
    const current = today.getFullYear();
    return Array.from({ length: 120 }, (_, i) => current - i);
  }, []);

  /* ---------- MONTH MATRIX ---------- */

  const matrix = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const rows: (number | null)[][] = [];
    let day = 1 - firstDay;

    for (let w = 0; w < 6; w++) {
      const row = [];
      for (let d = 0; d < 7; d++) {
        row.push(day > 0 && day <= daysInMonth ? day : null);
        day++;
      }
      rows.push(row);
    }
    return rows;
  }, [month, year]);

  /* ---------- HELPERS ---------- */

  const isSameDay = (a?: Date | null, b?: Date | null) =>
    !!a &&
    !!b &&
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isFuture = (date: Date) => date > today;

  const isDisabled = (d: number) => {
    const date = new Date(year, month, d);

    if (!allowFutureDates && isFuture(date)) return true;
    if (min && date < min) return true;
    if (max && date > max) return true;

    return false;
  };

  const isInRange = (d: number) => {
    if (!rangeValue.start || !rangeValue.end) return false;
    const date = new Date(year, month, d);
    return date > rangeValue.start && date < rangeValue.end;
  };

  /* ---------- DAY PRESS ---------- */

  const onDayPress = (d: number) => {
    const date = new Date(year, month, d);
    if (isDisabled(d)) return;

    if (mode === "single") {
      onChange?.(date);
      return;
    }

    if (!rangeValue.start || rangeValue.end) {
      onRangeChange?.({ start: date, end: null });
    } else if (date >= rangeValue.start) {
      onRangeChange?.({ start: rangeValue.start, end: date });
    } else {
      onRangeChange?.({ start: date, end: null });
    }
  };

  /* ---------- MONTH NAV ---------- */

  const prevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  /* ================= RENDER ================= */

  return (
    <View style={[styles.container, { backgroundColor: t.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.nav}>‹</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => setPickerMode("month")}>
            <Text style={[styles.monthText, { color: t.textColor }]}>
              {MONTHS[month]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPickerMode("year")}>
            <Text style={{ color: t.mutedTextColor }}>{year}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.nav}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekdays */}
      <View style={styles.row}>
        {DAYS.map((d) => (
          <Text key={d} style={[styles.weekDay, { color: t.mutedTextColor }]}>
            {d}
          </Text>
        ))}
      </View>

      {/* Days */}
      {matrix.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((d, idx) => {
            if (!d) return <View key={idx} style={{ flex: 1 }} />;

            const date = new Date(year, month, d);
            const disabled = isDisabled(d);

            const selected =
              mode === "single"
                ? value && isSameDay(value, date)
                : (rangeValue.start && isSameDay(rangeValue.start, date)) ||
                  (rangeValue.end && isSameDay(rangeValue.end, date));

            return (
              <TouchableOpacity
                key={idx}
                disabled={disabled}
                onPress={() => onDayPress(d)}
                style={[
                  styles.day,
                  { height: t.daySize },
                  selected && {
                    backgroundColor: t.primaryColor,
                    borderRadius: t.borderRadius,
                  },
                  mode === "range" &&
                    !selected &&
                    isInRange(d) && { backgroundColor: t.rangeColor },
                ]}
              >
                <Text
                  style={{
                    color: disabled
                      ? t.disabledTextColor
                      : selected
                      ? t.selectedTextColor
                      : t.textColor,
                  }}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Month / Year Picker */}
      <Modal transparent visible={!!pickerMode} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setPickerMode(null)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View
                style={[styles.picker, { backgroundColor: t.pickerBackground }]}
              >
                <Text style={styles.pickerTitle}>
                  {pickerMode === "month" ? "Select Month" : "Select Year"}
                </Text>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                >
                  {(pickerMode === "month" ? MONTHS : years).map((item, i) => {
                    const active =
                      pickerMode === "month" ? i === month : item === year;

                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.pickerItem,
                          active && { backgroundColor: t.rangeColor },
                        ]}
                        onPress={() => {
                          pickerMode === "month"
                            ? setMonth(i)
                            : setYear(item as number);
                          setPickerMode(null);
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: active ? "600" : "400",
                            color: active ? t.primaryColor : t.textColor,
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Calendar;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  nav: { fontSize: 20, padding: 8 },
  monthText: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row" },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
  },
  day: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: 260,
    maxHeight: 320,
    borderRadius: 14,
    padding: 12,
  },
  pickerTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});
