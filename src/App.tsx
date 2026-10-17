import React from 'react';
import { usePreferences } from './hooks/usePreferences';
import { Language } from './types';

export default function App() {
  const { preferences, updatePreferences } = usePreferences();

  // Translations dictionary for the language selector demo
  const translations = {
    en: { title: 'Settings Synchronization Dashboard', dark: 'Dark Mode', lang: 'Language', font: 'Font Size' },
    es: { title: 'Panel de Sincronización de Configuración', dark: 'Modo Oscuro', lang: 'Idioma', font: 'Tamaño de Fuente' },
    fr: { title: 'Tableau de Bord de Synchronisation', dark: 'Mode Sombre', lang: 'Langue', font: 'Taille de Police' },
    de: { title: 'Einstellungs-Synchronisierungs-Dashboard', dark: 'Dunkelmodus', lang: 'Sprache', font: 'Schriftgröße' },
  };

  const t = translations[preferences.language] || translations.en;

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
        
        <h1 className="text-2xl font-bold mb-6 text-center">{t.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
          Open this app in multiple browser tabs and change settings to see real-time cross-tab synchronization.
        </p>

        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <span className="font-medium">{t.dark}</span>
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={(e) => updatePreferences({ darkMode: e.target.checked })}
              className="w-6 h-6 accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <span className="font-medium">{t.lang}</span>
            <select
              value={preferences.language}
              onChange={(e) => updatePreferences({ language: e.target.value as Language })}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          {/* Font Size Slider */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-2">
            <div className="flex justify-between font-medium">
              <span>{t.font}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{preferences.fontSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="24"
              step="1"
              value={preferences.fontSize}
              onChange={(e) => updatePreferences({ fontSize: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400">
          Last Synced: {new Date(preferences.updatedAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}