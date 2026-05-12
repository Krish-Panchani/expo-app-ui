import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AutoScrollCards from '@/components/ui/auto-scroll-cards';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('auto-scroll-cards')!;
const demoData = ['Card A', 'Card B', 'Card C'];

export default function AutoScrollCardsShowcaseScreen() {
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
            Add with{' '}
            <Text style={s.inlineStrong}>npx expo-app-ui add auto-scroll-cards</Text>, then
            import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/auto-scroll-cards</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Horizontal list + auto-advance</Text>
            <View style={{ height: 148 }}>
              <AutoScrollCards
                data={demoData}
                cardWidth={200}
                gap={12}
                autoScroll
                interval={2600}
                loop
                showIndicators
                renderItem={(item) => (
                  <View style={[s.cardInner, { width: 200, minHeight: 120, justifyContent: 'center' }]}>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#0a0a0a', marginBottom: 6 }}>{item}</Text>
                    <Text style={s.body}>Swipe or wait for the next slide.</Text>
                  </View>
                )}
              />
            </View>
            <Text style={s.caption}>
              Pass <Text style={{ fontWeight: '600' }}>renderItem</Text>, <Text style={{ fontWeight: '600' }}>cardWidth</Text>, and
              toggle <Text style={{ fontWeight: '600' }}>autoScroll</Text> / <Text style={{ fontWeight: '600' }}>interval</Text>.
            </Text>
          </View>
        </ScrollView>
      </View>
  );
}
