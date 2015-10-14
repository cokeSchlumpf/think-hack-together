import StoreNames from '../flux/constants/_stores';
import IdeasStore from './ideas';

export default {
  [ StoreNames.IdeasStore ]: new IdeasStore()
};
