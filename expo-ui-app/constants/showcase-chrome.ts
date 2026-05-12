import { Platform, StyleSheet } from 'react-native';

/** Light-only layout tokens (shadcn-inspired: neutral borders, soft surfaces). */
export const showcase = StyleSheet.create({
  pageBg: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '600',
    color: '#737373',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0a0a0a',
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    color: '#525252',
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    lineHeight: 20,
    color: '#737373',
    marginBottom: 24,
  },
  /** Inline emphasis in hints (monochrome). */
  inlineStrong: {
    fontWeight: '700',
    color: '#0a0a0a',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#737373',
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e5e5',
    marginVertical: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  caption: {
    fontSize: 13,
    color: '#737373',
    marginTop: 12,
    lineHeight: 18,
  },
  code: {
    fontSize: 12,
    color: '#737373',
    marginTop: 10,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
  body: {
    fontSize: 14,
    color: '#404040',
    lineHeight: 21,
  },
  cardInner: {
    borderRadius: 8,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    padding: 14,
  },
  loadingHost: {
    minHeight: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
  },
  marqueeClip: {
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  marqueeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a0a0a',
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a0a0a',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 8,
  },
  spacerSm: { height: 10 },
  spacerMd: { height: 16 },
});
