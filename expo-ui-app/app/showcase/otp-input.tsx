import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OtpInput from '@/components/ui/otp-input';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('otp-input')!;

export default function OtpInputShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add otp-input</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/otp-input</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Six digits</Text>
            <OtpInput length={6} onChangeText={setCode} />
            <Text style={s.caption}>Current value: {code || '—'}</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Integration</Text>
            <Text style={s.body}>
              Wire <Text style={{ fontWeight: '600' }}>onChangeText</Text> to your form, enable{' '}
              <Text style={{ fontWeight: '600' }}>isSuccess</Text> / <Text style={{ fontWeight: '600' }}>isError</Text> from your verify
              API response.
            </Text>
          </View>
        </ScrollView>
      </View>
  );
}
