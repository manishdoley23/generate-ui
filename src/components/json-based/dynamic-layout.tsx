import { useMemo } from "react";
import { LayoutConfig } from "./types";
import { cn } from "@/utils/util";

interface DynamicLayoutProps {
  config: LayoutConfig;
  children: React.ReactNode;
  className?: string;
}

const getGridStyles = (config: LayoutConfig) => {
  const cols =
    typeof config.cols === "number"
      ? `grid-template-columns: repeat(${config.cols}, minmax(0, 1fr));`
      : config.cols
      ? `
        grid-template-columns: repeat(${config.cols.sm || 1}, minmax(0, 1fr));
        @media (min-width: 768px) {
          grid-template-columns: repeat(${
            config.cols.md || config.cols.sm || 1
          }, minmax(0, 1fr));
        }
        @media (min-width: 1024px) {
          grid-template-columns: repeat(${
            config.cols.lg || config.cols.md || config.cols.sm || 1
          }, minmax(0, 1fr));
        }
      `
      : "";

  return `
    display: grid;
    ${cols}
    gap: ${config.gap || "1rem"};
    align-items: ${config.align || "start"};
    justify-content: ${config.justify || "start"};
  `;
};

const getFlexStyles = (config: LayoutConfig) => `
  display: flex;
  flex-direction: ${config.direction || "row"};
  gap: ${config.gap || "1rem"};
  align-items: ${config.align || "start"};
  justify-content: ${config.justify || "start"};
  flex-wrap: ${config.wrap ? "wrap" : "nowrap"};
`;

function cssStringToObject(cssString: string): Record<string, string> {
  return cssString
    .split(";")
    .filter(Boolean)
    .reduce((acc, declaration) => {
      const [property, value] = declaration.split(":").map((str) => str.trim());
      if (property && value) {
        // Convert kebab-case to camelCase
        const camelProperty = property.replace(/-([a-z])/g, (g) =>
          g[1].toUpperCase()
        );
        acc[camelProperty] = value;
      }
      return acc;
    }, {} as Record<string, string>);
}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  config,
  children,
  className,
}) => {
  const layoutStyles = useMemo(() => {
    switch (config.type) {
      case "grid":
        return getGridStyles(config);
      case "flex":
        return getFlexStyles(config);
      case "stack":
        return getFlexStyles({ ...config, type: "flex", direction: "column" });
      default:
        return "";
    }
  }, [config]);

  return (
    <div
      className={cn("dynamic-layout", className)}
      style={cssStringToObject(layoutStyles)}
    >
      {children}
    </div>
  );
};
