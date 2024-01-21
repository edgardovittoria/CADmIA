import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction
} from '@reduxjs/toolkit';
import {TransformationsToolbarSlice} from "./components/transformationsToolbar/toolbarTransformationSlice";
import undoable, {excludeAction} from 'redux-undo';
import { persistReducer } from 'redux-persist'
import persistStore from "redux-persist/es/persistStore";
import localforage from 'localforage';
import { CanvasSlice, UsersSlice } from 'cad-library';
import { BinaryOperationsToolbarSlice } from './components/binaryOperationsToolbar/binaryOperationsToolbarSlice';
import { CadmiaModalitySlice } from './cadmiaModalityManagement/cadmiaModalitySlice';
import { SidebarSlice } from './components/sideBar/sidebarSlice';
import {StatusBarSlice} from "./components/statusBar/statusBarSlice";
import { MiscToolbarSlice } from './components/miscToolbar/miscToolbarSlice';
import { ShapesToolbarSlice } from './components/navBar/components/componentsItems/shapesToolbarSlice';
import { ViewItemSlice } from './components/navBar/viewIitem/viewItemSlice';

const persistConfig = {
    key: 'root',
    storage: localforage
}

const rootReducer = combineReducers({
    canvas: undoable(CanvasSlice.reducer, {
        limit: 20,
        filter: excludeAction(CanvasSlice.actions.incrementNumberOfGeneratedKey.type),
    }),
    transformationsToolbar: TransformationsToolbarSlice.reducer,
    binaryOperationsToolbar: BinaryOperationsToolbarSlice.reducer,
    cadmiaModality: CadmiaModalitySlice.reducer,
    sidebar: SidebarSlice.reducer,
    user: UsersSlice.reducer,
    statusBarSlice: StatusBarSlice.reducer, 
    miscToolbar: MiscToolbarSlice.reducer,
    shapesToolbar: ShapesToolbarSlice.reducer,
    viewItemState: ViewItemSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

