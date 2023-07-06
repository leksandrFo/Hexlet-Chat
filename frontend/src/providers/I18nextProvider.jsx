import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import localeConfig from '../locales/localeConfig';

const i18nextInstance = i18next.createInstance();

i18nextInstance
  .use(initReactI18next)
  .init(localeConfig);

const I18nProvider = ({ children }) => (
  <I18nextProvider i18nextInstance={i18nextInstance}>
    {children}
  </I18nextProvider>
);

export default I18nProvider;
