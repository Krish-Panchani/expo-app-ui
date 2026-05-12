import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('dialog')!;

export default function DialogShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add dialog</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/dialog</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Destructive confirm</Text>
            <Button title="Open dialog" onPress={() => setOpen(true)} />
            <Text style={s.caption}>Provide <Text style={{ fontWeight: '600' }}>actions</Text> with variants for hierarchy.</Text>
          </View>

          <Dialog
            visible={open}
            onDismiss={() => setOpen(false)}
            title="Delete this item?"
            description="This action cannot be undone. Connected devices will stop syncing."
            actions={[
              { label: 'Cancel', variant: 'secondary', onPress: () => setOpen(false) },
              { label: 'Delete', variant: 'danger', onPress: () => setOpen(false) },
            ]}
          />
        </ScrollView>
      </View>
  );
}
