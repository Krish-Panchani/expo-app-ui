import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Skeleton from '@/components/ui/skeleton';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('skeleton')!;

export default function SkeletonShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add skeleton</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/skeleton</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>List placeholder</Text>
            <Skeleton width="100%" height={14} />
            <View style={s.spacerSm} />
            <Skeleton width="88%" height={14} />
            <View style={s.spacerSm} />
            <Skeleton width="64%" height={14} />
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Avatar shimmer</Text>
            <Skeleton circle size={52} />
          </View>
        </ScrollView>
      </View>
  );
}
