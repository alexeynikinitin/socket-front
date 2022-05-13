import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {chatReducer} from "./chat/chatReducer";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers(
   {
      chat: chatReducer
   }
)

export const store = configureStore({
   reducer: rootReducer,
   middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
