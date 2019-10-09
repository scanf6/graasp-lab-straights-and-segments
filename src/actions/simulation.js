import {
  TOGGLE_LINE,
  TOGGLE_SEMI_LINE,
  TOGGLE_SEGMENT,
} from '../types';


const toggleLine = (showLine, showSemiLine, showSegment) => dispatch => dispatch({
  type: TOGGLE_LINE,
  payload: { showLine, showSemiLine, showSegment },
});

const toggleSemiLine = (showLine, showSegment, showSemiLine) => dispatch => dispatch({
  type: TOGGLE_SEMI_LINE,
  payload: { showLine, showSegment, showSemiLine },
});

const toggleSegment = (showLine, showSegment, showSemiLine) => (dispatch) => {
  dispatch({
    type: TOGGLE_SEGMENT,
    payload: { showLine, showSegment, showSemiLine },
  });
};


export {
  toggleSegment,
  toggleLine,
  toggleSemiLine,
};
