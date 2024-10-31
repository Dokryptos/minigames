import fr from '@/assets/locales/fr/common.json';
import app2Fr from '@/assets/locales/fr/app-2.json';
import woodlockFr from '@/assets/locales/fr/woodlock.json';
import i18n from "i18next";

const resources = {
  fr: {
    translation: {
      ...fr,
      ...app2Fr,
      ...woodlockFr,
    },
  },
} as const;

i18n
  .init({
    resources,
    lng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

export type FrenchTranslation = typeof resources.fr.translation;
