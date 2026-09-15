// Dos colores por red, y no uno: `color` es el de marca tal cual, que sirve
// para un borde o un acento, y `colorClaro` es esa misma marca subida de
// luminosidad para que el icono se lea sobre el fondo oscuro del sitio. Con el
// hex original, LinkedIn (#0077B5) y GitHub (#6e5494) quedan casi invisibles.
export type RedSocial = {
  nombre: string;
  url: string;
  color: string;
  colorClaro: string;
};

export type Perfil = {
  nombre: string;
  inicioProfesional: string;
  resumen: string;
};

// Lo unico del sitio que afirma algo sobre la disponibilidad de una persona,
// asi que vive en los datos y no en el markup: corregirlo el dia que deje de
// ser cierto es editar una linea.
export type Disponibilidad = {
  estado: string;
  titular: string;
  detalle: string;
};

export type Contacto = {
  email: string;
  copyright: string;
  disponibilidad: Disponibilidad;
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
