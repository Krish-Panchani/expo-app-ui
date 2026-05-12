import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import Snackbar from '@/components/ui/snackbar';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('snackbar')!;

export default function SnackbarShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add snackbar</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/snackbar</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Action + auto-dismiss</Text>
            <Button title="Save draft" onPress={() => setVisible(true)} />
            <Text style={s.caption}>Snackbar slides up from the bottom with an optional action.</Text>
          </View>

          <Snackbar
            visible={visible}
            message="Draft saved locally"
            action={{ label: 'Undo', onPress: () => setVisible(false) }}
            onDismiss={() => setVisible(false)}
            duration={3600}
          />
        </ScrollView>
      </View>
  );
}
