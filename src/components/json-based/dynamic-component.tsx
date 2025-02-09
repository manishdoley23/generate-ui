import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DynamicLayout } from "./dynamic-layout";
import { ComponentData, ValidationRule } from "./types";
import { Textarea } from "../ui/textarea";

interface ValidationState {
  isValid: boolean;
  errors: string[];
}

const validateField = async (
  value: any,
  rules?: ValidationRule[]
): Promise<ValidationState> => {
  if (!rules?.length) return { isValid: true, errors: [] };

  const errors: string[] = [];

  for (const rule of rules) {
    let isValid = true;

    switch (rule.type) {
      case "required":
        isValid = value !== undefined && value !== "" && value !== null;
        break;
      case "pattern":
        isValid = new RegExp(rule.value).test(value);
        break;
      case "minLength":
        isValid = value.length >= rule.value;
        break;
      case "maxLength":
        isValid = value.length <= rule.value;
        break;
      case "custom":
        if (rule.validate) {
          isValid = await Promise.resolve(rule.validate(value));
        }
        break;
    }

    if (!isValid) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

interface DynamicComponentProps {
  data: ComponentData;
  onChange?: (id: string, value: any, isValid?: boolean) => void;
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  data,
  onChange,
}) => {
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    errors: [],
  });

  const handleChange = useCallback(
    async (value: any) => {
      if (!data.id) return;

      const validationResult = await validateField(value, data.validation);
      setValidation(validationResult);
      onChange?.(data.id, value, validationResult.isValid);
    },
    [data.id, data.validation, onChange]
  );

  const renderField = () => {
    // If component has layout configuration, wrap children in DynamicLayout
    if (data.layout && data.children) {
      return (
        <DynamicLayout
          config={data.layout}
          className={cn(
            data.className,
            data.theme?.customStyles &&
              Object.entries(data.theme.customStyles)
                .map(([key, value]) => `${key}:${value}`)
                .join(";")
          )}
        >
          {data.children.map((child, index) => (
            <DynamicComponent
              key={child.id || index}
              data={child}
              onChange={onChange}
            />
          ))}
        </DynamicLayout>
      );
    }

    // Existing component rendering logic...
    switch (data.componentType) {
      case "form":
        return (
          <form
            className={cn("space-y-4", data.className)}
            onSubmit={(e) => e.preventDefault()}
          >
            {data.children?.map((child, index) => (
              <DynamicComponent
                key={child.id || index}
                data={child}
                onChange={onChange}
              />
            ))}
          </form>
        );

      case "card":
        return (
          <Card className={cn(data.className)}>
            <CardHeader>
              {data.label && <CardTitle>{data.label}</CardTitle>}
              {data.description && (
                <CardDescription>{data.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {data.children?.map((child, index) => (
                <DynamicComponent
                  key={child.id || index}
                  data={child}
                  onChange={onChange}
                />
              ))}
            </CardContent>
          </Card>
        );

      case "input":
        return (
          <div className="space-y-2">
            {data.label && <Label>{data.label}</Label>}
            <Input
              id={data.id}
              placeholder={data.placeholder}
              required={data.required}
              onChange={(e) => onChange?.(data.id!, e.target.value)}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            {data.label && <Label>{data.label}</Label>}
            <Select onValueChange={(value) => onChange?.(data.id!, value)}>
              <SelectTrigger>
                <SelectValue placeholder={data.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {data.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            {data.label && <Label>{data.label}</Label>}
            <Textarea
              id={data.id}
              placeholder={data.placeholder}
              required={data.required}
              onChange={(e) => onChange?.(data.id!, e.target.value)}
            />
          </div>
        );

      case "button":
        return <Button className={cn(data.className)}>{data.label}</Button>;

      case "dialog":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Form</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{data.label}</DialogTitle>
              </DialogHeader>
              {data.children?.map((child, index) => (
                <DynamicComponent
                  key={child.id || index}
                  data={child}
                  onChange={onChange}
                />
              ))}
            </DialogContent>
          </Dialog>
        );

      case "custom":
        if (!data.customProps?.component) return null;
        const CustomComponent = data.customProps.component;
        return (
          <CustomComponent {...data.customProps} onChange={handleChange} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="dynamic-component">
      {renderField()}
      {validation.errors.length > 0 && (
        <div className="validation-errors mt-1">
          {validation.errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage component
export default function TemplateForm() {
  const [formState, setFormState] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log("Form state updated:", id, value);
  };

  const formData: ComponentData = {
    componentType: "card",
    label: "Create a Car Template",
    description: "Get the best cars",
    className:
      "w-[500px] bg-gradient-to-r from-indigo-300 to-pink-300 text-gray-900 rounded-lg shadow-lg",
    children: [
      {
        componentType: "form",
        children: [
          {
            componentType: "select",
            id: "category",
            label: "Category",
            required: true,
            placeholder: "Select a category",
            options: [
              { label: "Sedan", value: "sedan" },
              { label: "SUV", value: "suv" },
              { label: "Sports", value: "sports" },
            ],
          },
          {
            componentType: "select",
            id: "type",
            label: "Type",
            placeholder: "Select a type",
            options: [
              { label: "New", value: "new" },
              { label: "Used", value: "used" },
            ],
          },
          {
            componentType: "input",
            id: "name",
            label: "Name",
            placeholder: "Enter Name",
            required: true,
          },
          {
            componentType: "textarea",
            id: "text",
            label: "Text",
            placeholder: "Enter Text",
          },
          {
            componentType: "button",
            label: "Submit",
            className: "w-full mt-4",
          },
        ],
      },
    ],
  };

  return (
    <div className="p-4">
      <DynamicComponent data={formData} onChange={handleChange} />
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify(formState, null, 2)}
      </pre>
    </div>
  );
}
