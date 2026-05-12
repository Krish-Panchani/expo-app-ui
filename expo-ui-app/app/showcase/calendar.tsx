import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Calendar from '@/components/ui/calendar';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('calendar')!;

export default function CalendarShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState(new Date());
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add calendar</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/calendar</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Single date</Text>
            <Calendar mode="single" value={date} onChange={setDate} allowFutureDates />
            <Text style={s.caption}>Selected: {date.toDateString()}</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>API</Text>
            <Text style={s.body}>
              Use <Text style={{ fontWeight: '600' }}>mode=&quot;single&quot;</Text> with <Text style={{ fontWeight: '600' }}>value</Text> /{' '}
              <Text style={{ fontWeight: '600' }}>onChange</Text>, or range mode with <Text style={{ fontWeight: '600' }}>rangeValue</Text> /{' '}
              <Text style={{ fontWeight: '600' }}>onRangeChange</Text>.
            </Text>
          </View>
        </ScrollView>
      </View>
  );
}
