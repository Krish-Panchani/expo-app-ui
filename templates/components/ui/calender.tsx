/**
 * @deprecated The "calender" spelling is a typo and will be removed in v2.0.0.
 * Use `calendar` instead:
 *
 *   npx expo-app-ui add calendar
 *
 * This file re-exports the renamed component so existing imports keep working.
 */

import Calendar from "./calendar";

if (__DEV__) {
  // eslint-disable-next-line no-console
  console.warn(
    '[expo-app-ui] "calender" is deprecated and will be removed in v2.0.0. ' +
      'Rename your import path from "@/components/ui/calender" to "@/components/ui/calendar".'
  );
}

export default Calendar;
