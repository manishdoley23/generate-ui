import { type ClassValue } from "clsx";

export type ComponentType =
  | "form"
  | "input"
  | "select"
  | "textarea"
  | "button"
  | "dialog"
  | "card"
  | "grid"
  | "flex"
  | "custom";

export type LayoutType = "grid" | "flex" | "stack";

export interface LayoutConfig {
  type: LayoutType;
  cols?: number | { sm?: number; md?: number; lg?: number };
  rows?: number;
  gap?: number | string;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  direction?: "row" | "column";
  responsive?: {
    sm?: Partial<Omit<LayoutConfig, "responsive">>;
    md?: Partial<Omit<LayoutConfig, "responsive">>;
    lg?: Partial<Omit<LayoutConfig, "responsive">>;
  };
}

export interface ValidationRule {
  type: "required" | "pattern" | "minLength" | "maxLength" | "custom";
  value?: any;
  message: string;
  validate?: (value: any) => boolean | Promise<boolean>;
}

export interface ComponentData {
  componentType: ComponentType;
  id?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: ClassValue;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "number" | "date" | "email" | "password" | "tel"; // Add this
  options?: Array<{ label: string; value: string }>;
  children?: ComponentData[];
  layout?: LayoutConfig;
  validation?: ValidationRule[];
  theme?: {
    variant?: string;
    color?: string;
    size?: "sm" | "md" | "lg";
    customStyles?: Record<string, string>;
  };
  customProps?: Record<string, any>;
  events?: {
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
    onFocus?: (value: any) => void;
    onClick?: (event: any) => void;
  };
}
