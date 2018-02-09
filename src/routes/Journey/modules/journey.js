// @Chris
// Start with our journey
// So one Redux application need
// - constants to define contants, which like event name, I think
// - an array of actions which we use for example: addMission, deletMission
// - then we need reducer with its action handler
// @see bellow
//


// ------------------------------------
// Constants
// ------------------------------------
export const MISSION_ADD = 'MISSION_ADD'
export const MISSION_DELETE = 'MISSION_DELETE'

// ------------------------------------
// Actions
// ------------------------------------
export function addMission (mission) {
  return {
    type    : MISSION_ADD,
    payload : mission
  }
}

// and example with promise for delete mission after 200 miliseconds
export const deleteMission = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : MISSION_DELETE,
          payload : id
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  addMission,
  deleteMission
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MISSION_ADD]    : (state, action) => {
    return {
      ...state,
      Missions: [
        ...state.Missions,
        action.payload
      ]
    }
  },
  [MISSION_DELETE] : (state, action) => {
    return state * 2
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const defaultMission ={
  Name: "New Mission",
  Icon: 'image',
  Description: 'Loremp ipsum sit dolor asmet',
}

const initialState = {
  Id: "1",
  Fetching: "false",
  Name: "Mysterious journey",
  Missions: [
    defaultMission,
    defaultMission,
    defaultMission
  ]
}

export default function journeyReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
