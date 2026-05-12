import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from '@/components/ui/custom-text';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('custom-text')!;

export default function CustomTextShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add custom-text</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/custom-text</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Semantic tones</Text>
            <CustomText font="bold" variantColor="primary">
              Bold primary
            </CustomText>
            <View style={s.spacerSm} />
            <CustomText font="medium" variantColor="gray">
              Medium gray body copy for supporting lines.
            </CustomText>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Spacing helpers</Text>
            <CustomText paddingY={10} paddingX={12} style={{ backgroundColor: '#f0f0f0', borderRadius: 8 }}>
              Padded block — combine with your design tokens.
            </CustomText>
          </View>
        </ScrollView>
      </View>
  );
}
