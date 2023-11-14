const defaultState = {
  desires: {
    desiredPlace: '',
    styles: '',
    idol: '',
    condition: '',
    items: '',
  },
  about: {
    name: '',
    phone: '',
    link: '',
    place: '',
    wantWorldTattoo: false,
    wantWork: false,
  }
}

const SET_DESIRES = "SET_DESIRES"
const SET_ABOUT = "SET_ABOUT"

export const candidateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DESIRES: {
      return {
        ...state,
        desires: action.payload
      };
    }
    case SET_ABOUT: {
      return {
        ...state,
        about: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const setDesiresAction = (payload) => ({type: SET_DESIRES, payload})
export const setAboutAction = (payload) => ({type: SET_ABOUT, payload})