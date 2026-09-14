import {
  Database,
  Code2,
  Cloud,
  GitBranch,
  Network,
  Server,
  LineChart,
  Mail,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { iconoDe } from "@/lib/iconos";

type ComponenteIcono = (props: {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
}) => React.ReactNode;

/**
 * Glifos por categoria para lo que no tiene marca propia.
 *
 * No se dibujan logos de marca a mano: C#, Java y Microsoft SQL Server
 * fueron removidos de simple-icons por marca registrada, y aproximarlos de
 * memoria daria un logo deforme y falso. El resto (SQL, PL/SQL, REST APIs,
 * FTP, TFS, bcrypt) directamente no son marcas.
 */
const GENERICOS: Record<string, ComponenteIcono> = {
  SQL: Database,
  "PL/SQL": Database,
  MSSQL: Database,
  "Microsoft SQL Server": Database,
  "C#": Code2,
  Java: Code2,
  "Azure DevOps": Cloud,
  TFS: GitBranch,
  "REST APIs": Network,
  FTP: Server,
  "FTP/SFTP": Server,
  Recharts: LineChart,
  Nodemailer: Mail,
  SheetJS: FileSpreadsheet,
  bcrypt: Lock,
  NextAuth: ShieldCheck,
};

/**
 * Resuelve el icono de una tecnologia en dos niveles: primero la marca real
 * precomputada por scripts/generar-iconos.mjs, y si no existe, el glifo
 * generico de la categoria.
 */
export default function IconoTecnologia({
  nombre,
  size = 13,
}: {
  nombre: string;
  size?: number;
}) {
  const marca = iconoDe(nombre);

  if (marca) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
        style={{ color: marca.color }}
        className="shrink-0"
      >
        <path d={marca.path} />
      </svg>
    );
  }

  const Generico = GENERICOS[nombre];
  if (!Generico) return null;

  // Sin color propio: hereda el del tag. Pintarlo simularia un color de
  // marca para algo que no tiene marca.
  return <Generico size={size} aria-hidden className="shrink-0" />;
}
