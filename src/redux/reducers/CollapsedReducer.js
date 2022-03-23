export const CollApsedReducer = (prevState={isCollApsed:false},action) => {
  let {type} = action
  switch (type) {
    case "change_collapsed":
      let newState = {...prevState}
      newState.isCollApsed=!newState.isCollApsed
      return newState
    default: 
      return prevState
  }
}