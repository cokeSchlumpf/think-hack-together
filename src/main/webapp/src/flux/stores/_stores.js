import StoreNames from './_storeNames';
import AppMessagesStore from './app-messages';
import IdeasStore from './ideas';

export default {
  [ StoreNames.AppMessagesStore ]: new AppMessagesStore(),
  [ StoreNames.IdeasStore ]: new IdeasStore()
};
