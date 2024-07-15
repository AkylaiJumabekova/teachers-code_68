import './App.css';
import { createStore } from 'redux';
import { Counter } from './Container/Counter/Counter';

interface State {
  counter: number;
}

interface ActionWithPayload {
  type: string;
  payload?: number;
}

const initialState: State = {
  counter: 0,
};

const store = createStore(
  (state: State = initialState, action: ActionWithPayload) => {
    if (action.type === 'increase') {
      return { ...state, counter: state.counter + 1 };
    }

    if (action.type === 'increaseBy' && action.payload !== undefined) {
      return { ...state, counter: state.counter + action.payload };
    }

    return state;
  }
);

store.subscribe(() => {
  console.log('State:', store.getState());
});

// store.dispatch({ type: 'increase' }); // {type: 'something', payload: 234}

export const App = () => {
  return <Counter />;
};
