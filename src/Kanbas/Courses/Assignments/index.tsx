// src/Kanbas/Courses/Assignments/index.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Updated import path
import { BsGripVertical } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import AssignmentControl from "./AssignmentControl";
import AssignmentControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";

import { Assignment } from "./types";
import { GoTriangleDown } from "react-icons/go";
import {
    deleteAssignment as deleteAssignmentRedux,
    setAssignments,
} from "./reducer";
import { deleteAssignment, fetchAssignmentsForCourse } from "./client";


interface AppState {
    assignmentsReducer: { assignments: Assignment[] };
    accountReducer: { currentUser: { role: string } | null };
}

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadAssignments = async () => {
            if (!cid) return;
            const fetchedAssignments = await fetchAssignmentsForCourse(cid);
            dispatch(setAssignments(fetchedAssignments));
        };
        loadAssignments();
    }, [cid, dispatch]);

    const assignments = useSelector((state: AppState) =>
        state.assignmentsReducer?.assignments.filter((assignment) => assignment.course === cid) || []
    );

    console.log("Filtered Assignments:", assignments); // Debugging line

    const currentUser = useSelector((state: AppState) => state.accountReducer.currentUser);

    

    const handleDelete = async (id: string) => {
        try {
            await deleteAssignment(id);
            dispatch(deleteAssignmentRedux(id));
        } catch (error) {
            console.error("Error deleting assignment:", error);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/Kanbas/Courses/${cid}/Assignments/${id}`);
    };

    const handleCreate = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
    };

    return (
        <div>
            {/* Show AssignmentControl only if the user is a faculty */}
            <AssignmentControl onAddAssignment={handleCreate} />

            <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex align-items-center" style={{ color: 'black', border: '1px solid black' }}>
                <BsGripVertical className="me-2 fs-3" /><GoTriangleDown />
                <strong>ASSIGNMENTS</strong>
            </div>

            <ul id="wd-assignments-list" className="list-group rounded-0">
                {assignments.map((assignment: Assignment) => (
                    <li
                        key={assignment._id}
                        className="wd-assignment-list-item list-group-item d-flex align-items-center p-3"
                        style={{ border: '1px solid black', color: 'black', cursor: 'default' }}
                    >
                        <BsGripVertical className="text-muted me-2 fs-5" />
                        <FaBook style={{ color: 'green', marginRight: 10 }} />
                        <div className="flex-grow-1">
                            <strong>{assignment.title}</strong>
                            <div className="small text-muted">
                                <span style={{ color: 'red' }}>Multiple Modules</span> | <strong>Not available until:</strong> {assignment.not_available_until || "N/A"}
                            </div>
                            <div className="small text-muted">
                                <strong>Due:</strong> {assignment.due || "N/A"} | {assignment.points || 0} pts
                            </div>
                        </div>

                        {/* Show AssignmentControlButtons only if the user is a faculty */}
                        {currentUser?.role === "FACULTY" && (
                            <div className="d-flex">
                                <AssignmentControlButtons
                                    assignmentId={assignment._id}
                                    deleteAssignment={handleDelete}
                                    editAssignment={handleEdit}
                                />
                            </div>
                        )}
                        <LessonControlButtons />
                    </li>
                ))}
            </ul>
        </div>
    );
}