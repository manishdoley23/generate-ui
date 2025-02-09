import { useCallback, useState } from "react";
import { ComponentData } from "./types";
import { DynamicComponent } from "./dynamic-component";
import { Button } from "../ui/button";

const YourCustomComponent = () => {
  return <div>Hello</div>;
};

const complexFormData: ComponentData = {
  componentType: "form",
  layout: {
    type: "stack",
    gap: "2rem",
  },
  children: [
    {
      componentType: "card",
      label: "Personal Information",
      layout: {
        type: "grid",
        cols: { sm: 1, md: 2 },
        gap: "1rem",
      },
      children: [
        {
          componentType: "input",
          id: "firstName",
          label: "First Name",
          validation: [
            { type: "required", message: "First name is required" },
            {
              type: "minLength",
              value: 2,
              message: "Name must be at least 2 characters",
            },
          ],
          theme: {
            variant: "outlined",
            size: "md",
          },
        },
        {
          componentType: "input",
          id: "lastName",
          label: "Last Name",
          validation: [{ type: "required", message: "Last name is required" }],
        },
      ],
    },
    {
      componentType: "card",
      label: "Contact Details",
      layout: {
        type: "flex",
        direction: "column",
        gap: "1rem",
      },
      children: [
        {
          componentType: "input",
          id: "email",
          label: "Email",
          validation: [
            { type: "required", message: "Email is required" },
            {
              type: "pattern",
              value: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
              message: "Invalid email address",
            },
          ],
        },
        {
          componentType: "input",
          id: "phone",
          label: "Phone",
          validation: [
            {
              type: "custom",
              message: "Invalid phone number",
              validate: (value) => /^\+?[\d\s-]{10,}$/.test(value),
            },
          ],
        },
      ],
    },
    {
      componentType: "card",
      label: "Custom Component Example",
      children: [
        {
          componentType: "custom",
          id: "customField",
          customProps: {
            component: YourCustomComponent,
            someCustomProp: "value",
          },
        },
      ],
    },
  ],
};

export default function ComplexFormExample() {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [validity, setValidity] = useState<Record<string, boolean>>({});

  const handleChange = (id: string, value: any, isValid?: boolean) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (isValid) {
      setValidity((prev) => ({
        ...prev,
        [id]: isValid,
      }));
    }
  };

  const isFormValid = useCallback(() => {
    return Object.values(validity).every(Boolean);
  }, [validity]);

  return (
    <div className="p-6">
      <DynamicComponent data={complexFormData} onChange={handleChange} />
      <div className="mt-4">
        <Button
          disabled={!isFormValid()}
          onClick={() => console.log("Form data:", formState)}
        >
          Submit
        </Button>
      </div>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify({ formState, validity }, null, 2)}
      </pre>
    </div>
  );
}
