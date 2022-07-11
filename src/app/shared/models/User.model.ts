import { Absence } from './Absence.model';
import { CourseInStudent } from './CourseInStudent.model';
import { StudentInCourse } from './StudentInCourse.model';

export interface User extends StudentInCourse {
  email: string;
  courses: CourseInStudent[];
  absences: Absence[];
}
