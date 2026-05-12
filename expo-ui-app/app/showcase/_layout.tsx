import { Stack } from 'expo-router';

import { SHOWCASE_ITEMS } from '@/lib/showcase-registry';

const HEADER_TITLE_BY_ROUTE = Object.fromEntries(
  SHOWCASE_ITEMS.map((item) => [item.slug, item.title])
) as Record<string, string>;

const stackChrome = {
  headerStyle: { backgroundColor: '#fafafa' },
  headerTintColor: '#0a0a0a',
  headerTitleStyle: { fontWeight: '600' as const, fontSize: 17, color: '#0a0a0a' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: '#fafafa' },
  headerBackTitle: 'Catalog',
};

export default function ShowcaseStackLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        ...stackChrome,
        title: HEADER_TITLE_BY_ROUTE[route.name] ?? 'Component',
      })}
    />
  );
}
