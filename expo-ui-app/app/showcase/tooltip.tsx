import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Tooltip from '@/components/ui/tooltip';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('tooltip')!;

export default function TooltipShowcaseScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add tooltip</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/tooltip</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Press to reveal</Text>
            <Tooltip content="Short helper copy for dense UIs." placement="top">
              <Text style={s.link}>Show tooltip</Text>
            </Tooltip>
            <Text style={s.caption}>Uses a single child trigger; position with <Text style={{ fontWeight: '600' }}>placement</Text>.</Text>
          </View>
        </ScrollView>
      </View>
  );
}
