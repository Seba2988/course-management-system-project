export interface CourseInStudent {
  id: number;
  name: string;
  professorId: string;
  startingDate: Date;
  endingDate: Date;
}

export interface Class {
  id: number;
  date: Date;
}

export interface Absence {
  id: number;
  studentId: string;
  class: Class;
  isPresent: boolean;
  reasonOfAbsence: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address: string;
  courses: CourseInStudent[];
  absences: Absence[];
}

export interface StudentInCourse {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date;
}

export interface Course extends CourseInStudent {
  students: StudentInCourse[];
  classes: Class[];
}

export interface EditAbsence {
  isPresent: boolean;
  reasonOfAbsence?: string;
}
