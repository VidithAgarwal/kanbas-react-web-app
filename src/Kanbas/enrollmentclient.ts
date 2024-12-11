import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Enroll a user in a course
export const enrollUser = async (userId: string, courseId: string) => {
  await axios.post(ENROLLMENTS_API, { userId, courseId });
};

// Unenroll a user from a course
export const unenrollUser = async (userId: string, courseId: string) => {
  await axios.delete(ENROLLMENTS_API, { data: { userId, courseId } });
};

// Fetch all enrollments for a user
export const getUserEnrollments = async (userId: string) => {
  const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
  return data;
};

// New: Fetch enrolled courses for a user
export const getEnrolledCourses = async (userId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/enrollments/${userId}/courses`);
  return data;
};