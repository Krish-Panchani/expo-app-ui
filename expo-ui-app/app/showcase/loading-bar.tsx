import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoadingBar from '@/components/ui/loading-bar';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('loading-bar')!;

export default function LoadingBarShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add loading-bar</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/loading-bar</Text>. Pair with the top-loading-bar
            context for global progress.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Indeterminate strip</Text>
            <View style={s.loadingHost}>
              <LoadingBar color="#0a0a0a" />
              <Text style={[s.body, { marginTop: 28, paddingHorizontal: 12 }]}>
                The bar is absolutely positioned at the top of its parent — wrap a screen section or full screen.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
  );
}
