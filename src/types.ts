export interface Project {
  id: string;
  title: string;
  client: string;
  duration: string;
  location: string;
  category: "all" | "digital" | "energy" | "lean" | "critical" | "ia" | string;
  image: string;
  summary: string;
  presentation: string;
  methodology: string[];
  results: {
    kpis: string[];
    details: string[];
  };
}

export interface Experience {
  period: string;
  title: string;
  organization: string;
  location: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Certification {
  year: string;
  title: string;
  organization: string;
  description: string;
}
