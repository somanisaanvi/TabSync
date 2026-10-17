import { useState, useEffect, useCallback } from 'react';
import { UserPreferences, SyncMessage } from '../types';

const STORAGE_KEY = 'app_preferences';
const CHANNEL_NAME = 'settings_sync_channel';

const defaultPreferences: UserPreferences = {
  darkMode: false,
  language: 'en',
  fontSize: 16,
  updatedAt: Date.now(),
};

export function usePreferences() {
  // 1. Initialize state from localStorage or defaults
  const [preferences, setPreferencesState] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultPreferences;
  });

  // 2. Setup BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === 'PREFERENCES_UPDATE') {
        const incoming = event.data.payload;

        // Conflict Resolution: Last-Write-Wins based on timestamp
        setPreferencesState((current) => {
          if (incoming.updatedAt > current.updatedAt) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
            applyDomChanges(incoming);
            return incoming;
          }
          return current; // Ignore stale updates
        });
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  // Helper to apply DOM changes (dark mode class & font size)
  const applyDomChanges = (prefs: UserPreferences) => {
    if (prefs.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
  };

  // 3. Function to update preferences from UI
  const updatePreferences = useCallback((newValues: Partial<UserPreferences>) => {
    setPreferencesState((current) => {
      const updated: UserPreferences = {
        ...current,
        ...newValues,
        updatedAt: Date.now(), // Stamp with current time
      };

      // Persist locally
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      applyDomChanges(updated);

      // Broadcast to other tabs instantly
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'PREFERENCES_UPDATE', payload: updated });
      channel.close();

      return updated;
    });
  }, []);

  // Apply on initial mount
  useEffect(() => {
    applyDomChanges(preferences);
  }, []);

  return { preferences, updatePreferences };
}