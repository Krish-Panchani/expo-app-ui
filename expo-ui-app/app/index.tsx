import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { showcase as s } from '@/constants/showcase-chrome';
import { SHOWCASE_ITEMS, type ShowcaseItem } from '@/lib/showcase-registry';

function normalize(str: string) {
  return str.trim().toLowerCase();
}

function matchesQuery(item: ShowcaseItem, q: string) {
  if (!q) return true;
  const n = normalize(q);
  return (
    normalize(item.title).includes(n) ||
    normalize(item.subtitle).includes(n) ||
    normalize(item.category).includes(n) ||
    item.keywords.some((k) => normalize(k).includes(n))
  );
}

export default function CatalogScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const filtered = SHOWCASE_ITEMS.filter((item) => matchesQuery(item, query));
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [query]);

  const listHeader = (
    <View style={styles.listHeader}>
      <Text style={s.title}>Components</Text>
      <Text style={s.desc}>
        Copy-paste blocks for Expo — same output as <Text style={s.inlineStrong}>npx expo-app-ui add</Text>. Tap a
        card to see usage and live examples.
      </Text>
      <Text style={s.hint}>Light preview only · matches the default canvas most templates assume.</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Filter by name, category, keyword…"
        placeholderTextColor="#a3a3a3"
        style={styles.search}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );

  return (
    <View style={[s.pageBg, { flex: 1 }]}>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.slug}
        numColumns={2}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={listHeader}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: insets.bottom + 28,
          gap: 12,
        }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.empty}>No matches. Try a shorter search.</Text>}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/showcase/${item.slug}` as Href)}
            style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
          >
            <Text style={styles.tileKicker}>{item.category}</Text>
            <Text style={styles.tileTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.tileSub} numberOfLines={2}>
              {item.subtitle}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    marginBottom: 4,
  },
  search: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0a0a0a',
  },
  column: { gap: 12 },
  tile: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    minHeight: 128,
  },
  tilePressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  tileKicker: {
    fontSize: 10,
    fontWeight: '700',
    color: '#737373',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  tileSub: { fontSize: 13, color: '#737373', lineHeight: 18 },
  empty: { textAlign: 'center', marginTop: 36, fontSize: 14, color: '#737373' },
});
