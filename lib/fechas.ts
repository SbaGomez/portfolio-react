export function calcularEdad(fechaNacimiento: string, hoy: Date = new Date()): number {
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export function aniosDesde(fechaInicio: string, hoy: Date = new Date()): number {
  return Math.max(0, calcularEdad(fechaInicio, hoy));
}
