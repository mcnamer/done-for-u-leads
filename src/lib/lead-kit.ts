const KEY = 'dfy-lead-kit-popup';

/** True while the popup is snoozed, or for good once the visitor has the kit. */
export function popupSnoozed() {
  try {
    return Date.now() < Number(localStorage.getItem(KEY));
  } catch {
    return false;
  }
}

export function snoozePopup(ms: number) {
  try {
    localStorage.setItem(KEY, String(Date.now() + ms));
  } catch {
    // Storage blocked (private window): the popup just shows again on the next visit.
  }
}
