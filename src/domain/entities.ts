export type Shift = 'Matutino' | 'Vespertino' | 'Noturno';

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  shift: Shift;
  year: number;
}

export interface School {
  id: string;
  name: string;
  address: string;
}