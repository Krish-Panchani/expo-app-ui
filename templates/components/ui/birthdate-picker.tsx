import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/* ---------------- Constants ---------------- */

const PICKER_HEIGHT = 210;
const ITEM_HEIGHT = 42;

const COLORS = {
  primary: "#007AFF",
  gray: "#D1D1D6",
  darkGray: "#3A3A3C",
  white: "#FFFFFF",
  overlay: "rgba(0,0,0,0.5)",
};

/* ---------------- Helpers ---------------- */

const months = [
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

const generateRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

/* ---------------- Picker Column ---------------- */

const PickerColumn = ({
  data,
  selectedValue,
  onSelect,
  renderItem,
}: {
  data: any[];
  selectedValue: any;
  onSelect: (value: any) => void;
  renderItem: (item: any) => string;
}) => {
  const ref = useRef<ScrollView>(null);
  const padding = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

  useEffect(() => {
    const index = data.indexOf(selectedValue);
    if (index >= 0) {
      setTimeout(() => {
        ref.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
      }, 100);
    }
  }, [selectedValue, data]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    data[index] && onSelect(data[index]);
  };

  return (
    <ScrollView
      ref={ref}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={onScrollEnd}
      contentContainerStyle={{ paddingVertical: padding }}
      style={{ flex: 1 }}
    >
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            ref.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
            onSelect(item);
          }}
        >
          <Text
            style={[
              styles.pickerItem,
              selectedValue === item && styles.selectedItem,
            ]}
          >
            {renderItem(item)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

/* ---------------- Props ---------------- */

interface Props {
  initialDate?: Date;
  onDateChange: (date: string) => void;
}

/* ---------------- Component ---------------- */

const CustomBirthdatePicker: React.FC<Props> = ({
  initialDate = new Date(),
  onDateChange,
}) => {
  const [day, setDay] = useState(initialDate.getDate());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());

  const [tempDay, setTempDay] = useState(day);
  const [tempMonth, setTempMonth] = useState(month);
  const [tempYear, setTempYear] = useState(year);

  const [visible, setVisible] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = generateRange(currentYear - 100, currentYear).reverse();
  const days = generateRange(1, getDaysInMonth(tempMonth, tempYear));

  useEffect(() => {
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    onDateChange(formatted);
  }, [day, month, year]);

  useEffect(() => {
    const maxDays = getDaysInMonth(tempMonth, tempYear);
    if (tempDay > maxDays) setTempDay(maxDays);
  }, [tempMonth, tempYear]);

  return (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text>{`${day} ${months[month]} ${year}`}</Text>
        <Ionicons name="calendar-outline" size={20} color={COLORS.darkGray} />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <Text style={styles.title}>Select Date</Text>

                <View style={styles.pickerWrapper}>
                  <View style={styles.highlight} />
                  <PickerColumn
                    data={generateRange(0, 11)}
                    selectedValue={tempMonth}
                    onSelect={setTempMonth}
                    renderItem={(m) => months[m]}
                  />
                  <PickerColumn
                    data={days}
                    selectedValue={tempDay}
                    onSelect={setTempDay}
                    renderItem={(d) => String(d)}
                  />
                  <PickerColumn
                    data={years}
                    selectedValue={tempYear}
                    onSelect={setTempYear}
                    renderItem={(y) => String(y)}
                  />
                </View>

                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => setVisible(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.done}
                    onPress={() => {
                      setDay(tempDay);
                      setMonth(tempMonth);
                      setYear(tempYear);
                      setVisible(false);
                    }}
                  >
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
    padding: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  pickerWrapper: {
    flexDirection: "row",
    height: PICKER_HEIGHT,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    textAlign: "center",
    lineHeight: ITEM_HEIGHT,
    color: COLORS.gray,
    fontSize: 16,
  },
  selectedItem: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  highlight: {
    position: "absolute",
    top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
    left: 10,
    right: 10,
    height: ITEM_HEIGHT,
    backgroundColor: "#00000010",
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },
  cancel: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.primary,
  },
  done: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  doneText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});

export default CustomBirthdatePicker;
