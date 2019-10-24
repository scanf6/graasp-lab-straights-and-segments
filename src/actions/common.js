import isInFrame from '../utils/isInFrame';
import {
  MISSING_API_HOST_MESSAGE,
  MISSING_APP_INSTANCE_ID_MESSAGE,
  MISSING_SPACE_ID_MESSAGE,
} from '../constants/messages';

const flag = type => payload => dispatch => dispatch({
  type,
  payload,
});

const isErrorResponse = async (response) => {
  const LOWEST_HTTP_ERROR_CODE = 400;
  const HIGHEST_HTTP_ERROR_CODE = 599;

  if (
    response.status >= LOWEST_HTTP_ERROR_CODE
    && response.status <= HIGHEST_HTTP_ERROR_CODE
  ) {
    // assumes response has a message property
    const { message } = await response.json();

    throw message;
  }
};

const getApiContext = (getState) => {
  const { context } = getState();
  const {
    apiHost,
    appInstanceId,
    spaceId,
    userId,
    offline,
    subSpaceId,
    sessionId,
    dev,
  } = context;

  if (!dev && !isInFrame()) {
    return {
      standalone: true,
    };
  }
  // these bits of context are needed when running online
  if (!offline) {
    if (!apiHost) {
      throw Error(MISSING_API_HOST_MESSAGE);
    }
    if (!appInstanceId) {
      throw Error(MISSING_APP_INSTANCE_ID_MESSAGE);
    }
    if (!spaceId) {
      throw Error(MISSING_SPACE_ID_MESSAGE);
    }
  }
  return {
    apiHost,
    appInstanceId,
    spaceId,
    userId,
    offline,
    subSpaceId,
    sessionId,
  };
};

const getSettings = (getState) => {
  const { appInstance } = getState();
  if (appInstance && appInstance.settings) {
    return appInstance.settings;
  }
  return {};
};

export {
  flag,
  isErrorResponse,
  getApiContext,
  getSettings,
};
