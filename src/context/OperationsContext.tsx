import React, { useEffect, useState, createContext, useContext } from 'react';
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
  photo?: string;
}
interface Lecturer {
  id: string;
  name: string;
  email: string;
  registeredDate: string;
  totalCourses: number;
  status: 'Active' | 'Inactive';
  phone?: string;
  title?: string;
  photo?: string;
}
interface Course {
  id: string;
  title: string;
  level: string;
  lecturer: string;
  lecturerId: string;
  status: 'Active' | 'pending' | 'Rejected';
  description?: string;
  price?: string;
}
interface Transaction {
  id: string;
  name: string;
  userId: string;
  course: string;
  courseId: string;
  amount: string;
  date: string;
  status: 'Complete' | 'Failed';
  type: 'student' | 'lecturer';
}
interface Announcement {
  id: string;
  title: string;
  audience: string;
  status: 'Active' | 'Scheduled' | 'Draft';
  date: string;
  description: string;
  scheduleDate?: string;
}
interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}
interface PlatformSettings {
  platformName: string;
  contactEmail: string;
  supportUrl: string;
  logoUrl: string;
}
interface OperationsContextType {
  students: Student[];
  lecturers: Lecturer[];
  courses: Course[];
  transactions: Transaction[];
  announcements: Announcement[];
  notifications: Notification[];
  platformSettings: PlatformSettings;
  getStudentById: (id: string) => Student | undefined;
  getLecturerById: (id: string) => Lecturer | undefined;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addLecturer: (lecturer: Omit<Lecturer, 'id'>) => void;
  updateLecturer: (id: string, lecturer: Partial<Lecturer>) => void;
  deleteLecturer: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  updatePlatformSettings: (settings: Partial<PlatformSettings>) => void;
}
const OperationsContext = createContext<OperationsContextType | undefined>(undefined);
const initialStudents: Student[] = [{
  id: '1',
  name: 'Saduni Perera',
  email: 'saduniperera@gmail.com',
  status: 'Active',
  registeredDate: 'Nov 25, 2025',
  studentId: 'STU001',
  dateOfBirth: 'January 12 2000',
  address: '392/G, Kandy Road, Colombo',
  phone: '077 456 1234',
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
  }],
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
}, {
  id: '2',
  name: 'Sachini Fernando',
  email: 'sachini@gmail.com',
  status: 'Active',
  registeredDate: 'Nov 22, 2025',
  studentId: 'STU002',
  dateOfBirth: 'March 15 1999',
  address: '123 Main Street, Colombo',
  phone: '077 456 7890',
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
  }],
  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
}, {
  id: '3',
  name: 'Tharindu Jayasooriya',
  email: 'tharindu@gmail.com',
  status: 'Inactive',
  registeredDate: 'Nov 19, 2025',
  studentId: 'STU003',
  dateOfBirth: 'July 8 2001',
  address: '456 Park Avenue, Kandy',
  phone: '077 789 1234',
  coursesEnrolled: 3,
  coursesCompleted: 5,
  recentActivity: [{
    courseName: 'Certificate in IT',
    progress: 100,
    status: 'Completed'
  }],
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
}];
const initialLecturers: Lecturer[] = [{
  id: '1',
  name: 'Dr. Malsha Karunaratne',
  email: 'malsha@gmail.com',
  registeredDate: 'Nov 25, 2025',
  totalCourses: 12,
  status: 'Active',
  phone: '077 123 4567',
  title: 'Senior Lecturer in Biomedical Science',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
}, {
  id: '2',
  name: 'Mr. Dilan Madushanka',
  email: 'dilan@gmail.com',
  registeredDate: 'Nov 22, 2025',
  totalCourses: 8,
  status: 'Active',
  phone: '077 234 5678',
  title: 'Lecturer in Web Development',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
}, {
  id: '3',
  name: 'Ms. Ishara Jayasinghe',
  email: 'ishara@gmail.com',
  registeredDate: 'Nov 19, 2025',
  totalCourses: 5,
  status: 'Inactive',
  phone: '077 345 6789',
  title: 'Lecturer in Management',
  photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
}];
const initialCourses: Course[] = [{
  id: '1',
  title: 'Biomedical Science',
  level: 'Certificate',
  lecturer: 'Dr. Malsha Karunaratne',
  lecturerId: '1',
  status: 'Active',
  description: 'Introduction to biomedical science fundamentals',
  price: '15000'
}, {
  id: '2',
  title: 'Web Development Fundamentals',
  level: 'Diploma',
  lecturer: 'Mr. Dilan Madushanka',
  lecturerId: '2',
  status: 'pending',
  description: 'Learn the basics of web development',
  price: '25000'
}, {
  id: '3',
  title: 'Human Resource Management',
  level: 'HND',
  lecturer: 'Ms. Ishara Jayasinghe',
  lecturerId: '3',
  status: 'Rejected',
  description: 'Comprehensive HR management course',
  price: '35000'
}];
const initialTransactions: Transaction[] = [{
  id: '1',
  name: 'Nimal Perera',
  userId: '1',
  course: 'Diploma in IT',
  courseId: '1',
  amount: '$134',
  date: 'Nov 25, 2025',
  status: 'Complete',
  type: 'student'
}, {
  id: '2',
  name: 'Sachini Fernando',
  userId: '2',
  course: 'Diploma in Law',
  courseId: '2',
  amount: '$138',
  date: 'Nov 22, 2025',
  status: 'Complete',
  type: 'student'
}, {
  id: '3',
  name: 'Tharindu Jayasooriya',
  userId: '3',
  course: 'HND in IT',
  courseId: '3',
  amount: '$1562',
  date: 'Nov 19, 2025',
  status: 'Failed',
  type: 'student'
}];
const initialAnnouncements: Announcement[] = [{
  id: '1',
  title: 'System Maintenance Notice',
  audience: 'All Users',
  status: 'Active',
  date: 'Nov 25, 2025',
  description: 'The system will undergo maintenance on Sunday from 2 AM to 6 AM.'
}, {
  id: '2',
  title: 'New Courses Available!',
  audience: 'Student',
  status: 'Scheduled',
  date: 'Nov 22, 2025',
  description: 'Exciting new courses in Data Science and AI are now available for enrollment.',
  scheduleDate: '2025-12-01'
}, {
  id: '3',
  title: 'Update Course Content Reminder',
  audience: 'Lecturer',
  status: 'Draft',
  date: '',
  description: 'Please ensure all course materials are updated before the new semester begins.'
}];
const initialNotifications: Notification[] = [{
  id: '1',
  title: 'New Student Registered',
  description: 'A new student, Isuri Perera, has registered for the platform.',
  timestamp: '2 hours ago',
  read: false
}, {
  id: '2',
  title: 'New Lecturer Joined',
  description: 'Dr. Kusal Fernando has been added as a lecturer in the Management Department.',
  timestamp: '5 hours ago',
  read: false
}, {
  id: '3',
  title: 'Payment Received',
  description: "Payment of $120 received from student Tharindu Silva for 'Diploma in IT'.",
  timestamp: '1 day ago',
  read: false
}];
export function OperationsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('ops-students');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  const [lecturers, setLecturers] = useState<Lecturer[]>(() => {
    const saved = localStorage.getItem('ops-lecturers');
    return saved ? JSON.parse(saved) : initialLecturers;
  });
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ops-courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ops-transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('ops-announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('ops-notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('ops-platform-settings');
    return saved ? JSON.parse(saved) : {
      platformName: 'H & R Skills Pvt Ltd',
      contactEmail: 'admin@gmail.com',
      supportUrl: 'https://h&rskills.com/help',
      logoUrl: '/image.png'
    };
  });
  useEffect(() => {
    localStorage.setItem('ops-students', JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem('ops-lecturers', JSON.stringify(lecturers));
  }, [lecturers]);
  useEffect(() => {
    localStorage.setItem('ops-courses', JSON.stringify(courses));
  }, [courses]);
  useEffect(() => {
    localStorage.setItem('ops-transactions', JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem('ops-announcements', JSON.stringify(announcements));
  }, [announcements]);
  useEffect(() => {
    localStorage.setItem('ops-notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('ops-platform-settings', JSON.stringify(platformSettings));
  }, [platformSettings]);
  const getStudentById = (id: string) => students.find(s => s.id === id);
  const getLecturerById = (id: string) => lecturers.find(l => l.id === id);
  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: Date.now().toString()
    };
    setStudents([...students, newStudent]);
    addNotification({
      title: 'New Student Registered',
      description: `${student.name} has registered for the platform.`
    });
  };
  const updateStudent = (id: string, updatedStudent: Partial<Student>) => {
    setStudents(students.map(s => s.id === id ? {
      ...s,
      ...updatedStudent
    } : s));
  };
  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };
  const addLecturer = (lecturer: Omit<Lecturer, 'id'>) => {
    const newLecturer = {
      ...lecturer,
      id: Date.now().toString()
    };
    setLecturers([...lecturers, newLecturer]);
    addNotification({
      title: 'New Lecturer Joined',
      description: `${lecturer.name} has been added to the platform.`
    });
  };
  const updateLecturer = (id: string, updatedLecturer: Partial<Lecturer>) => {
    setLecturers(lecturers.map(l => l.id === id ? {
      ...l,
      ...updatedLecturer
    } : l));
  };
  const deleteLecturer = (id: string) => {
    setLecturers(lecturers.filter(l => l.id !== id));
  };
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = {
      ...course,
      id: Date.now().toString()
    };
    setCourses([...courses, newCourse]);
  };
  const updateCourse = (id: string, updatedCourse: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? {
      ...c,
      ...updatedCourse
    } : c));
  };
  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions([...transactions, newTransaction]);
  };
  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now().toString()
    };
    setAnnouncements([...announcements, newAnnouncement]);
  };
  const updateAnnouncement = (id: string, updatedAnnouncement: Partial<Announcement>) => {
    setAnnouncements(announcements.map(a => a.id === id ? {
      ...a,
      ...updatedAnnouncement
    } : a));
  };
  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };
  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  const updatePlatformSettings = (settings: Partial<PlatformSettings>) => {
    setPlatformSettings({
      ...platformSettings,
      ...settings
    });
  };
  return <OperationsContext.Provider value={{
    students,
    lecturers,
    courses,
    transactions,
    announcements,
    notifications,
    platformSettings,
    getStudentById,
    getLecturerById,
    addStudent,
    updateStudent,
    deleteStudent,
    addLecturer,
    updateLecturer,
    deleteLecturer,
    addCourse,
    updateCourse,
    deleteCourse,
    addTransaction,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addNotification,
    markNotificationAsRead,
    deleteNotification,
    updatePlatformSettings
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