// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"cli.mdx": () => import("../content/docs/cli.mdx?collection=docs"), "getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "components/accordion.mdx": () => import("../content/docs/components/accordion.mdx?collection=docs"), "components/auto-scroll-cards.mdx": () => import("../content/docs/components/auto-scroll-cards.mdx?collection=docs"), "components/birthdate-picker.mdx": () => import("../content/docs/components/birthdate-picker.mdx?collection=docs"), "components/box-view.mdx": () => import("../content/docs/components/box-view.mdx?collection=docs"), "components/button.mdx": () => import("../content/docs/components/button.mdx?collection=docs"), "components/calender.mdx": () => import("../content/docs/components/calender.mdx?collection=docs"), "components/custom-modal.mdx": () => import("../content/docs/components/custom-modal.mdx?collection=docs"), "components/custom-text.mdx": () => import("../content/docs/components/custom-text.mdx?collection=docs"), "components/loading-bar.mdx": () => import("../content/docs/components/loading-bar.mdx?collection=docs"), "components/marquee.mdx": () => import("../content/docs/components/marquee.mdx?collection=docs"), "components/otp-input.mdx": () => import("../content/docs/components/otp-input.mdx?collection=docs"), "components/profile-pic.mdx": () => import("../content/docs/components/profile-pic.mdx?collection=docs"), "components/progress-bar.mdx": () => import("../content/docs/components/progress-bar.mdx?collection=docs"), "constants/theme.mdx": () => import("../content/docs/constants/theme.mdx?collection=docs"), "helpers/normalizeSize.mdx": () => import("../content/docs/helpers/normalizeSize.mdx?collection=docs"), }),
};
export default browserCollections;