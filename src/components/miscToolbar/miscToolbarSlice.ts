import { createSlice } from '@reduxjs/toolkit'

export type MiscToolbarState = {
    visible: boolean
}

export const MiscToolbarSlice = createSlice({
  name: 'miscToolbar',
  initialState:{
    visible: true
  } as MiscToolbarState,
  reducers: {
    openMiscToolbar(state: MiscToolbarState){
        state.visible = true
    },
    closeMiscToolbar(state: MiscToolbarState){
        state.visible = false
    },
    toggleMiscToolbar(state: MiscToolbarState){
        state.visible = !state.visible
    }
  }
});

export const {closeMiscToolbar, openMiscToolbar, toggleMiscToolbar} = MiscToolbarSlice.actions

export const miscToolbarVisibilitySelector = (state: {miscToolbar: MiscToolbarState}) => state.miscToolbar.visible