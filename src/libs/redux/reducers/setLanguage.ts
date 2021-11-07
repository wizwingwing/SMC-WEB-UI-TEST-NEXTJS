export const actionTypes = {
    SET_LANGUAGE: 'SET_LANGUAGE',
  }

// ACTIONS
export const setLanguage = lang => dispatch => {
    return dispatch({ 
      type: actionTypes.SET_LANGUAGE,
      lang
    })
  }

