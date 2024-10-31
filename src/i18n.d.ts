import 'i18next';
import { FrenchTranslation } from './utils/i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'fr';

    resources: {
      fr: FrenchTranslation;
    };
  }
}