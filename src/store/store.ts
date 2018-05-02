export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      // removes subscribed function
      // function does not equal function
      // console.log(this.subscribers);
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
      console.log('subscribers');
      console.log(fn, this.subscribers);
    };
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state, action) {
    const newState = {};
    for (const prop in this.reducers) {
      //newState.todos =  this.reducers.todos();
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}

//console.log(store.value);
