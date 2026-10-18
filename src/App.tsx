import { usePreferences } from './hooks/usePreferences';
import { Language } from './types';
import './App.css';

interface TranslationSchema {
  title: string;
  subtitle: string;
  banner: string;
  font: string;
  fontDesc: string;
  lastSynced: string;
  openNewTab: string;
  openTabTooltip: string;
  themeLight: string;
  themeDark: string;
}

const translations: Record<Language, TranslationSchema> = {
  en: {
    title: 'Settings Synchronization Dashboard',
    subtitle: 'Open this app in multiple browser tabs and adjust settings to experience seamless, zero-server cross-tab synchronization.',
    banner: 'Changes broadcast in real time across all open tabs via the native BroadcastChannel API with Last-Write-Wins conflict resolution.',
    font: 'Typography Scale',
    fontDesc: 'Adjust baseline font scaling across all connected tabs.',
    lastSynced: 'Last Synced',
    openNewTab: 'Open Test Tab',
    openTabTooltip: 'Open another tab side-by-side to test live sync',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  es: {
    title: 'Panel de Sincronización de Configuración',
    subtitle: 'Abre esta aplicación en varias pestañas del navegador y ajusta las opciones para experimentar sincronización en tiempo real.',
    banner: 'Los cambios se transmiten al instante a todas las pestañas abiertas mediante la API BroadcastChannel con resolución Last-Write-Wins.',
    font: 'Escala Tipográfica',
    fontDesc: 'Ajusta el tamaño tipográfico base en todas las pestañas conectadas.',
    lastSynced: 'Última Sincronización',
    openNewTab: 'Abrir Pestaña de Prueba',
    openTabTooltip: 'Abre otra pestaña para probar la sincronización en vivo',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  fr: {
    title: 'Tableau de Bord de Synchronisation',
    subtitle: 'Ouvrez cette application dans plusieurs onglets pour observer la synchronisation instantanée entre onglets sans serveur.',
    banner: 'Les modifications sont diffusées instantanément via l’API native BroadcastChannel avec résolution de conflit Last-Write-Wins.',
    font: 'Échelle Typographique',
    fontDesc: 'Ajustez la taille de police de base sur tous les onglets connectés.',
    lastSynced: 'Dernière Synchro',
    openNewTab: 'Ouvrir un Onglet',
    openTabTooltip: 'Ouvrez un autre onglet pour tester la synchronisation',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  de: {
    title: 'Einstellungs-Synchronisierungs-Dashboard',
    subtitle: 'Öffnen Sie diese App in mehreren Browser-Tabs, um nahtlose tab-übergreifende Echtzeit-Synchronisierung zu testen.',
    banner: 'Änderungen werden über die native BroadcastChannel-API mit Last-Write-Wins-Konfliktlösung sofort an alle offenen Tabs übertragen.',
    font: 'Schriftgrößen-Skalierung',
    fontDesc: 'Passen Sie die Schriftgröße über alle verbundenen Tabs hinweg an.',
    lastSynced: 'Zuletzt synchronisiert',
    openNewTab: 'Test-Tab öffnen',
    openTabTooltip: 'Weiteren Tab nebeneinander öffnen',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
};

export default function App() {
  const { preferences, updatePreferences } = usePreferences();

  const t = translations[preferences.language] || translations.en;

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const formattedTime = new Date(preferences.updatedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="app-wrapper">
      {/* Navigation Header with Controls spanning extreme left to extreme right */}
      <header className="app-header">
        <div className="header-inner">
          {/* Brand Logo: Extreme Left */}
          <div className="header-brand">
            <div className="brand-icon-wrapper" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <span className="brand-name">TabSync</span>
          </div>

          {/* Settings Controls: Extreme Right */}
          <div className="header-actions">
            {/* Language Selector Dropdown */}
            <div className="lang-dropdown-wrapper">
              <svg className="lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <select
                id="language-select"
                aria-label="Select language"
                value={preferences.language}
                onChange={(e) => updatePreferences({ language: e.target.value as Language })}
                className="lang-select"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
              </select>
              <svg className="lang-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Upper-Right Theme Toggle with simple Light and Dark text */}
            <div className="theme-segmented-control" role="group" aria-label="Theme selection">
              <button
                type="button"
                className={`theme-segment-btn ${!preferences.darkMode ? 'active' : ''}`}
                onClick={() => updatePreferences({ darkMode: false })}
              >
                {t.themeLight}
              </button>
              <button
                type="button"
                className={`theme-segment-btn ${preferences.darkMode ? 'active' : ''}`}
                onClick={() => updatePreferences({ darkMode: true })}
              >
                {t.themeDark}
              </button>
            </div>

            {/* Quick Test New Tab Button */}
            <button
              type="button"
              onClick={handleOpenNewTab}
              className="open-tab-btn"
              title={t.openTabTooltip}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>{t.openNewTab}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="app-main">
        <div className="dashboard-container">
          <section className="dashboard-card">
            <h1 className="card-title">{t.title}</h1>
            <p className="card-subtitle">{t.subtitle}</p>

            {/* Live Sync Banner */}
            <div className="sync-banner">
              <svg className="sync-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div>{t.banner}</div>
            </div>

            {/* Settings Stack: Font Scaling & Slider */}
            <div className="settings-stack">
              <div className="setting-card">
                <div className="setting-header">
                  <div className="setting-title-row">
                    <svg className="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="4 7 4 4 20 4 20 7" />
                      <line x1="9" y1="20" x2="15" y2="20" />
                      <line x1="12" y1="4" x2="12" y2="20" />
                    </svg>
                    <span className="setting-title">{t.font}</span>
                  </div>
                  <span className="setting-value-badge">{preferences.fontSize}px</span>
                </div>

                <p className="setting-desc">{t.fontDesc}</p>

                <div className="range-slider-wrapper">
                  <input
                    type="range"
                    id="font-size-slider"
                    min="12"
                    max="24"
                    step="1"
                    aria-label={t.font}
                    value={preferences.fontSize}
                    onChange={(e) => updatePreferences({ fontSize: Number(e.target.value) })}
                    className="range-slider"
                  />
                  <div className="slider-scale-markers" aria-hidden="true">
                    <span>12px</span>
                    <span>16px (Normal)</span>
                    <span>20px</span>
                    <span>24px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Synchronization Telemetry Footer (Clean Last Synced display without the extra clicker) */}
            <footer className="card-footer">
              <div className="telemetry-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{t.lastSynced}: <span className="telemetry-time">{formattedTime}</span></span>
              </div>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}