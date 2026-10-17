export type Language = 'en' | 'es' | 'fr' | 'de';

export interface UserPreferences {
  darkMode: boolean;
  language: Language;
  fontSize: number; // in pixels (e.g., 14 to 24)
  updatedAt: number; // Timestamp for Last-Write-Wins conflict resolution
}

export type SyncMessage = {
  type: 'PREFERENCES_UPDATE';
  payload: UserPreferences;
};