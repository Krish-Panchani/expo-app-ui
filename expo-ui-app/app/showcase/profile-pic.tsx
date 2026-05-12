import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfilePic from '@/components/ui/profile-pic';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('profile-pic')!;

export default function ProfilePicShowcaseScreen() {
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
            Add with <Text style={s.inlineStrong}>npx expo-app-ui add profile-pic</Text>, then import from{' '}
            <Text style={s.inlineStrong}>@/components/ui/profile-pic</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Remote image</Text>
            <ProfilePic username="demo" source="https://i.pravatar.cc/120?img=12" width={72} height={72} />
            <Text style={s.caption}>Uses expo-image under the hood with a blurhash placeholder.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Initials fallback</Text>
            <ProfilePic username="Krish" width={56} height={56} />
            <Text style={s.caption}>When <Text style={{ fontWeight: '600' }}>source</Text> is missing or fails, initials render on a solid surface.</Text>
          </View>
        </ScrollView>
      </View>
  );
}
