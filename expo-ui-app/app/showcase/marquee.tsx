import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Marquee from '@/components/ui/marquee';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('marquee')!;

export default function MarqueeShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add marquee</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/marquee</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Ticker row</Text>
            <View style={s.marqueeClip}>
              <Marquee duration={9000}>
                <Text style={s.marqueeText}>
                  Expo App UI — accessible components for shipping mobile apps ·{' '}
                </Text>
              </Marquee>
            </View>
            <Text style={s.caption}>Tune speed with <Text style={{ fontWeight: '600' }}>duration</Text> (higher = slower).</Text>
          </View>
        </ScrollView>
      </View>
  );
}
