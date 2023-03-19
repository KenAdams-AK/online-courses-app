import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../helpers/tokenHandler';
import { CourseDetails } from '../../models/courseDetailsModel';
import { apiRouts } from '../../routs/apiRouts';

type InitialState = {
  isLoading: boolean,
  courseDetails: CourseDetails | null,
  error: string | null
}

const initialState: InitialState = {
  isLoading: false,
  courseDetails: null,
  error: null
}

export const fetchCourseDetails = createAsyncThunk('courseDetails/fetchCourseDetails', async (id: string, { signal }): Promise<CourseDetails> => {
  
  const {token} = await getToken(apiRouts.GET_TOKEN_URL, signal)
  const response = await axios.get<CourseDetails>(`${apiRouts.GET_COURSES_PREVIEW_URL}/${id}`, {
    signal,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  
  return response.data
})

const courseDetailsSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourseDetails: (state, action: PayloadAction<CourseDetails>) => {
      state.courseDetails = action.payload
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchCourseDetails.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchCourseDetails.fulfilled, (state, action: PayloadAction<CourseDetails>) => {
      state.isLoading = false
      state.courseDetails = action.payload
    })
    builder.addCase(fetchCourseDetails.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        console.warn('Abort fetch course details request: ', action.error)
        return
      }
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong. Try again later'
    })
  }
})

export const { setCourseDetails } = courseDetailsSlice.actions
export default courseDetailsSlice.reducer