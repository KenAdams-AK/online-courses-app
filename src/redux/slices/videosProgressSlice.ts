import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IVideoProgress {
  lessonId:              string;
  startPoint:            number;
}

type InitialState = {
  videosProgresStorage: Record<string, number> | null
}

const initialState: InitialState = {
  videosProgresStorage: null
}

const videosProgressSlice = createSlice({
  name: 'videosProgress',
  initialState,
  reducers: {
    setVideosProgressStorage: (state, action: PayloadAction<Record<string, number>>) => {
      state.videosProgresStorage = action.payload
    },

    updateVideosProgressStorage: (state, action: PayloadAction<IVideoProgress>) => {
      if(state.videosProgresStorage == null ) state.videosProgresStorage = {}
      state.videosProgresStorage[action.payload.lessonId] = action.payload.startPoint
    }
  }
})

export const {setVideosProgressStorage, updateVideosProgressStorage } = videosProgressSlice.actions
export default videosProgressSlice.reducer