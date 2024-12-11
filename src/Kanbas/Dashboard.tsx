import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchAllCourses } from "./Courses/client"; 
import { useSelector } from "react-redux";

export default function Dashboard(
  {
    courses, 
    course, 
    setCourse, 
    addNewCourse, 
    deleteCourse, 
    updateCourse, 
    enrolling, 
    setEnrolling, 
    updateEnrollment 
  }:
  { 
    courses: any[]; 
    course: any; 
    setCourse: (course: any) => void; 
    addNewCourse: () => void; 
    deleteCourse: (course: any) => void; 
    updateCourse: () => void;  
    enrolling: boolean; 
    setEnrolling: (enrolling: boolean) => void;   
    updateEnrollment: (courseId: string, enrolled: boolean) => void 
  }
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  // const [allCourses, setAllCourses] = useState<any[]>(courses);
  // const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  
  // useEffect(() => {
  //   const loadEnrolledCourses = async () => {
  //     try {
  //       const fetchedEnrolledCourses = await fetchEnrolledCourses(); // Fetch enrolled courses
  //       setEnrolledCourses(fetchedEnrolledCourses); // Store enrolled courses
  //     } catch (error) {
  //       console.error("Error fetching enrolled courses:", error);
  //     }
  //   };
  //   if (currentUser && currentUser._id) {
  //     loadEnrolledCourses();
  //   }
  // }, [currentUser]);

  // const fetchEnrolledCourses = async () => {
  //   try {
  //     const response = await fetch(`/api/users/${currentUser._id}/courses`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch enrolled courses");
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching enrolled courses:", error);
  //     return [];
  //   }
  // };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId); 
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />

      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary">
        {enrolling ? "My Courses" : "All Courses"}
      </button>

      

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse}> Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5>
          <br />
          <input 
            value={course.name} 
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} 
            placeholder="Course Name"
          />
          <textarea 
            value={course.description} 
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      <h2>
        {enrolling ? "All Courses" : "My Courses"}
      </h2>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> 
      <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => {


            return (
              <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                <div className="card rounded-3 overflow-hidden">
                  <img src={course.image|| "/images/1.jpg"} width="100%" height={160} alt="Course Thumbnail" />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {enrolling && (
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled); // Use updateEnrollment prop
                          }}
                          className={`btn ${course.emrolled ? "btn-danger" : "btn-success"} float-end`}
                           >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    
                    {/* Only Go button wrapped in Link for navigation */}
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>

                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button 
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2">Edit
                        </button>
                        
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="btn btn-danger"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}