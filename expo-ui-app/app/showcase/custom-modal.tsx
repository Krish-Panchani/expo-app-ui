import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import CustomModal from '@/components/ui/custom-modal';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('custom-modal')!;

export default function CustomModalShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add custom-modal</Text>, then import
            from <Text style={s.inlineStrong}>@/components/ui/custom-modal</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Trigger</Text>
            <Button title="Open modal" onPress={() => setOpen(true)} />
            <Text style={s.caption}>Backdrop + slide animation. Close from actions or backdrop.</Text>
          </View>

          <CustomModal visible={open} onClose={() => setOpen(false)}>
            <View style={{ padding: 8 }}>
              <Text style={s.sheetTitle}>Modal surface</Text>
              <Text style={s.body}>Drop any layout here — forms, media, or stacked actions.</Text>
              <View style={{ marginTop: 16 }} />
              <Button title="Done" onPress={() => setOpen(false)} />
            </View>
          </CustomModal>
        </ScrollView>
      </View>
  );
}
