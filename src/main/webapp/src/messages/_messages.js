import _ from '../utils/underscore';
import deDE from './de-DE';
import enUS from './en-US';

const flatTranslations = (translations, _prefix) => {
  const prefix = _prefix ? _prefix : '';

  return _.reduce(_.keys(translations), (combined, key) => {
    let result = _.extend({}, combined);
    if (_.isString(translations[key])) {
      result[prefix + key] = translations[key];
    } else if (_.isObject(translations[key])) {
      result = _.extend({}, result, flatTranslations(translations[key], prefix + key + '.'));
    }
    return result;
  }, {});
};

export default {
  'de-DE': flatTranslations(deDE),
  'en-US': flatTranslations(enUS)
};
