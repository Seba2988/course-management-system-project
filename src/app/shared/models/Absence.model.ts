import { Class } from './Class.model';

export interface Absence {
  id: number;
  studentId: string;
  class: Class;
  isPresent: boolean;
  reasonOfAbsence: string;
}
