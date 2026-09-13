import type { GrupoHabilidades } from "./tipos";

export const habilidades: GrupoHabilidades[] = [
  { categoria: "Lenguajes", items: ["C#", "Java", "TypeScript", "JavaScript", "SQL", "PHP"] },
  {
    categoria: "Frameworks & Web",
    items: [".NET", ".NET Framework", "Spring Boot", "Node.js", "Express", "Angular", "React Native", "Expo", "Electron", "HTML5 / CSS3"],
  },
  {
    categoria: "Bases de Datos",
    items: ["Microsoft SQL Server", "MySQL", "MongoDB", "Firebase (Firestore)", "Redis", "PL/SQL"],
  },
  {
    categoria: "Herramientas",
    items: ["Git", "Azure DevOps", "TFS", "REST APIs", "Linux (VPS)", "FTP/SFTP"],
  },
  {
    categoria: "IA & Productividad",
    items: ["Cursor", "Claude Code", "GitHub Copilot"],
  },
];
