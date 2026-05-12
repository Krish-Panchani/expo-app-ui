import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheet from '@/components/ui/bottom-sheet';
import Button from '@/components/ui/button';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('bottom-sheet')!;

export default function BottomSheetShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add bottom-sheet</Text>, then import
            from <Text style={s.inlineStrong}>@/components/ui/bottom-sheet</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Open / dismiss</Text>
            <Button title="Open bottom sheet" onPress={() => setOpen(true)} />
            <Text style={s.caption}>Swipe down, tap backdrop, or use actions inside to close.</Text>
          </View>

          <BottomSheet visible={open} onClose={() => setOpen(false)} height={300}>
            <Text style={s.sheetTitle}>Sheet content</Text>
            <Text style={s.body}>Place forms, lists, or confirmations here. Keep primary actions visible.</Text>
            <View style={{ marginTop: 16 }} />
            <Button title="Close" variant="outlined" textColor="#111827" onPress={() => setOpen(false)} />
          </BottomSheet>
        </ScrollView>
      </View>
  );
}
