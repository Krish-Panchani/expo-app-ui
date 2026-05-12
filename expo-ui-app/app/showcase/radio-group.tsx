import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RadioGroup from '@/components/ui/radio-group';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('radio-group')!;

export default function RadioGroupShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [plan, setPlan] = useState('standard');
  const [size, setSize] = useState<'s' | 'm' | 'l'>('m');
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add radio-group</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/radio-group</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Vertical list</Text>
            <RadioGroup
              options={[
                { label: 'Standard', value: 'standard' },
                { label: 'Express', value: 'express' },
                { label: 'Unavailable', value: 'none', disabled: true },
              ]}
              value={plan}
              onChange={setPlan}
            />
            <Text style={s.caption}>Selected: {plan}</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Horizontal chips</Text>
            <RadioGroup
              direction="horizontal"
              options={[
                { label: 'S', value: 's' },
                { label: 'M', value: 'm' },
                { label: 'L', value: 'l' },
              ]}
              value={size}
              onChange={setSize}
            />
            <Text style={s.caption}>Selected size: {size.toUpperCase()}</Text>
          </View>
        </ScrollView>
      </View>
  );
}
