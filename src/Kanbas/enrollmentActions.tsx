import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  enrollUser,
  unenrollUser,
  getUserEnrollments,
} from "./enrollmentclient"; // Import from your enrollment client file

export const toggleEnrollment = createAsyncThunk(
  "enrollment/toggleEnrollment",
  async ({ userId, courseId, isEnrolled }: { userId: string; courseId: string; isEnrolled: boolean }) => {
    // Toggle enrollment based on current enrollment status
    if (isEnrolled) {
      await unenrollUser(userId, courseId); // Call API to unenroll
    } else {
      await enrollUser(userId, courseId); // Call API to enroll
    }
    return { userId, courseId, isEnrolled: !isEnrolled }; // Return the updated state
  }
);

export const fetchEnrollments = createAsyncThunk(
  "enrollment/fetchEnrollments",
  async (userId: string) => {
    const enrollments = await getUserEnrollments(userId); // Fetch enrollments from API
    return enrollments;
  }
);