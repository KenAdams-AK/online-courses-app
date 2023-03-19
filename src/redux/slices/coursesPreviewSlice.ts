import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../helpers/tokenHandler';
import { Course, CoursesPreview } from "../../models/coursesPreviewModel"
import { apiRouts } from '../../routs/apiRouts';

type InitialState = {
  isLoading: boolean,
  courses: Course[],
  error: string | null
}

const initialState: InitialState = {
  isLoading: false,
  courses: [],
  error: null
}

export const fetchCoursesPreview = createAsyncThunk('coursesPreview/fetchCoursesPreview', async (_, { signal }): Promise<CoursesPreview> => {

  const { token } = await getToken(apiRouts.GET_TOKEN_URL, signal)
  const response = await axios.get<CoursesPreview>(apiRouts.GET_COURSES_PREVIEW_URL, {
    signal,
    headers: {
    'Authorization': `Bearer ${token}`
    }
  })
  
  return response.data
})

const coursesPreviewSlice = createSlice({
  name: 'coursesPreview',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchCoursesPreview.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchCoursesPreview.fulfilled, (state, action: PayloadAction<CoursesPreview>) => {
      state.isLoading = false
      state.courses = [...action.payload.courses].sort((a, b) => Date.parse(a.launchDate) < Date.parse(b.launchDate) ? 1 : -1)
    })
    builder.addCase(fetchCoursesPreview.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        console.warn('Abort fetch courses preview request: ', action.error)
        return
      }
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong. Try again later'
    })
  }
})

export const { setCourses } = coursesPreviewSlice.actions
export default coursesPreviewSlice.reducer