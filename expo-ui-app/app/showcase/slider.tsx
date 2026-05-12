import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Slider from '@/components/ui/slider';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('slider')!;

export default function SliderShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [v, setV] = useState(42);
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add slider</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/slider</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Continuous value</Text>
            <Slider value={v} onValueChange={setV} minimumValue={0} maximumValue={100} />
            <Text style={s.caption}>Rounded: {Math.round(v)}</Text>
          </View>
        </ScrollView>
      </View>
  );
}
