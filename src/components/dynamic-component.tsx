import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../utils/util";

// Define possible component types
type ComponentType =
  | "form"
  | "input"
  | "select"
  | "textarea"
  | "button"
  | "dialog"
  | "card";

interface SelectOption {
  label: string;
  value: string;
}

export interface ComponentData {
  componentType: ComponentType;
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  children?: ComponentData[];
}

interface DynamicComponentProps {
  data: ComponentData;
  onChange?: (id: string, value: string) => void;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  data,
  onChange,
}) => {
  // Debug render
  console.log("Rendering component:", data.componentType, data);

  const renderField = () => {
    switch (data.componentType) {
      case "form":
        return (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
              {data.label && <CardTitle>{data.label} asdaa sd</CardTitle>}
            </CardHeader>
            {data.children?.map((child, index) => (
              <DynamicComponent
                key={child.id || index}
                data={child}
                onChange={onChange}
              />
            ))}
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
        return <Button className={data.className}>{data.label}</Button>;

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

      default:
        return null;
    }
  };

  return renderField();
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
    className: "bg-red-400",
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
