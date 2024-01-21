import { createSlice } from '@reduxjs/toolkit'


export type ViewItemSlice = {
    focusToOrigin: boolean
}

export const ViewItemSlice = createSlice({
  name: 'viewItemState',
  initialState:{
    focusToOrigin: true
  } as ViewItemSlice,
  reducers: {
    resetFocusToOrigin(state: ViewItemSlice){
        state.focusToOrigin = true
    }, 
    setFocusNotToOrigin(state: ViewItemSlice){
        state.focusToOrigin = false
    }
  }
});

export const {resetFocusToOrigin, setFocusNotToOrigin} = ViewItemSlice.actions

export const focusToOriginSelector = (state: { viewItemState: ViewItemSlice}) => state.viewItemState.focusToOrigin