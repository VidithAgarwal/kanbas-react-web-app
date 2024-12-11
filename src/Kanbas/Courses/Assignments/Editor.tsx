// src/Kanbas/Courses/Assignments/Editor.tsx
import { useState, useEffect } from "react";
import { FaChevronDown, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom"; // Updated import path
import { useDispatch, useSelector } from "react-redux";
import { Assignment } from "./types";
import { addAssignment, updateAssignment as updateAssignmentRedux } from "./reducer";
import { updateAssignment as updateAssignmentAPI, createAssignment } from "./client";



interface AppState {
    assignmentsReducer: { assignments: Assignment[] };
}

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid?: string }>();
    const isNewAssignment = aid === 'new'; 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve assignment if editing
    const existingAssignment = useSelector((state: AppState) =>
        state.assignmentsReducer.assignments.find((a) => a._id === aid)
    );

    // Initialize state with assignment details or default values for a new assignment
    const [assignment, setAssignment] = useState<Partial<Assignment>>({
        //_id: string; // Mongoose ObjectId represented as a string
        title: "",
        description: "",
        points: 100,
        due: new Date().toISOString().slice(0, 16),
        not_available_until: new Date().toISOString().slice(0, 16),
        available_until: new Date().toISOString().slice(0, 16),
        course: cid || "",
        assignment_group: "ASSIGNMENTS",
        display_grade_as: "Percentage",
        submission_type: "Online",
        online_entry_option: ["Text Entry"],
    });

    const [selectedAssignTo, setSelectedAssignTo] = useState('Everyone');

    // Populate the form with existing assignment data when editing
    useEffect(() => {
        if (!isNewAssignment && existingAssignment) {
            setAssignment(existingAssignment);
        }
    }, [isNewAssignment, existingAssignment]);


    const handleSave = async () => {
        try {
            if (isNewAssignment) {
                // Create a new assignment
                const newAssignment = await createAssignment({ ...assignment, course: cid });
                dispatch(addAssignment(newAssignment));
            } else {
                // Update an existing assignment
                const updatedAssignment = await updateAssignmentAPI(assignment);
                dispatch(updateAssignmentRedux(updatedAssignment));
            }
            navigate(`/Kanbas/Courses/${cid}/Assignments`);
        } catch (error) {
            console.error("Error saving assignment:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            {/* Assignment Name */}
            <div className="row mb-2">
                <div className="col">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input
                        id="wd-name"
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div className="row mb-3">
                <div className="col-md-12">
                    <label htmlFor="wd-description" className="form-label">Description</label>
                    <textarea
                        id="wd-description"
                        className="form-control"
                        value={assignment.description}
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                        required
                    />
                </div>
            </div>

            {/* Points */}
            <div className="row mb-2">
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                </div>
                <div className="col-md-9">
                    <input
                        id="wd-points"
                        type="number"
                        value={assignment.points}
                        onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
                        className="form-control"
                        required
                    />
                </div>
            </div>

            {/* Assignment Group */}
            <div className="row mb-2">
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col-md-9">
                    <div className="input-group">
                        <select
                            id="wd-group"
                            className="form-control"
                            value={assignment.assignment_group}
                            onChange={(e) => setAssignment({ ...assignment, assignment_group: e.target.value })}
                            required
                        >
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="PROJECT">PROJECT</option>
                            <option value="EXAM">EXAM</option>
                        </select>
                        <span className="input-group-text"><FaChevronDown /></span>
                    </div>
                </div>
            </div>

            {/* Display Grade As */}
            <div className="row mb-2">
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                </div>
                <div className="col-md-9">
                    <div className="input-group">
                        <select
                            id="wd-display-grade-as"
                            className="form-control"
                            value={assignment.display_grade_as}
                            onChange={(e) => setAssignment({ ...assignment, display_grade_as: e.target.value })}
                            required
                        >
                            <option value="Percentage">Percentage</option>
                            <option value="Grade">Grade</option>
                            <option value="As it is">As it is</option>
                        </select>
                        <span className="input-group-text"><FaChevronDown /></span>
                    </div>
                </div>
            </div>

            {/* Submission Type */}
            <div className="row mb-2">
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                </div>
                <div className="col-md-9">
                    <div className="input-group">
                        <select
                            id="wd-submission-type"
                            className="form-control"
                            value={assignment.submission_type}
                            onChange={(e) => setAssignment({ ...assignment, submission_type: e.target.value })}
                            required
                        >
                            <option value="Online">Online</option>
                            <option value="In-Person">In-Person</option>
                            <option value="URL">Web URL</option>
                        </select>
                        <span className="input-group-text"><FaChevronDown /></span>
                    </div>
                </div>
            </div>

            {/* Online Entry Options */}
            <div className="border p-3" style={{ marginTop: "-15px" }}>
                <label className="form-label">Online Entry Options</label>
                {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map(option => (
                    <div key={option} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`option-${option}`}
                            checked={assignment.online_entry_option?.includes(option) || false}
                            onChange={() => {
                                setAssignment((prev) => ({
                                    ...prev,
                                    online_entry_option: prev.online_entry_option?.includes(option)
                                        ? prev.online_entry_option.filter(item => item !== option)
                                        : [...(prev.online_entry_option || []), option]
                                }));
                            }}
                        />
                        <label htmlFor={`option-${option}`} className="form-check-label">{option}</label>
                    </div>
                ))}
            </div>

            {/* Assign To */}
            <div className="row mb-3">
                <div className="col-md-3 d-flex justify-content-end">
                    <label className="form-label">Assign</label>
                </div>
                <div className="col-md-9">
                    <div className="border p-3">
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="form-label font-weight-bold">Assign to</label>
                            <div className="input-group">
                                <input
                                    id="wd-assign-to"
                                    value={selectedAssignTo}
                                    onChange={(e) => setSelectedAssignTo(e.target.value)}
                                    className="form-control"
                                />
                                <span className="input-group-text">
                                    <FaTimes />
                                </span>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="row mb-3">
                            <div className="col-md-3 d-flex justify-content-end">
                                <label htmlFor="wd-due-date" className="form-label font-weight-bold">Due</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <input
                                        id="wd-due-date"
                                        type="datetime-local"
                                        value={assignment.due}
                                        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
                                        className="form-control"
                                        required
                                    />
                                    <span className="input-group-text">
                                        <FaCalendarAlt />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Available From */}
                        <div className="row">
                            <div className="col-md-3 d-flex justify-content-end">
                                <label htmlFor="wd-available-from" className="form-label font-weight-bold">Available From</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <input
                                        id="wd-available-from"
                                        type="datetime-local"
                                        value={assignment.not_available_until}
                                        onChange={(e) => setAssignment({ ...assignment, not_available_until: e.target.value })}
                                        className="form-control"
                                        required
                                    />
                                    <span className="input-group-text">
                                        <FaCalendarAlt />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Available Until */}
                        <div className="row">
                            <div className="col-md-3 d-flex justify-content-end">
                                <label htmlFor="wd-available-until" className="form-label font-weight-bold">Available Until</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <input
                                        id="wd-available-until"
                                        type="datetime-local"
                                        value={assignment.available_until}
                                        onChange={(e) => setAssignment({ ...assignment, available_until: e.target.value })}
                                        className="form-control"
                                        required
                                    />
                                    <span className="input-group-text">
                                        <FaCalendarAlt />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <hr />
            <div className="text-end">
                <button onClick={handleCancel} className="btn btn-secondary me-2">
                    Cancel
                </button>
                <button onClick={handleSave} className="btn btn-danger">
                    Save
                </button>
            </div>
        </div>
    );
}