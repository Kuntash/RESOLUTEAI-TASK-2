export const drawerOpenReducer = (_, action) => {
  switch (action.type) {
    case 'open':
      return true;
    case 'close':
      return false;
    default:
      return;
  }
};

export const initialState = true;
