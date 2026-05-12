import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Checkbox from '@/components/ui/checkbox';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('checkbox')!;

export default function CheckboxShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [sm, setSm] = useState(true);
  const [lg, setLg] = useState(false);
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add checkbox</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/checkbox</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>With labels</Text>
            <Checkbox value={a} onValueChange={setA} label="Push notifications" />
            <View style={s.spacerSm} />
            <Checkbox value={b} onValueChange={setB} label="Product updates" />
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Sizes</Text>
            <Checkbox value={sm} onValueChange={setSm} size="sm" label="Small" />
            <View style={s.spacerSm} />
            <Checkbox value={lg} onValueChange={setLg} size="lg" label="Large" />
          </View>
        </ScrollView>
      </View>
  );
}
