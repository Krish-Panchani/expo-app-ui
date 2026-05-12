import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import Toast from '@/components/ui/toast';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('toast')!;

export default function ToastShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<'success' | 'error'>('success');
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add toast</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/toast</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Trigger variants</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Button
                  title="Success toast"
                  onPress={() => {
                    setVariant('success');
                    setVisible(true);
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Error toast"
                  variant="outlined"
                  textColor="#0a0a0a"
                  onPress={() => {
                    setVariant('error');
                    setVisible(true);
                  }}
                />
              </View>
            </View>
          </View>

          <Toast
            visible={visible}
            message={variant === 'success' ? 'Changes saved' : 'Could not save changes'}
            variant={variant}
            onHide={() => setVisible(false)}
            duration={2400}
          />
        </ScrollView>
      </View>
  );
}
