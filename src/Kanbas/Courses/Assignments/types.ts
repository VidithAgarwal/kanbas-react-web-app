// src/Kanbas/Courses/Assignments/types.ts
export interface Assignment {
    _id: string;
    title: string;
    description: string;
    points: number;
    due: string; // ISO string for datetime-local input
    not_available_until: string; // ISO string
    available_until?: string; // Make optional
    course: string;
    assignment_group: string;
    display_grade_as: string;
    submission_type: string;
    online_entry_option: string[];
  }