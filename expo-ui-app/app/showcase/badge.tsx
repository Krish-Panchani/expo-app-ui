import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Badge from '@/components/ui/badge';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('badge')!;

export default function BadgeShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add badge</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/badge</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Solid tones</Text>
            <View style={[s.row, { flexWrap: 'wrap', gap: 8 }]}>
              <Badge label="Neutral" tone="neutral" />
              <Badge label="Primary" tone="primary" />
              <Badge label="Success" tone="success" />
              <Badge label="Warning" tone="warning" />
              <Badge label="Danger" tone="danger" />
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Outline · subtle · dot</Text>
            <View style={[s.row, { flexWrap: 'wrap', gap: 10, marginBottom: 12 }]}>
              <Badge label="Outline" variant="outline" tone="primary" />
              <Badge label="Subtle" variant="subtle" tone="primary" />
            </View>
            <View style={s.row}>
              <Badge dot tone="success" />
              <Badge dot tone="danger" />
            </View>
          </View>
        </ScrollView>
      </View>
  );
}
