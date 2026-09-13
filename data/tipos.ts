export type RedSocial = {
  nombre: string;
  url: string;
  color: string;
};

export type Perfil = {
  nombre: string;
  nombreCompleto: string;
  titulo: string;
  fechaNacimiento: string;
  inicioProfesional: string;
  ubicacion: string;
  resumen: string;
  disponible: boolean;
};

export type Contacto = {
  email: string;
  telefono: string;
  telefonoConPais: string;
  ubicacion: string;
  copyright: string;
  redes: RedSocial[];
  medios: { icono: string; titulo: string; valor: string; link: string }[];
};

export type Experiencia = {
  puesto: string;
  empresa: string;
  desde: string;
  hasta: string | null;
  periodo: string;
  tareas: string[];
  stack: string[];
};

export type Educacion = {
  titulo: string;
  institucion: string;
  periodo: string;
};

export type GrupoHabilidades = {
  categoria: string;
  items: string[];
};

export type Tecnologia = {
  nombre: string;
  logo: string | null;
};

export type MetricasProyecto = {
  lineas: number;
  commits: number;
  periodo: string;
};

export type Proyecto = {
  slug: string;
  titulo: string;
  anio: string;
  resumen: string;
  descripcion: string[];
  stack: string[];
  metricas: MetricasProyecto;
  destacados: string[];
  links: { demo?: string; repo?: string };
  imagenes: string[];
  anonimo: boolean;
  destacado: boolean;
};
