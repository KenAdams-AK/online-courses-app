import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import coursesPreviewReducer from './slices/coursesPreviewSlice'
import courseDetailsReducer from './slices/courseDetailsSlice'
import videosProgressReducer from './slices/videosProgressSlice'

const store = configureStore({
  reducer: {
    coursesPreview: coursesPreviewReducer,
    courseDetails: courseDetailsReducer,
    videosProgress: videosProgressReducer,
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store