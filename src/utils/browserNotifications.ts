/**
 * Browser Notification Utility for Daily Challenge & 24-Hour Return Reminders
 */

const NOTIFICATION_STORAGE_KEYS = {
  LAST_LOGIN_TIMESTAMP: 'asgk_last_login_timestamp',
  REMINDERS_ENABLED: 'asgk_daily_reminders_enabled',
  LAST_NOTIFIED_DATE: 'asgk_last_24h_reminder_date',
};

export interface ReminderCheckResult {
  isOver24Hours: boolean;
  hoursElapsed: number;
  notificationSent: boolean;
  permission: NotificationPermission | 'unsupported';
  previousLoginDate?: string;
}

/**
 * Check if the browser supports the Web Notification API
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current browser notification permission
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Check if the user has enabled daily reminder notifications in preferences
 */
export function isDailyReminderEnabled(): boolean {
  try {
    const saved = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.REMINDERS_ENABLED);
    return saved !== 'false'; // Default to true if not explicitly set to false
  } catch {
    return true;
  }
}

/**
 * Save user preference for daily reminder notifications
 */
export function setDailyReminderEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(NOTIFICATION_STORAGE_KEYS.REMINDERS_ENABLED, String(enabled));
  } catch {}
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) return 'unsupported';

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setDailyReminderEnabled(true);
      // Send a confirmation greeting
      try {
        new Notification('🎯 Daily Challenge Reminders Enabled!', {
          body: 'You will receive a gentle reminder if you have not practiced for over 24 hours to protect your streak.',
          icon: '/pwa-192x192.png',
          tag: 'asgk-reminder-confirmed',
        });
      } catch (e) {
        console.warn('Native notification test failed:', e);
      }
    }
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
}

/**
 * Format hours into a friendly display string (e.g. "26 hours" or "2 days")
 */
export function formatElapsedHours(hours: number): string {
  if (hours >= 48) {
    const days = Math.floor(hours / 24);
    return `${days} days`;
  }
  return `${Math.round(hours)} hours`;
}

/**
 * Record current login/session activity and check if > 24 hours have elapsed since the last session.
 * Automatically triggers the browser notification if permission is granted and records the reminder.
 */
export function recordAndCheck24HourActivity(challengeSetTitle?: string): ReminderCheckResult {
  const now = Date.now();
  let previousTimestamp: number | null = null;
  let isOver24Hours = false;
  let hoursElapsed = 0;
  let notificationSent = false;
  let previousLoginDate: string | undefined;

  try {
    const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.LAST_LOGIN_TIMESTAMP);
    if (raw) {
      previousTimestamp = Number(raw);
      if (!isNaN(previousTimestamp) && previousTimestamp > 0) {
        const diffMs = now - previousTimestamp;
        hoursElapsed = diffMs / (1000 * 60 * 60);
        isOver24Hours = hoursElapsed >= 24;
        previousLoginDate = new Date(previousTimestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    }
  } catch (e) {
    console.warn('Failed to read last login timestamp:', e);
  }

  // Check if we should trigger a browser notification
  const todayKey = new Date().toISOString().split('T')[0];
  let lastNotifiedDate = '';
  try {
    lastNotifiedDate = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.LAST_NOTIFIED_DATE) || '';
  } catch {}

  const permission = getNotificationPermission();
  const remindersEnabled = isDailyReminderEnabled();

  // If user hasn't visited in over 24 hours, and hasn't been notified today yet
  if (isOver24Hours && lastNotifiedDate !== todayKey && remindersEnabled && permission === 'granted') {
    try {
      const title = '🎯 Daily Challenge Ready! | MCQ Grammar Points';
      const body = `Welcome back! It's been over ${formatElapsedHours(
        hoursElapsed
      )} since your last session. Complete today's Daily Challenge${
        challengeSetTitle ? ` ("${challengeSetTitle}")` : ''
      } to maintain your daily streak & earn +100 bonus points!`;

      const notification = new Notification(title, {
        body,
        icon: '/pwa-192x192.png',
        badge: '/favicon.svg',
        tag: 'asgk-24h-daily-reminder',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      notificationSent = true;
      localStorage.setItem(NOTIFICATION_STORAGE_KEYS.LAST_NOTIFIED_DATE, todayKey);
    } catch (err) {
      console.warn('Could not display native notification:', err);
    }
  }

  // Update current session timestamp
  try {
    localStorage.setItem(NOTIFICATION_STORAGE_KEYS.LAST_LOGIN_TIMESTAMP, String(now));
  } catch {}

  return {
    isOver24Hours,
    hoursElapsed,
    notificationSent,
    permission,
    previousLoginDate,
  };
}

/**
 * Trigger an instant test notification so the user can verify permissions and behavior
 */
export function triggerTestNotification(): boolean {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    const testNotification = new Notification('🎯 Test Daily Challenge Notification', {
      body: 'This is how your 24-hour Daily Challenge reminder will appear! Keep practicing grammar daily to protect your streak.',
      icon: '/pwa-192x192.png',
      tag: 'asgk-test-reminder',
    });

    testNotification.onclick = () => {
      window.focus();
      testNotification.close();
    };

    return true;
  } catch {
    return false;
  }
}
