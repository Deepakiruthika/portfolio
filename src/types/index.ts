export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  hardwareComponents: string[];
  status: string;
  hasSimulator: boolean;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  color: string;
  skills: {
    name: string;
    level: string;
    icon: string;
    description: string;
    tag?: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  status: 'Current' | 'Completed';
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  responsibilities: string[];
  skills: string[];
  badge: string;
}
