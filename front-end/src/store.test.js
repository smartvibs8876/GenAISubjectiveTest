import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

it('has initial state', () => {
  const store = configureStore({ reducer });
  expect(store.getState()).toEqual({ /* initial state */ }); 
});

it('updates state on action', () => {
  const store = configureStore({ reducer });
  store.dispatch({ type: 'counter/increment' });
  expect(store.getState()).toEqual({ /* updated state */ });
});