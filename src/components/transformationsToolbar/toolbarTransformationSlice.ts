import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransformationType } from "./transformationsTypes";

type TransformationItem = {
    type: TransformationType,
    active: boolean
}

export type TransformationsToolbarState = {
    transformations: TransformationItem[]
}

export const TransformationsToolbarSlice = createSlice({
    name: 'transformationsToolbar',
    initialState: {
        transformations: [
            {
                type: 'translate',
                active: true,
            },
            {
                type: 'rotate',
                active: false,
            },
            {
                type: 'scale',
                active: false,
            }]
    } as TransformationsToolbarState,
    reducers: {
        setTransformationActive(transformationState: TransformationsToolbarState, action: PayloadAction<TransformationType>) {
            transformationState.transformations = transformationState.transformations.map(t => (t.type === action.payload) ? { ...t, active: true } : { ...t, active: false })
        },
        setNextTransformationActive(state: TransformationsToolbarState) {
            let indexTransformationToActivate = (state.transformations.indexOf(state.transformations.filter(transformation => transformation.type === getActiveTransformationWithin(state).type)[0]) + 1) % state.transformations.length;
            state.transformations = state.transformations.map((t, index) => (index === indexTransformationToActivate) ? { ...t, active: true } : { ...t, active: false })
        }
    }
})

export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    setTransformationActive, setNextTransformationActive
} = TransformationsToolbarSlice.actions

export const transformationsSelector = (state: { transformationsToolbar: TransformationsToolbarState }) => state.transformationsToolbar.transformations
export const activeTransformationSelector = (state: { transformationsToolbar: TransformationsToolbarState }) => getActiveTransformationWithin(state.transformationsToolbar)
const getActiveTransformationWithin = (state: TransformationsToolbarState) => state.transformations.filter(t => t.active)[0] 