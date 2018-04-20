export const SET_NAV_CONTENT = 'SET_NAV_CONTENT';
export const SET_NAV_BUTTONS = 'SET_NAV_BUTTONS';

export const setNavContent = content => ({
  type: SET_NAV_CONTENT,
  payload: {content: content},
});

export const setNavButtons = buttons => ({
  type: SET_NAV_BUTTONS,
  payload: { buttons: buttons },
});