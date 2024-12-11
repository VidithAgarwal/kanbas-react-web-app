// AssignmentControlButtons.tsx
import React from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

interface AssignmentControlButtonsProps {
  assignmentId: string;
  deleteAssignment: (id: string) => void;
  editAssignment: (id: string) => void;
}

const AssignmentControlButtons: React.FC<AssignmentControlButtonsProps> = ({
  assignmentId,
  deleteAssignment,
  editAssignment,
}) => (
  <div className="float-end d-flex align-items-center">
    <BsPencil
      className="fs-4 me-3 text-primary"
      onClick={(e) => {
        e.stopPropagation(); 
        editAssignment(assignmentId);
      }}
      style={{ cursor: "pointer" }}
      title="Edit Assignment"
    />

    <BsTrash
      className="fs-4 text-danger"
      onClick={(e) => {
        e.stopPropagation(); 
        if (window.confirm("Are you sure you want to delete this assignment?")) {
          deleteAssignment(assignmentId);
        }
      }}
      style={{ cursor: "pointer" }}
      title="Delete Assignment"
    />
  </div>
);

export default AssignmentControlButtons;