const STORAGE_KEY = 'fc_welcome_notification_trigger';
const EVENT_NAME = 'fitnesscafe:show-welcome';

/**
 * Triggers a one-time welcome notification for the specified user.
 * Writes to sessionStorage (for page navigations/redirects) and emits a CustomEvent (for instant same-page handling).
 *
 * @param {string} [userName] - The display name of the authenticated user.
 */
export function triggerWelcome(userName) {
  if (typeof window === 'undefined') return;

  const payload = {
    userName: userName || '',
    timestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to store welcome notification payload:', err);
  }

  // Dispatch custom event for instant in-memory listeners
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: payload,
    })
  );
}

/**
 * Sets a flag for social login (OAuth) to show welcome notification upon redirect return.
 */
export function triggerSocialWelcome() {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isSocial: true,
        timestamp: Date.now(),
      })
    );
  } catch (err) {
    console.error('Failed to set social welcome flag:', err);
  }
}

/**
 * Consumes the single-use welcome notification trigger from sessionStorage.
 * Immediately removes it so that subsequent page refreshes never re-trigger the notification.
 *
 * @returns {{ userName?: string, isSocial?: boolean, timestamp?: number } | null}
 */
export function consumeWelcomeTrigger() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    // Immediately remove from storage to guarantee one-time consumption
    sessionStorage.removeItem(STORAGE_KEY);

    const parsed = JSON.parse(raw);

    // Expire if the trigger is older than 60 seconds (prevents stale OAuth residue)
    if (parsed.timestamp && Date.now() - parsed.timestamp > 60000) {
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Error reading welcome notification trigger:', err);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    return null;
  }
}

/**
 * Clears any pending welcome notification triggers.
 */
export function clearWelcomeTrigger() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export { EVENT_NAME };
