import { z } from 'zod';
import i18next from 'i18next';
import { makeZodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/pt/zod.json'; 

i18next.init({
  lng: 'pt', 
  resources: {
    pt: {
      zod: translation, 
    },
  },
});

z.setErrorMap(makeZodI18nMap({ ns: 'zod' }));

export { z };