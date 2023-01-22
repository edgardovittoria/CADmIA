import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CadmiaModality } from './cadmiaModalityType';


export type OrbitTarget = {
	id: string;
	position: [number, number, number];
};


export type CadmiaModalityState = {
    modality: CadmiaModality,
    orbitTarget: OrbitTarget|undefined
}

export const CadmiaModalitySlice = createSlice({
  name: 'cadmiaModality',
  initialState:{
    modality: 'NormalSelection',
    orbitTarget: undefined
  } as CadmiaModalityState,
  reducers: {
    setModality(state: CadmiaModalityState, action: PayloadAction<CadmiaModality>){
        state.modality = action.payload
    },
    setOrbitTarget(state: CadmiaModalityState, action: PayloadAction<OrbitTarget|undefined>){
        state.orbitTarget = action.payload
    }
  }
});

export const {setModality, setOrbitTarget} = CadmiaModalitySlice.actions

export const cadmiaModalitySelector = (state: { cadmiaModality: CadmiaModalityState}) => state.cadmiaModality.modality 
export const orbitTargetSelector = (state: { cadmiaModality: CadmiaModalityState}) => state.cadmiaModality.orbitTarget