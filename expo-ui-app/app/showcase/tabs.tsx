import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Tabs from '@/components/ui/tabs';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('tabs')!;

export default function TabsShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [main, setMain] = useState('home');
  const [seg, setSeg] = useState('one');
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add tabs</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/tabs</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Underline</Text>
            <Tabs
              items={[
                { key: 'home', label: 'Home' },
                { key: 'library', label: 'Library' },
                { key: 'profile', label: 'Profile' },
              ]}
              value={main}
              onChange={setMain}
              variant="underline"
            />
            <Text style={s.caption}>Active tab: {main}</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Pills</Text>
            <Tabs
              items={[
                { key: 'one', label: 'Overview' },
                { key: 'two', label: 'Insights' },
              ]}
              value={seg}
              onChange={setSeg}
              variant="pills"
            />
          </View>
        </ScrollView>
      </View>
  );
}
