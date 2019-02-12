import {
  TOGGLE_LINE,
  TOGGLE_SEMI_LINE,
  TOGGLE_SEGMENT,
} from '../types';

const INITIAL_STATE = {
  showLine: true,
  showSemiLine: false,
  showSegment: false,
};


// we make sure returning the right action
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LINE:
      return {
        ...state,
        showLine: action.payload.showLine,
        showSegment: action.payload.showSegment,
        showSemiLine: action.payload.showSemiLine,
      };
    case TOGGLE_SEMI_LINE:
      return {
        ...state,
        showLine: action.payload.showLine,
        showSegment: action.payload.showSegment,
        showSemiLine: action.payload.showSemiLine,
      };
    case TOGGLE_SEGMENT:
      return {
        ...state,
        showLine: action.payload.showLine,
        showSegment: action.payload.showSegment,
        showSemiLine: action.payload.showSemiLine,
      };
    default:
      return state;
  }
}
