import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import { LoadingProvider, useTopLoadingBar } from '@/context/top-loading-bar-context';
import { showcase as s } from '@/constants/showcase-chrome';
import { getShowcaseItem } from '@/lib/showcase-registry';

const meta = getShowcaseItem('top-loading-bar')!;

function TopBarDemoControls() {
  const { showLoading, hideLoading } = useTopLoadingBar();
  return (
    <View style={[s.row, { marginTop: 4 }]}>
      <View style={{ flex: 1 }}>
        <Button title="Show bar" onPress={showLoading} />
      </View>
      <View style={{ width: 10 }} />
      <View style={{ flex: 1 }}>
        <Button title="Hide" variant="outlined" textColor="#111827" onPress={hideLoading} />
      </View>
    </View>
  );
}

export default function TopLoadingBarShowcaseScreen() {
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
            Run <Text style={s.inlineStrong}>npx expo-app-ui add top-loading-bar</Text> — installs the bar
            component and <Text style={s.inlineStrong}>@/context/top-loading-bar-context</Text>.
          </Text>

          <View style={s.card}>
            <Text style={s.sectionLabel}>Local provider (demo)</Text>
            <Text style={s.body}>
              In your app root, wrap navigation with <Text style={{ fontWeight: '600' }}>LoadingProvider</Text>. Call{' '}
              <Text style={{ fontWeight: '600' }}>useTopLoadingBar()</Text> from screens or hooks.
            </Text>
            <LoadingProvider color="#0a0a0a">
              <TopBarDemoControls />
            </LoadingProvider>
          </View>
        </ScrollView>
      </View>
  );
}
