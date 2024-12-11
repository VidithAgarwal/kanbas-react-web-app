import { createSlice } from "@reduxjs/toolkit";
import { toggleEnrollment, fetchEnrollments } from "./enrollmentActions";

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  loading: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.enrollments = action.payload;
        state.loading = false;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch enrollments";
        state.loading = false;
      })
      .addCase(toggleEnrollment.fulfilled, (state, action) => {
        const { userId, courseId, isEnrolled } = action.payload;
        if (isEnrolled) {
          state.enrollments = state.enrollments.filter(
            (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
          );
        } else {
          state.enrollments.push({ user: userId, course: courseId });
        }
      });
  },
});

export default enrollmentSlice.reducer;