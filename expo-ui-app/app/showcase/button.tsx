import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('button')!;

export default function ButtonShowcaseScreen() {
  const insets = useSafeAreaInsets();
  function icon(name: keyof typeof Ionicons.glyphMap) {
    function BtnIcon() {
      return <Ionicons name={name} size={20} color="#fff" />;
    }
    BtnIcon.displayName = `ButtonIcon(${String(name)})`;
    return BtnIcon;
  }
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add button</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/button</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Variants</Text>
            <Button title="Primary" onPress={() => {}} />
            <View style={s.spacerSm} />
            <Button title="Outlined" variant="outlined" textColor="#111827" onPress={() => {}} />
            <Text style={s.caption}>Switch with <Text style={{ fontWeight: '600' }}>variant</Text>, tune colors with{' '}
            <Text style={{ fontWeight: '600' }}>bgColor</Text> / <Text style={{ fontWeight: '600' }}>textColor</Text>.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Icons</Text>
            <Button title="Add item" IconLeft={icon('add')} onPress={() => {}} />
            <View style={s.spacerSm} />
            <Button title="Continue" IconRight={icon('arrow-forward')} onPress={() => {}} />
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>States</Text>
            <Button title="Loading" loading onPress={() => {}} />
            <View style={s.spacerSm} />
            <Button title="Disabled" disabled onPress={() => {}} />
          </View>
        </ScrollView>
      </View>
  );
}
