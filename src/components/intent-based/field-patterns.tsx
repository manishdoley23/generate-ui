import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DateFieldProps,
  EditorFieldProps,
  FieldProps,
  SelectFieldProps,
  TextFieldProps,
} from "./types";

const isTextField = (props: FieldProps): props is TextFieldProps =>
  props.type === "text" || props.type === "textarea";

const isSelectField = (props: FieldProps): props is SelectFieldProps =>
  props.type === "select";

const isEditorField = (props: FieldProps): props is EditorFieldProps =>
  props.type === "editor";

const isDateField = (props: FieldProps): props is DateFieldProps =>
  props.type === "date";

export const fieldPatterns = {
  name_input: (props: FieldProps) => {
    if (!isTextField(props)) return null;
    const { label, required, value, onChange, className, theme } = props;

    return (
      <div className="space-y-2">
        <Label
          className={cn(
            theme === "dark" ? "text-white" : "text-gray-700",
            "font-medium"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={className}
          required={required}
        />
      </div>
    );
  },

  description_input: (props: FieldProps) => {
    if (!isTextField(props)) return null;
    const { label, required, value, onChange, className, theme } = props;

    return (
      <div className="space-y-2">
        <Label
          className={cn(
            theme === "dark" ? "text-white" : "text-gray-700",
            "font-medium"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(className, "min-h-[100px]")}
          required={required}
        />
      </div>
    );
  },

  category_selection: (props: FieldProps) => {
    if (!isSelectField(props)) return null;
    const { label, required, value, onChange, options, className, theme } =
      props;

    return (
      <div className="space-y-2">
        <Label
          className={cn(
            theme === "dark" ? "text-white" : "text-gray-700",
            "font-medium"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  theme === "dark"
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100"
                )}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },

  content_editor: (props: FieldProps) => {
    if (!isEditorField(props)) return null;
    const {
      label,
      required,
      // value,
      // onChange,
      className,
      theme,
    } = props;

    return (
      <div className="space-y-2">
        <Label
          className={cn(
            theme === "dark" ? "text-white" : "text-gray-700",
            "font-medium"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div
          className={cn(
            "min-h-[200px] rounded-md border",
            className,
            theme === "dark" ? "bg-gray-800" : "bg-white"
          )}
        >
          {/* Editor component implementation */}
        </div>
      </div>
    );
  },

  date_picker: (props: FieldProps) => {
    if (!isDateField(props)) return null;
    const { label, required, className, theme } = props;

    return (
      <div className="space-y-2">
        <Label
          className={cn(
            theme === "dark" ? "text-white" : "text-gray-700",
            "font-medium"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div
          className={cn(
            "rounded-md border",
            className,
            theme === "dark" ? "bg-gray-800" : "bg-white"
          )}
        >
          {/* Calendar component implementation */}
        </div>
      </div>
    );
  },
};
