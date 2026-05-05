// @ts-nocheck
import * as __fd_glob_20 from "../content/docs/helpers/normalizeSize.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/constants/theme.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/components/progress-bar.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/components/profile-pic.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/components/otp-input.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/components/marquee.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/components/loading-bar.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/components/custom-text.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/components/custom-modal.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/components/calender.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/components/button.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/components/box-view.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/components/birthdate-picker.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/components/auto-scroll-cards.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/components/accordion.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/cli.mdx?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/constants/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/helpers/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/components/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "components/meta.json": __fd_glob_1, "helpers/meta.json": __fd_glob_2, "constants/meta.json": __fd_glob_3, }, {"cli.mdx": __fd_glob_4, "getting-started.mdx": __fd_glob_5, "components/accordion.mdx": __fd_glob_6, "components/auto-scroll-cards.mdx": __fd_glob_7, "components/birthdate-picker.mdx": __fd_glob_8, "components/box-view.mdx": __fd_glob_9, "components/button.mdx": __fd_glob_10, "components/calender.mdx": __fd_glob_11, "components/custom-modal.mdx": __fd_glob_12, "components/custom-text.mdx": __fd_glob_13, "components/loading-bar.mdx": __fd_glob_14, "components/marquee.mdx": __fd_glob_15, "components/otp-input.mdx": __fd_glob_16, "components/profile-pic.mdx": __fd_glob_17, "components/progress-bar.mdx": __fd_glob_18, "constants/theme.mdx": __fd_glob_19, "helpers/normalizeSize.mdx": __fd_glob_20, });