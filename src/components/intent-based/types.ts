import { SerializedEditorState, SerializedLexicalNode } from "lexical";

// Base field props interface
interface BaseFieldProps {
  label: string;
  required?: boolean;
  error?: string;
}

// Create a base props interface for fields with value/onChange
interface ValueFieldProps<T = string> extends BaseFieldProps {
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
}

// Specific field props interfaces
export interface InputFieldProps extends ValueFieldProps<string> {
  type?: "text" | "email" | "password";
}

export interface SelectFieldProps extends ValueFieldProps<string> {
  options: Array<{ label: string; value: string }>;
}

export interface ContextData {
  [key: string]: {
    value?: string | SerializedEditorState;
    onChange?: (value: string | SerializedEditorState) => void;
    options?: Array<{ label: string; value: string }>;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    maxLength?: number;
  };
}

// IntentComponent props
export interface IntentComponentProps {
  intent: UserIntent;
  context: ContextData;
  onSubmit?: (data: ContextData) => void;
}

// Define UserIntent type
export type UserIntent = "create_template" | "edit_template" | "view_template";

export interface DateFieldProps extends ValueFieldProps<string> {
  minDate?: Date;
  maxDate?: Date;
}

export interface EditorFieldProps
  extends Omit<BaseFieldProps, "value" | "onChange"> {
  placeholder?: string;
  maxLength?: number;
  value?: SerializedEditorState;
  onChange?: (value: SerializedEditorState) => void;
}

// Union type for all possible field props

// Intent resolution interface and function
export interface IntentDefinition {
  requiredFields: FieldIntent[];
  optionalFields?: FieldIntent[];
}

export type FieldIntent =
  | "name_input"
  | "description_input"
  | "category_selection"
  | "content_editor"
  | "date_picker";

interface BaseFieldProps {
  label: string;
  required?: boolean;
  className?: string;
  theme?: string;
}

// Props for different field types
export interface TextFieldProps extends BaseFieldProps {
  type: "text" | "textarea";
  value?: string;
  onChange?: (value: string) => void;
}

export interface SelectFieldProps extends BaseFieldProps {
  type: "select";
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}

export interface EditorFieldProps extends BaseFieldProps {
  type: "editor";
  value?: SerializedEditorState<SerializedLexicalNode>;
  onChange?: (value: SerializedEditorState<SerializedLexicalNode>) => void;
}

export interface DateFieldProps extends BaseFieldProps {
  type: "date";
  value?: string;
  onChange?: (value: string) => void;
}

// Union type for all field props
export type FieldProps =
  | TextFieldProps
  | SelectFieldProps
  | EditorFieldProps
  | DateFieldProps;
