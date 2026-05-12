import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('progress-bar')!;

export default function ProgressBarShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [p, setP] = useState(38);
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add progress-bar</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/progress-bar</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Percentage mode</Text>
            <ProgressBar progress={p} label={`${p}%`} />
            <View style={[s.row, { marginTop: 14 }]}>
              <View style={{ flex: 1 }}>
                <Button title="-10" onPress={() => setP((n) => Math.max(0, n - 10))} />
              </View>
              <View style={{ width: 10 }} />
              <View style={{ flex: 1 }}>
                <Button title="+10" onPress={() => setP((n) => Math.min(100, n + 10))} />
              </View>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Count mode</Text>
            <ProgressBar variant="count" count={5} currentCount={2} label="Step 2 of 5" />
          </View>
        </ScrollView>
      </View>
  );
}
