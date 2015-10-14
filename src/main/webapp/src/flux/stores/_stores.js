import StoreNames from './_storeNames';
import IdeasStore from './ideas';

export default {
  [ StoreNames.IdeasStore ]: new IdeasStore()
};
