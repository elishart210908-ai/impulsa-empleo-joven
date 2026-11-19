export type OpportunityType = 'empleo' | 'practicas' | 'beca' | 'taller';

export type ModalityType = 'remoto' | 'hibrido' | 'presencial';

export type FieldType = 
  | 'Tecnología' 
  | 'Marketing' 
  | 'Finanzas' 
  | 'Diseño' 
  | 'Ingeniería' 
  | 'Educación' 
  | 'Salud' 
  | 'Administración';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  type: OpportunityType;
  modality: ModalityType;
  field: FieldType;
  location: string;
  stipendOrSalary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  featured?: boolean;
  applicantsCount?: number;
  lat?: number;
  lng?: number;
  matchReason?: string;
}

export type ApplicationStatus = 'Guardada' | 'Enviada' | 'En Revisión' | 'Entrevista Programada' | 'Oferta Recibida' | 'Descartada';

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  type: OpportunityType;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
}

export interface CareerEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  type: 'Feria Virtual' | 'Webinar' | 'Taller Práctico';
  description: string;
  speaker: string;
  registered: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'estudiante' | 'empresa';
  career: string;
  university: string;
  skills: string[];
  bio: string;
  cvText?: string;
}
