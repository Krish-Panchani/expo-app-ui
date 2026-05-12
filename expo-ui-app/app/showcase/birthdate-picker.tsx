import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BirthdatePicker from '@/components/ui/birthdate-picker';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('birthdate-picker')!;

export default function BirthdatePickerShowcaseScreen() {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState('');
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with{' '}
            <Text style={s.inlineStrong}>npx expo-app-ui add birthdate-picker</Text>, then import
            from <Text style={s.inlineStrong}>@/components/ui/birthdate-picker</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Controlled output</Text>
            <BirthdatePicker onDateChange={setValue} />
            <Text style={s.caption}>{value ? `Last selection: ${value}` : 'Tap the row to open the wheel picker.'}</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>When to use</Text>
            <Text style={s.body}>
              Pair with your form state: store the string from <Text style={{ fontWeight: '600' }}>onDateChange</Text> or map it
              to a <Text style={{ fontWeight: '600' }}>Date</Text> before submit.
            </Text>
          </View>
        </ScrollView>
      </View>
  );
}
