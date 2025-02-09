import React from "react";
import { Button } from "@/components/ui/button";
import { IntentComponentProps, FieldIntent } from "./types";
import { capitalize, getActionLabel, resolveIntent } from "./helper";
import { cn } from "@/lib/utils";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { getContainerClasses, getThemeClasses } from "./theme";
import { fieldPatterns } from "./field-patterns";

// Theme Types
export type ThemeSize = "compact" | "regular" | "spacious";
export type ThemeLayout = "stack" | "grid" | "inline";
export type ThemeMode = "light" | "dark";
export type ThemeIndustry = "automotive" | "marine" | "tech" | "realestate";

export interface ThemeConfig {
  industry: ThemeIndustry;
  size: ThemeSize;
  layout: ThemeLayout;
  mode: ThemeMode;
}

// Context Types
interface BaseContextData {
  placeholder?: string;
}

interface TextContextData extends BaseContextData {
  type: "text" | "textarea";
  value?: string;
  onChange?: (value: string) => void;
}

interface SelectContextData extends BaseContextData {
  type: "select";
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}

interface EditorContextData extends BaseContextData {
  type: "editor";
  value?: SerializedEditorState<SerializedLexicalNode>;
  onChange?: (value: SerializedEditorState<SerializedLexicalNode>) => void;
}

interface DateContextData extends BaseContextData {
  type: "date";
  value?: string;
  onChange?: (value: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

type FieldContextData =
  | TextContextData
  | SelectContextData
  | EditorContextData
  | DateContextData;

interface ComponentContext {
  [key: string]: FieldContextData;
}

// Component Props Types
interface ThemedIntentComponentProps
  extends Omit<IntentComponentProps, "context"> {
  context: ComponentContext;
  theme?: ThemeConfig;
}

// Field Props Types
interface BaseFieldProps {
  label: string;
  required?: boolean;
  className?: string;
  theme?: ThemeMode;
}

interface TextFieldProps extends BaseFieldProps {
  type: "text" | "textarea";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select";
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

interface EditorFieldProps extends BaseFieldProps {
  type: "editor";
  value?: SerializedEditorState<SerializedLexicalNode>;
  onChange?: (value: SerializedEditorState<SerializedLexicalNode>) => void;
}

interface DateFieldProps extends BaseFieldProps {
  type: "date";
  value?: string;
  onChange?: (value: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

type FieldProps =
  | TextFieldProps
  | SelectFieldProps
  | EditorFieldProps
  | DateFieldProps;

export const ThemedIntentComponent: React.FC<ThemedIntentComponentProps> = ({
  intent,
  context,
  onSubmit,
  theme = {
    industry: "tech",
    size: "regular",
    layout: "stack",
    mode: "light",
  },
}) => {
  const definition = resolveIntent(intent);

  const getFieldProps = (
    fieldIntent: FieldIntent,
    isRequired: boolean
  ): FieldProps => {
    const contextData = context[fieldIntent];
    const label = fieldIntent.split("_").map(capitalize).join(" ");

    if (!contextData) {
      return {
        label,
        required: isRequired,
        type: "text",
        className: getThemeClasses(fieldIntent, theme),
        theme: theme.mode,
      };
    }

    const baseProps = {
      label,
      required: isRequired,
      className: getThemeClasses(fieldIntent, theme),
      theme: theme.mode,
    };

    // Now TypeScript can properly infer the type based on the discriminated union
    switch (contextData.type) {
      case "text":
      case "textarea":
        return {
          ...baseProps,
          type: contextData.type,
          value: contextData.value,
          onChange: contextData.onChange,
          placeholder: contextData.placeholder,
        };

      case "select":
        return {
          ...baseProps,
          type: "select",
          value: contextData.value,
          onChange: contextData.onChange,
          options: contextData.options,
          placeholder: contextData.placeholder,
        };

      case "editor":
        return {
          ...baseProps,
          type: "editor",
          value: contextData.value,
          onChange: contextData.onChange,
        };

      case "date":
        return {
          ...baseProps,
          type: "date",
          value: contextData.value,
          onChange: contextData.onChange,
          minDate: contextData.minDate,
          maxDate: contextData.maxDate,
        };

      default:
        return {
          ...baseProps,
          type: "text",
        };
    }
  };

  return (
    <div className={getContainerClasses(theme)}>
      <div
        className={cn(
          "space-y-4",
          theme.layout === "grid" && "grid grid-cols-2 gap-4",
          theme.layout === "inline" && "flex flex-row gap-4"
        )}
      >
        {definition.requiredFields.map((fieldIntent) => {
          const FieldComponent = fieldPatterns[fieldIntent];
          return (
            <div
              key={fieldIntent}
              className={cn(
                "field-wrapper",
                theme.layout === "grid" && "col-span-1",
                theme.layout === "inline" && "flex-1"
              )}
            >
              <FieldComponent {...getFieldProps(fieldIntent, true)} />
            </div>
          );
        })}

        {definition.optionalFields?.map((fieldIntent) => {
          const FieldComponent = fieldPatterns[fieldIntent];
          return (
            <div
              key={fieldIntent}
              className={cn(
                "field-wrapper",
                theme.layout === "grid" && "col-span-1",
                theme.layout === "inline" && "flex-1"
              )}
            >
              <FieldComponent {...getFieldProps(fieldIntent, false)} />
            </div>
          );
        })}

        <Button
          className={cn(
            "w-full",
            theme.layout === "grid" && "col-span-2",
            theme.layout === "inline" && "flex-none"
          )}
          onClick={() => onSubmit?.(context)}
          variant={theme.mode === "dark" ? "default" : "secondary"}
        >
          {getActionLabel(intent)}
        </Button>
      </div>
    </div>
  );
};

// Example usage component
export default function ThemedFormExample() {
  const themes: Record<string, ThemeConfig> = {
    automotive: {
      industry: "automotive",
      size: "regular",
      layout: "stack",
      mode: "light",
    },
    marine: {
      industry: "marine",
      size: "spacious",
      layout: "stack",
      mode: "light",
    },
    realestate: {
      industry: "realestate",
      size: "compact",
      layout: "stack",
      mode: "light",
    },
  } as const;

  return (
    <div className="space-y-8 p-4">
      {Object.entries(themes).map(([industry, theme]) => (
        <div key={industry} className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {industry} Template
          </h2>
          <ThemedIntentComponent
            intent="create_template"
            context={{
              name_input: {
                type: "text",
                placeholder: `Enter ${industry} name`,
                onChange: (value: string) =>
                  console.log(`${industry} name:`, value),
              },
              category_selection: {
                type: "select",
                options: [
                  { label: "Category 1", value: "cat1" },
                  { label: "Category 2", value: "cat2" },
                  { label: "Category 3", value: "cat3" },
                ],
                onChange: (value: string) =>
                  console.log(`${industry} category:`, value),
              },
              description_input: {
                type: "textarea",
                placeholder: `Describe your ${industry} product`,
                onChange: (value: string) =>
                  console.log(`${industry} description:`, value),
              },
            }}
            theme={theme}
            onSubmit={console.log}
          />
        </div>
      ))}
    </div>
  );
}
