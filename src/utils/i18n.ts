import { en } from '../i18n/en';
import type { Translations } from '../i18n/en';

export const locales = ['en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

const translations: Record<Locale, Translations> = { en };

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function getAlternateUrls(
  path: string,
  activeLocale: Locale,
  site: string,
): Array<{ locale: Locale; url: string; active: boolean }> {
  return locales.map((locale) => ({
    locale,
    url: `${site}/${locale}/${path}`.replace(/\/+/g, '/').replace(':/', '://'),
    active: locale === activeLocale,
  }));
}

/** Format a date for display */
export function formatDate(date: Date, locale: Locale = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
