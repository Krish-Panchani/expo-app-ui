import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Switch from '@/components/ui/switch';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('switch')!;

export default function SwitchShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add switch</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/switch</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Settings row pattern</Text>
            <View style={s.rowBetween}>
              <Text style={s.body}>Push notifications</Text>
              <Switch value={push} onValueChange={setPush} size="md" />
            </View>
            <View style={s.divider} />
            <View style={s.rowBetween}>
              <Text style={s.body}>Marketing email</Text>
              <Switch value={email} onValueChange={setEmail} size="md" />
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Sizes</Text>
            <View style={s.rowBetween}>
              <Text style={s.body}>Small</Text>
              <Switch value={true} onValueChange={() => {}} size="sm" />
            </View>
            <View style={s.rowBetween}>
              <Text style={s.body}>Large (disabled)</Text>
              <Switch value={false} onValueChange={() => {}} size="lg" disabled />
            </View>
          </View>
        </ScrollView>
      </View>
  );
}
