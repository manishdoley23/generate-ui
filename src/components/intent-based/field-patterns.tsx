import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  DateFieldProps,
  EditorFieldProps,
  FieldIntent,
  FieldProps,
  InputFieldProps,
  SelectFieldProps,
} from "./types";

// Field Pattern Props Type Guards
function isInputProps(props: FieldProps): props is InputFieldProps {
  return (
    !("options" in props) && !("minDate" in props) && !("maxLength" in props)
  );
}

function isSelectProps(props: FieldProps): props is SelectFieldProps {
  return "options" in props;
}

function isDateProps(props: FieldProps): props is DateFieldProps {
  return "minDate" in props || "maxDate" in props;
}

function isEditorProps(props: FieldProps): props is EditorFieldProps {
  return "maxLength" in props;
}

export const fieldPatterns: Record<
  FieldIntent,
  (props: FieldProps) => React.ReactElement | null
> = {
  name_input: (props: FieldProps) => {
    if (!isInputProps(props)) return null;
    return (
      <div className="space-y-2">
        <Label>
          {props.label} {props.required && "*"}
        </Label>
        <Input
          placeholder={
            props.placeholder || `Enter ${props.label.toLowerCase()}`
          }
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
        {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      </div>
    );
  },

  description_input: (props: FieldProps) => {
    if (!isInputProps(props)) return null;
    return (
      <div className="space-y-2">
        <Label>{props.label}</Label>
        <Textarea
          placeholder={
            props.placeholder || `Enter ${props.label.toLowerCase()}`
          }
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
        {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      </div>
    );
  },

  category_selection: (props: FieldProps) => {
    if (!isSelectProps(props)) return null;
    return (
      <div className="space-y-2">
        <Label>{props.label}</Label>
        <Select value={props.value} onValueChange={props.onChange}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                props.placeholder || `Select ${props.label.toLowerCase()}`
              }
            />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      </div>
    );
  },

  content_editor: (props: FieldProps) => {
    if (!isEditorProps(props)) return null;
    return (
      <div className="space-y-2">
        <Label>{props.label}</Label>
        <div className="min-h-[200px] rounded-md border">
          {/* <Editor
          editorSerializedState={props.value || defaultEditorState}
          onSerializedChange={props.onChange}
        /> */}
        </div>
        {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      </div>
    );
  },

  date_picker: (props: FieldProps) => {
    if (!isDateProps(props)) return null;
    return (
      <div className="space-y-2">
        <Label>{props.label}</Label>
        {/* <Calendar
        selected={props.value ? new Date(props.value) : undefined}
        onSelect={(date) => props.onChange?.(date?.toISOString() || "")}
        minDate={props.minDate}
        maxDate={props.maxDate}
      /> */}
        {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      </div>
    );
  },
};
