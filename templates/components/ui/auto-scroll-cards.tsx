import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

/* ================= TYPES ================= */

interface Props<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;

  cardWidth: number;
  gap?: number;

  autoScroll?: boolean;
  interval?: number;
  loop?: boolean;

  showIndicators?: boolean;
}

/* ================= COMPONENT ================= */

function AutoScrollCards<T>({
  data,
  renderItem,

  cardWidth,
  gap = 12,

  autoScroll = true,
  interval = 3000,
  loop = true,

  showIndicators = true,
}: Props<T>) {
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const total = data.length;

  /* ---------- Auto Scroll ---------- */

  useEffect(() => {
    if (!autoScroll || total <= 1 || isUserScrolling) return;

    const timer = setInterval(() => {
      let next = index + 1;

      if (next >= total) {
        next = loop ? 0 : index;
      }

      listRef.current?.scrollToOffset({
        offset: next * (cardWidth + gap),
        animated: true,
      });

      setIndex(next);
    }, interval);

    return () => clearInterval(timer);
  }, [index, autoScroll, interval, loop, isUserScrolling]);

  /* ---------- Scroll Handlers ---------- */

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (cardWidth + gap));
    setIndex(newIndex);
    setIsUserScrolling(false);
  };

  /* ================= RENDER ================= */

  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + gap}
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: gap }}
        onScrollBeginDrag={() => setIsUserScrolling(true)}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item, index: i }) => (
          <View
            style={{
              width: cardWidth,
              marginRight: gap,
            }}
          >
            {renderItem(item, i)}
          </View>
        )}
      />

      {/* Indicators */}
      {showIndicators && (
        <View style={styles.indicatorRow}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default AutoScrollCards;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2563EB",
    width: 16,
    borderRadius: 8,
  },
});

