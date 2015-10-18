import StoreNames from './_storeNames';
import AppMessagesStore from './app-messages';
import EntitiesStore from './entities';

export default {
  [ StoreNames.AppMessagesStore ]: new AppMessagesStore(),
  [ StoreNames.EntitiesStore ]: new EntitiesStore()
};
