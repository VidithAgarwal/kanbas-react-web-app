// src/Kanbas/Courses/Assignments/AssignmentControl.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button, FormControl } from 'react-bootstrap';

interface AssignmentControlProps {
    onAddAssignment: () => void;
}

const AssignmentControl: React.FC<AssignmentControlProps> = ({ onAddAssignment }) => {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Search Bar */}
            <div className="d-flex w-50">
                <div className="position-relative w-100">
                    <span className="position-absolute top-50 translate-middle-y ms-2" style={{ pointerEvents: 'none' }}>
                        <FaSearch />
                    </span>
                    <FormControl
                        type="text"
                        placeholder="Search..."
                        className="ps-5" 
                    />
                </div>
            </div>

            {/* Group and Assignment Buttons */}
            <div>
                <Button style={{ backgroundColor: 'lightgray', color: 'black' }} className="me-2">
                    <FaPlus /> Group
                </Button>
                
                {/* Show Add Assignment button only if the user is a faculty */}
                {currentUser?.role === "FACULTY" && (
                    <Button
                        style={{ backgroundColor: 'red', color: 'white' }}
                        onClick={onAddAssignment}
                    >
                        <FaPlus /> Assignment
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AssignmentControl;