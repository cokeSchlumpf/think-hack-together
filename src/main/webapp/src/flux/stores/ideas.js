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
        id: 1,
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
      Constants.ADD_IDEA, this.onAddIdea
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
    const id = this._nextId();
    this.getState()[id] = payload;
    this.emit('change');
  }
});
