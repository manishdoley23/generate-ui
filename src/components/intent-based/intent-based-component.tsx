import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { SerializedEditorState } from "lexical";
import {
  ContextData,
  DateFieldProps,
  EditorFieldProps,
  FieldIntent,
  FieldProps,
  InputFieldProps,
  IntentComponentProps,
  SelectFieldProps,
  UserIntent,
} from "./types";
import { fieldPatterns } from "./field-patterns";
import { capitalize, getActionLabel, resolveIntent } from "./helper";
// import { Editor } from "@/components/blocks/editor-x/editor";

const defaultEditorState: SerializedEditorState = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export const IntentComponent: React.FC<IntentComponentProps> = ({
  intent,
  context,
  onSubmit,
}) => {
  const definition = resolveIntent(intent);

  const getFieldProps = (
    fieldIntent: FieldIntent,
    isRequired: boolean
  ): FieldProps => {
    const contextData = context[fieldIntent] || {};
    const label = fieldIntent.split("_").map(capitalize).join(" ");
    const baseProps = {
      label,
      required: isRequired,
      ...contextData,
    };

    switch (fieldIntent) {
      case "content_editor":
        return {
          ...baseProps,
          value: contextData.value as SerializedEditorState,
          onChange: contextData.onChange as (
            value: SerializedEditorState
          ) => void,
        } as EditorFieldProps;

      case "category_selection":
        return {
          ...baseProps,
          options: contextData.options || [],
        } as SelectFieldProps;

      case "date_picker":
        return {
          ...baseProps,
          minDate: contextData.minDate,
          maxDate: contextData.maxDate,
        } as DateFieldProps;

      default:
        return baseProps as InputFieldProps;
    }
  };

  return (
    <div className="space-y-4">
      {definition.requiredFields.map((fieldIntent) => {
        const FieldComponent = fieldPatterns[fieldIntent];
        const element = FieldComponent(getFieldProps(fieldIntent, true));
        return (
          element && (
            <React.Fragment key={fieldIntent}>{element}</React.Fragment>
          )
        );
      })}

      {definition.optionalFields?.map((fieldIntent) => {
        const FieldComponent = fieldPatterns[fieldIntent];
        const element = FieldComponent(getFieldProps(fieldIntent, false));
        return (
          element && (
            <React.Fragment key={fieldIntent}>{element}</React.Fragment>
          )
        );
      })}

      <Button className="w-full" onClick={() => onSubmit?.(context)}>
        {getActionLabel(intent)}
      </Button>
    </div>
  );
};

// Example usage
export default function IntentBasedComponent() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(defaultEditorState);

  const llmResponse = {
    intent: "create_template" as UserIntent,
    context: {
      category_selection: {
        options: [
          { label: "Marketing", value: "marketing" },
          { label: "Sales", value: "sales" },
          { label: "Support", value: "support" },
        ],
        value: "",
        onChange: (value: string) => console.log("Category:", value),
      },
      content_editor: {
        value: editorState,
        onChange: (value: SerializedEditorState) => setEditorState(value),
      },
    } as ContextData,
  };

  return (
    <div className="p-4">
      <IntentComponent
        intent={llmResponse.intent}
        context={llmResponse.context}
        onSubmit={console.log}
      />
    </div>
  );
}
