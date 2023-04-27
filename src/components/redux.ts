import { Store } from 'redux';
import { AlchemyToolsReduxState } from './types';
import { legacy_createStore as createStore } from 'redux';

export const ACTIONS = {
  UPDATE: 'UPDATE'
};

const initialState = (): AlchemyToolsReduxState => ({});

export let store: Store<AlchemyToolsReduxState>;

export const getStore = () => store;

export function reducer0(state: AlchemyToolsReduxState | undefined, action: any): AlchemyToolsReduxState {
  if (state === undefined) {
    state = initialState();
  }
  switch (action.type) {
    case ACTIONS.UPDATE: {
      const data = action.payload as Record<string, any>;
      return { ...state, ...data };
    }

    default:
      return state;
  }
}

export function createReduxStore(): Store<AlchemyToolsReduxState> {
  if (store) {
    return store;
  }
  store = createStore(reducer0);
  return store;
}
