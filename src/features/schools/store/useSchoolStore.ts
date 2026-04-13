import { create } from 'zustand';

export interface School { id: string; name: string; address: string; }
export interface SchoolClass { id: string; schoolId: string; name: string; shift: string; year: number; }

interface SchoolState {
  schools: School[];
  classes: SchoolClass[];
  addSchool: (school: School) => void;
  updateSchool: (id: string, updated: Partial<School>) => void;
  deleteSchool: (id: string) => void;
  addClass: (newClass: SchoolClass) => void;
  deleteClass: (id: string) => void;
}

export const useSchoolStore = create<SchoolState>((set) => ({
  // Arrays limpos para produção
  schools: [],
  classes: [],

  addSchool: (school) => set((state) => ({ 
    schools: [...state.schools, school] 
  })),
  
  updateSchool: (id, updated) => set((state) => ({
    schools: state.schools.map((s) => s.id === id ? { ...s, ...updated } : s)
  })),
  
  deleteSchool: (id) => set((state) => ({
    schools: state.schools.filter((s) => s.id !== id),
    classes: state.classes.filter((c) => c.schoolId !== id)
  })),
  
  addClass: (newClass) => set((state) => ({ 
    classes: [...state.classes, newClass] 
  })),
  
  deleteClass: (id) => set((state) => ({ 
    classes: state.classes.filter((c) => c.id !== id) 
  })),
}));