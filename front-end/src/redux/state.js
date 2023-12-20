const initialState = {
    loggedIn: false  
  };
  
  export default function reducer(state = initialState, action) {
    switch(action.type) {
      case 'TOGGLE':
        return {
          ...state,
          loggedIn: !state.loggedIn  
        }
      default: 
        return state;
    }
  }