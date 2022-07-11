import { Class } from './Class.model';
import { CourseInStudent } from './CourseInStudent.model';
import { StudentInCourse } from './StudentInCourse.model';

export interface Course extends CourseInStudent {
  students: StudentInCourse[];
  classes: Class[];
}
