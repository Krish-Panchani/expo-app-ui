import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoxView from '@/components/ui/box-view';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('box-view')!;

export default function BoxViewShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add box-view</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/box-view</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Row + gap</Text>
            <BoxView flexDirection="row" gap={12} alignItems="center">
              <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#d4d4d4' }} />
              <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#a3a3a3' }} />
              <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#525252' }} />
            </BoxView>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Column + padding</Text>
            <BoxView flexDirection="column" gap={8} padding={14} style={s.cardInner}>
              <Text style={s.body}>Use BoxView when you want flex props and spacing without nesting StyleSheets.</Text>
            </BoxView>
          </View>
        </ScrollView>
      </View>
  );
}
