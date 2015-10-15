import Fluxxor from 'fluxxor';
import Constants from '../constants/ideas';
import WebServiceClient from '../../utils/webserviceclient';

export default Fluxxor.createStore({
  initialize() {
    this.ideas = {
      newItems: [],
      topItems: []
    };

    this.bindActions(
      Constants.INIT, this.onInit,
      Constants.ADD_IDEA, this.onAddIdea,
      Constants.LIKE_IDEA, this.onLikeIdea
    );
  },

  _nextId() {
    if (!this.ideaId) {
      this.ideaId = 0;
    }

    this.ideaId = this.ideaId + 1;
    return this.ideaId;
  },

  getState() {
    return this.ideas;
  },

  onInit(payload) {
    this.ideas.newItems = payload;
    this.ideas.topItems = payload;
    this.emit('change');
  },

  onAddIdea(payload) {
    // const id = this._nextId();
    // this.getState()[id] = payload;
    this.emit('change');
  },

  onLikeIdea(payload) {
    this.ideas.newItems = this.ideas.newItems.map((idea) => {
      if (idea.id === payload.id) {
        idea.liked = !idea.liked;
        if (idea.liked) {
          idea.likes = idea.likes + 1;
        } else {
          idea.likes = idea.likes - 1;
        }
      }

      return idea;
    });

    this.ideas.topItems = this.ideas.topItems.map((idea) => {
      if (idea.id === payload.id) {
        idea.liked = !idea.liked;
        if (idea.liked) {
          idea.likes = idea.likes + 1;
        } else {
          idea.likes = idea.likes - 1;
        }
      }

      return idea;
    });

    this.emit('change');
  }
});
