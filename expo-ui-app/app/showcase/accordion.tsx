import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Accordion from '@/components/ui/accordion';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('accordion')!;

export default function AccordionShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add accordion</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/accordion</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Collapsed by default</Text>
            <Accordion
              title="Shipping"
              description="Carrier options, rates, and estimated delivery before you expand for full details."
            >
              <Text style={s.body}>Standard delivery in 3–5 business days.</Text>
            </Accordion>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Starts expanded</Text>
            <Accordion
              title="Returns"
              description="Summary line stays visible in the header so users know what is inside the section."
              defaultOpen
            >
              <Text style={s.body}>Free returns within 30 days. Use for FAQs, settings, and progressive disclosure.</Text>
            </Accordion>
          </View>
        </ScrollView>
      </View>
  );
}
