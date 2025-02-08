import { FieldIntent } from "./types";

export interface ThemeConfig {
  industry: string;
  size: "compact" | "regular" | "spacious";
  layout: "stack" | "grid" | "inline";
  mode: "light" | "dark";
}

interface ColorPalette {
  [key: string]: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    border: string;
    background: string;
  };
}

interface SizeConfig {
  container: string;
  input: string;
  button: string;
  label: string;
}

interface LayoutConfig {
  container: string;
  fieldGroup: string;
  spacing: string;
}

// Industry-specific color schemes
const colorSchemes: Record<string, ColorPalette> = {
  automotive: {
    light: {
      primary: "bg-red-600 hover:bg-red-700",
      secondary: "bg-slate-100",
      accent: "bg-yellow-500",
      text: "text-slate-800",
      border: "border-red-200",
      background: "bg-white",
    },
    dark: {
      primary: "bg-red-700 hover:bg-red-800",
      secondary: "bg-slate-800",
      accent: "bg-yellow-600",
      text: "text-white",
      border: "border-red-700",
      background: "bg-slate-900",
    },
  },
  marine: {
    light: {
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "bg-sky-100",
      accent: "bg-teal-500",
      text: "text-slate-800",
      border: "border-blue-200",
      background: "bg-white",
    },
    dark: {
      primary: "bg-blue-700 hover:bg-blue-800",
      secondary: "bg-sky-900",
      accent: "bg-teal-600",
      text: "text-white",
      border: "border-blue-700",
      background: "bg-slate-900",
    },
  },
  realestate: {
    light: {
      primary: "bg-emerald-600 hover:bg-emerald-700",
      secondary: "bg-stone-100",
      accent: "bg-amber-500",
      text: "text-stone-800",
      border: "border-emerald-200",
      background: "bg-white",
    },
    dark: {
      primary: "bg-emerald-700 hover:bg-emerald-800",
      secondary: "bg-stone-800",
      accent: "bg-amber-600",
      text: "text-white",
      border: "border-emerald-700",
      background: "bg-stone-900",
    },
  },
  tech: {
    light: {
      primary: "bg-violet-600 hover:bg-violet-700",
      secondary: "bg-slate-100",
      accent: "bg-cyan-500",
      text: "text-slate-800",
      border: "border-violet-200",
      background: "bg-white",
    },
    dark: {
      primary: "bg-violet-700 hover:bg-violet-800",
      secondary: "bg-slate-800",
      accent: "bg-cyan-600",
      text: "text-white",
      border: "border-violet-700",
      background: "bg-slate-900",
    },
  },
};

// Component size variations
const sizes: Record<string, SizeConfig> = {
  compact: {
    container: "max-w-md",
    input: "h-8 text-sm",
    button: "h-8 px-4 text-sm",
    label: "text-sm",
  },
  regular: {
    container: "max-w-xl",
    input: "h-10",
    button: "h-10 px-6",
    label: "text-base",
  },
  spacious: {
    container: "max-w-2xl",
    input: "h-12 text-lg",
    button: "h-12 px-8 text-lg",
    label: "text-lg",
  },
};

// Layout variations
const layouts: Record<string, LayoutConfig> = {
  stack: {
    container: "flex flex-col",
    fieldGroup: "w-full",
    spacing: "gap-6",
  },
  grid: {
    container: "grid grid-cols-2",
    fieldGroup: "col-span-1",
    spacing: "gap-4",
  },
  inline: {
    container: "flex flex-row items-end",
    fieldGroup: "flex-1",
    spacing: "gap-4",
  },
};

// Field-specific styling based on intent
const fieldStyles: Record<FieldIntent, (theme: ThemeConfig) => string> = {
  name_input: (theme) => `
    ${sizes[theme.size].input}
    ${colorSchemes[theme.industry][theme.mode].border}
    ${colorSchemes[theme.industry][theme.mode].text}
    focus:ring-2
    focus:ring-${colorSchemes[theme.industry][theme.mode].accent}
  `,
  description_input: (theme) => `
    ${sizes[theme.size].input}
    min-h-[100px]
    ${colorSchemes[theme.industry][theme.mode].border}
    ${colorSchemes[theme.industry][theme.mode].text}
  `,
  category_selection: (theme) => `
    ${sizes[theme.size].input}
    ${colorSchemes[theme.industry][theme.mode].border}
    ${colorSchemes[theme.industry][theme.mode].text}
  `,
  content_editor: (theme) => `
    min-h-[200px]
    ${colorSchemes[theme.industry][theme.mode].border}
    ${colorSchemes[theme.industry][theme.mode].text}
  `,
  date_picker: (theme) => `
    ${sizes[theme.size].input}
    ${colorSchemes[theme.industry][theme.mode].border}
    ${colorSchemes[theme.industry][theme.mode].text}
  `,
};

export const getThemeClasses = (
  intent: FieldIntent,
  theme: ThemeConfig,
  baseClasses: string = ""
) => {
  const fieldStyle = fieldStyles[intent](theme);
  const layoutStyle = layouts[theme.layout];

  return `${baseClasses} ${fieldStyle} ${layoutStyle.spacing}`.trim();
};

export const getContainerClasses = (theme: ThemeConfig) => {
  const size = sizes[theme.size];
  const layout = layouts[theme.layout];
  const colors = colorSchemes[theme.industry][theme.mode];

  return `${size.container} ${layout.container} ${colors.background} p-6 rounded-xl`;
};

// Random theme generator
export const generateRandomTheme = (): ThemeConfig => {
  const industries = Object.keys(colorSchemes);
  const sizeOptions = Object.keys(sizes);
  const layoutOptions = Object.keys(layouts);
  const modes = ["light", "dark"];

  return {
    industry: industries[Math.floor(Math.random() * industries.length)],
    size: sizeOptions[
      Math.floor(Math.random() * sizeOptions.length)
    ] as ThemeConfig["size"],
    layout: layoutOptions[
      Math.floor(Math.random() * layoutOptions.length)
    ] as ThemeConfig["layout"],
    mode: modes[
      Math.floor(Math.random() * modes.length)
    ] as ThemeConfig["mode"],
  };
};
