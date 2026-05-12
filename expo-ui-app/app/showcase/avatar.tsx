import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '@/components/ui/avatar';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('avatar')!;

export default function AvatarShowcaseScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={s.pageBg}>
        <ScrollView
          contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 36 }]}
          showsVerticalScrollIndicator={false}>
          <Text style={s.kicker}>{meta.category}</Text>
          <Text style={s.title}>{meta.title}</Text>
          <Text style={s.desc}>{meta.subtitle}</Text>
          <Text style={s.hint}>
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add avatar</Text>, then import
            from <Text style={s.inlineStrong}>@/components/ui/avatar</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Initials fallback</Text>
            <View style={s.row}>
              <Avatar name="Alex Rivera" size="sm" />
              <Avatar name="Jordan Lee" size="md" />
              <Avatar name="Sam Taylor" size="lg" showStatus status="online" />
            </View>
            <Text style={s.caption}>Sizes <Text style={{ fontWeight: '600' }}>sm</Text> · <Text style={{ fontWeight: '600' }}>md</Text> ·{' '}
            <Text style={{ fontWeight: '600' }}>lg</Text> with optional status dot.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Status tones</Text>
            <View style={s.row}>
              <Avatar name="Busy" size="lg" showStatus status="busy" />
              <Avatar name="Away" size="lg" showStatus status="away" />
            </View>
          </View>
        </ScrollView>
      </View>
  );
}
