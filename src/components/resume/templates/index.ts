import { ResumeData } from "../ResumeBuilder";

export interface TemplateProps {
  data: ResumeData;
}

export type TemplateType =
  | "modern"
  | "classic"
  | "minimal"
  | "professional"
  | "creative"
  | "elegant"
  | "corporate"
  | "simple";

export type ColorScheme =
  | "blue"
  | "green"
  | "purple"
  | "red"
  | "orange"
  | "teal"
  | "gray"
  | "pink";

export const templateNames: Record<TemplateType, string> = {
  modern: "Moderno",
  classic: "Clássico",
  minimal: "Minimalista",
  professional: "Profissional",
  creative: "Criativo",
  elegant: "Elegante",
  corporate: "Corporativo",
  simple: "Simples",
};

export const colorSchemeNames: Record<ColorScheme, string> = {
  blue: "Azul",
  green: "Verde",
  purple: "Roxo",
  red: "Vermelho",
  orange: "Laranja",
  teal: "Turquesa",
  gray: "Cinza",
  pink: "Rosa",
};

export const colorSchemeValues: Record<
  ColorScheme,
  {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  }
> = {
  blue: {
    primary: "#1e40af",
    secondary: "#3b82f6",
    accent: "#93c5fd",
    text: "#1e293b",
    background: "#f8fafc",
  },
  green: {
    primary: "#15803d",
    secondary: "#22c55e",
    accent: "#86efac",
    text: "#1e293b",
    background: "#f8fafc",
  },
  purple: {
    primary: "#7e22ce",
    secondary: "#a855f7",
    accent: "#d8b4fe",
    text: "#1e293b",
    background: "#f8fafc",
  },
  red: {
    primary: "#b91c1c",
    secondary: "#ef4444",
    accent: "#fca5a5",
    text: "#1e293b",
    background: "#f8fafc",
  },
  orange: {
    primary: "#c2410c",
    secondary: "#f97316",
    accent: "#fdba74",
    text: "#1e293b",
    background: "#f8fafc",
  },
  teal: {
    primary: "#0f766e",
    secondary: "#14b8a6",
    accent: "#5eead4",
    text: "#1e293b",
    background: "#f8fafc",
  },
  gray: {
    primary: "#475569",
    secondary: "#94a3b8",
    accent: "#cbd5e1",
    text: "#1e293b",
    background: "#f8fafc",
  },
  pink: {
    primary: "#be185d",
    secondary: "#ec4899",
    accent: "#f9a8d4",
    text: "#1e293b",
    background: "#f8fafc",
  },
};
