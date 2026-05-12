export type ShowcaseCategory =
  | 'Actions'
  | 'Forms'
  | 'Feedback'
  | 'Layout'
  | 'Media'
  | 'Pickers'
  | 'Context';

export interface ShowcaseItem {
  slug: string;
  title: string;
  subtitle: string;
  category: ShowcaseCategory;
  /** Lowercased tokens for search */
  keywords: string[];
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    slug: 'accordion',
    title: 'Accordion',
    subtitle: 'Expandable sections',
    category: 'Layout',
    keywords: ['collapse', 'expand', 'faq'],
  },
  {
    slug: 'auto-scroll-cards',
    title: 'Auto scroll cards',
    subtitle: 'Horizontal carousel with optional auto-advance',
    category: 'Layout',
    keywords: ['carousel', 'flatlist', 'cards'],
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    subtitle: 'Image or initials with optional status',
    category: 'Media',
    keywords: ['profile', 'image', 'initials'],
  },
  {
    slug: 'badge',
    title: 'Badge',
    subtitle: 'Status chips and dot indicators',
    category: 'Media',
    keywords: ['label', 'tag', 'dot'],
  },
  {
    slug: 'birthdate-picker',
    title: 'Birthdate picker',
    subtitle: 'Modal wheel-style date selection',
    category: 'Pickers',
    keywords: ['date', 'dob', 'modal'],
  },
  {
    slug: 'bottom-sheet',
    title: 'Bottom sheet',
    subtitle: 'Animated sheet with backdrop and swipe',
    category: 'Layout',
    keywords: ['modal', 'drawer', 'panel'],
  },
  {
    slug: 'box-view',
    title: 'Box view',
    subtitle: 'Flexbox helper with spacing props',
    category: 'Layout',
    keywords: ['flex', 'gap', 'container'],
  },
  {
    slug: 'button',
    title: 'Button',
    subtitle: 'Variants, loading, and icons',
    category: 'Actions',
    keywords: ['press', 'cta', 'submit'],
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    subtitle: 'Single date or range selection',
    category: 'Pickers',
    keywords: ['date', 'month', 'range'],
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    subtitle: 'Boolean input with label',
    category: 'Forms',
    keywords: ['toggle', 'form'],
  },
  {
    slug: 'custom-modal',
    title: 'Custom modal',
    subtitle: 'Reanimated modal with backdrop',
    category: 'Layout',
    keywords: ['overlay', 'dialog'],
  },
  {
    slug: 'custom-text',
    title: 'Custom text',
    subtitle: 'Typography presets and spacing',
    category: 'Media',
    keywords: ['typography', 'paragraph'],
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    subtitle: 'Centered alert with actions',
    category: 'Feedback',
    keywords: ['alert', 'confirm'],
  },
  {
    slug: 'loading-bar',
    title: 'Loading bar',
    subtitle: 'Indeterminate top progress strip',
    category: 'Feedback',
    keywords: ['spinner', 'reanimated'],
  },
  {
    slug: 'marquee',
    title: 'Marquee',
    subtitle: 'Horizontal scrolling text',
    category: 'Layout',
    keywords: ['ticker', 'scroll'],
  },
  {
    slug: 'otp-input',
    title: 'OTP input',
    subtitle: 'Digit code fields',
    category: 'Forms',
    keywords: ['pin', 'code', 'verification'],
  },
  {
    slug: 'profile-pic',
    title: 'Profile pic',
    subtitle: 'Avatar with remote image and loading',
    category: 'Media',
    keywords: ['image', 'user'],
  },
  {
    slug: 'progress-bar',
    title: 'Progress bar',
    subtitle: 'Determinate progress or count mode',
    category: 'Feedback',
    keywords: ['percent', 'upload'],
  },
  {
    slug: 'radio-group',
    title: 'Radio group',
    subtitle: 'Single choice from options',
    category: 'Forms',
    keywords: ['select', 'option'],
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    subtitle: 'Placeholder shimmer',
    category: 'Feedback',
    keywords: ['loading', 'placeholder'],
  },
  {
    slug: 'slider',
    title: 'Slider',
    subtitle: 'Numeric value on a track',
    category: 'Forms',
    keywords: ['range', 'volume'],
  },
  {
    slug: 'snackbar',
    title: 'Snackbar',
    subtitle: 'Brief message with optional action',
    category: 'Feedback',
    keywords: ['toast', 'banner'],
  },
  {
    slug: 'switch',
    title: 'Switch',
    subtitle: 'Animated toggle control',
    category: 'Forms',
    keywords: ['toggle', 'boolean'],
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    subtitle: 'Underline, pills, or segmented',
    category: 'Layout',
    keywords: ['segment', 'navigation'],
  },
  {
    slug: 'toast',
    title: 'Toast',
    subtitle: 'Transient corner notification',
    category: 'Feedback',
    keywords: ['message', 'notification'],
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    subtitle: 'Press to show floating hint',
    category: 'Feedback',
    keywords: ['hint', 'popover'],
  },
  {
    slug: 'top-loading-bar',
    title: 'Top loading bar (context)',
    subtitle: 'Provider + hook pattern from templates',
    category: 'Context',
    keywords: ['loading', 'provider', 'context'],
  },
];

const SLUG_SET = new Set(SHOWCASE_ITEMS.map((i) => i.slug));

export function getShowcaseItem(slug: string): ShowcaseItem | undefined {
  return SHOWCASE_ITEMS.find((i) => i.slug === slug);
}

export function isKnownShowcaseSlug(slug: string): boolean {
  return SLUG_SET.has(slug);
}
