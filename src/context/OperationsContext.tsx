import { useState, createContext, useContext, ReactNode } from 'react';
interface Student {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  registeredDate: string;
  studentId: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  recentActivity: {
    courseName: string;
    progress: number;
    status: 'Completed' | 'In Progress' | 'Not Started';
  }[];
}
interface Lecturer {
  id: string;
  name: string;
  email: string;
  registeredDate: string;
  totalCourses: number;
  status: 'Active' | 'Inactive';
}
interface OperationsContextType {
  students: Student[];
  lecturers: Lecturer[];
  getStudentById: (id: string) => Student | undefined;
}
const OperationsContext = createContext<OperationsContextType | undefined>(undefined);
const initialStudents: Student[] = [{
  id: '1',
  name: 'Saduni Perera',
  email: 'saduniperera@gmail.com',
  status: 'Active',
  registeredDate: 'Nov 25, 2025',
  studentId: '******',
  dateOfBirth: 'January 12 2000',
  address: '392/G, Kandy Road, Colombo',
  phone: '*** **** 123',
  coursesEnrolled: 8,
  coursesCompleted: 12,
  recentActivity: [{
    courseName: 'Certificate in IT',
    progress: 100,
    status: 'Completed'
  }, {
    courseName: 'Diploma in IT',
    progress: 95,
    status: 'In Progress'
  }, {
    courseName: 'HND in IT',
    progress: 0,
    status: 'Not Started'
  }]
}, {
  id: '2',
  name: 'Sachini Fernando',
  email: 'sachini@gmail.com',
  status: 'Active',
  registeredDate: 'Nov 22, 2025',
  studentId: '******',
  dateOfBirth: 'March 15 1999',
  address: '123 Main Street, Colombo',
  phone: '*** **** 456',
  coursesEnrolled: 5,
  coursesCompleted: 8,
  recentActivity: [{
    courseName: 'Certificate in IT',
    progress: 100,
    status: 'Completed'
  }, {
    courseName: 'Diploma in IT',
    progress: 75,
    status: 'In Progress'
  }]
}, {
  id: '3',
  name: 'Tharindu Jayasooriya',
  email: 'tharindu@gmail.com',
  status: 'Inactive',
  registeredDate: 'Nov 19, 2025',
  studentId: '******',
  dateOfBirth: 'July 8 2001',
  address: '456 Park Avenue, Kandy',
  phone: '*** **** 789',
  coursesEnrolled: 3,
  coursesCompleted: 5,
  recentActivity: [{
    courseName: 'Certificate in IT',
    progress: 100,
    status: 'Completed'
  }]
}];
const initialLecturers: Lecturer[] = [{
  id: '1',
  name: 'Malsha Karunaratne',
  email: 'malsha@gmail.com',
  registeredDate: 'Nov 25, 2025',
  totalCourses: 12,
  status: 'Active'
}, {
  id: '2',
  name: 'Dilan Madushanka',
  email: 'dilan@gmail.com',
  registeredDate: 'Nov 22, 2025',
  totalCourses: 8,
  status: 'Active'
}, {
  id: '3',
  name: 'Ishara Jayasinghe',
  email: 'ishara@gmail.com',
  registeredDate: 'Nov 19, 2025',
  totalCourses: 5,
  status: 'Inactive'
}];
export function OperationsProvider({
  children
}: {
  children: ReactNode;
}) {
  const [students] = useState<Student[]>(initialStudents);
  const [lecturers] = useState<Lecturer[]>(initialLecturers);
  const getStudentById = (id: string) => {
    return students.find(student => student.id === id);
  };
  return <OperationsContext.Provider value={{
    students,
    lecturers,
    getStudentById
  }}>
      {children}
    </OperationsContext.Provider>;
}
export function useOperations() {
  const context = useContext(OperationsContext);
  if (context === undefined) {
    throw new Error('useOperations must be used within an OperationsProvider');
  }
  return context;
}