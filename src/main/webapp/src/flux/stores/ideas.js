import Fluxxor from 'fluxxor';

import Constants from '../constants/ideas';

export default Fluxxor.createStore({
  initialize() {
    this.ideas = {
      newItems: [ {
        color: 'light-orange',
        date: 1444675856,
        id: 1,
        likes: 296,
        liked: false,
        organizer: 'Michael Wellner',
        tags: [ 'Mobile', 'Cloud' ],
        title: 'Lorem Ipsum dolor',
        town: 'Munich',
        type: 'Hackathon'
      }, {
        color: 'turquoise',
        date: 1444675856,
        id: 2,
        liked: true,
        likes: 228,
        organizer: 'Jean Valjean',
        tags: [ 'Mobile', 'Cloud' ],
        title: 'Lorem Ipsum dolor sit amet dolor',
        town: 'Paris',
        type: 'Ongoing'
      } ],
      topItems: [ {
        color: 'light-orange',
        date: 1444675856,
        id: 1,
        likes: 296,
        liked: false,
        organizer: 'Michael Wellner',
        tags: [ 'Mobile', 'Cloud' ],
        title: 'Lorem Ipsum dolor',
        town: 'Munich',
        type: 'Hackathon'
      }, {
        color: 'turquoise',
        date: 1444675856,
        id: 2,
        liked: true,
        likes: 228,
        organizer: 'Jean Valjean',
        tags: [ 'Mobile', 'Cloud' ],
        title: 'Lorem Ipsum dolor sit amet dolor',
        town: 'Paris',
        type: 'Ongoing'
      } ]
    };

    this.bindActions(
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
