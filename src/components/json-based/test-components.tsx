import { useState } from "react";
import { DynamicComponent } from "./dynamic-component";
import { ComponentData } from "./types";

const jobApplicationForm: ComponentData = {
  componentType: "card",
  label: "Senior Developer Application",
  description: "Please fill out all required fields",
  className:
    "max-w-4xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg",
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
        cols: { sm: 1, md: 2, lg: 3 },
        gap: "1rem",
      },
      children: [
        {
          componentType: "input",
          id: "firstName",
          label: "First Name",
          required: true,
          validation: [
            { type: "required", message: "First name is required" },
            {
              type: "minLength",
              value: 2,
              message: "Name must be at least 2 characters",
            },
          ],
        },
        {
          componentType: "input",
          id: "lastName",
          label: "Last Name",
          required: true,
          validation: [{ type: "required", message: "Last name is required" }],
        },
        {
          componentType: "input",
          id: "email",
          label: "Email",
          required: true,
          validation: [
            { type: "required", message: "Email is required" },
            {
              type: "pattern",
              value: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
              message: "Invalid email format",
            },
          ],
        },
      ],
    },
    {
      componentType: "card",
      label: "Professional Experience",
      layout: {
        type: "stack",
        gap: "1.5rem",
      },
      children: [
        {
          componentType: "select",
          id: "yearsOfExperience",
          label: "Years of Experience",
          required: true,
          options: [
            { label: "0-2 years", value: "junior" },
            { label: "3-5 years", value: "mid" },
            { label: "5+ years", value: "senior" },
          ],
        },
        {
          componentType: "textarea",
          id: "description",
          label: "Tell us about your experience",
          placeholder: "Describe your relevant experience...",
          validation: [
            { type: "required", message: "Experience description is required" },
            {
              type: "minLength",
              value: 100,
              message: "Please provide at least 100 characters",
            },
          ],
        },
      ],
    },
    {
      componentType: "button",
      label: "Submit Application",
      className:
        "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700",
    },
  ],
};

// 2. Product Configuration Builder with Dynamic Sections
const productConfigBuilder: ComponentData = {
  componentType: "card",
  label: "Custom Product Builder",
  description: "Configure your product specifications",
  className:
    "max-w-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-lg",
  layout: {
    type: "stack",
    gap: "2rem",
  },
  children: [
    {
      componentType: "card",
      label: "Base Configuration",
      layout: {
        type: "grid",
        cols: { sm: 1, md: 2 },
        gap: "1.5rem",
      },
      children: [
        {
          componentType: "select",
          id: "productType",
          label: "Product Type",
          required: true,
          options: [
            { label: "Standard", value: "standard" },
            { label: "Premium", value: "premium" },
            { label: "Enterprise", value: "enterprise" },
          ],
          validation: [
            { type: "required", message: "Please select a product type" },
          ],
        },
        {
          componentType: "input",
          id: "quantity",
          label: "Quantity",
          type: "number",
          validation: [
            { type: "required", message: "Quantity is required" },
            {
              type: "custom",
              message: "Quantity must be between 1 and 100",
              validate: (value) => value >= 1 && value <= 100,
            },
          ],
        },
      ],
    },
    {
      componentType: "card",
      label: "Advanced Options",
      layout: {
        type: "flex",
        direction: "column",
        gap: "1rem",
      },
      children: [
        {
          componentType: "select",
          id: "customization",
          label: "Customization Level",
          options: [
            { label: "None", value: "none" },
            { label: "Basic", value: "basic" },
            { label: "Advanced", value: "advanced" },
          ],
        },
        {
          componentType: "textarea",
          id: "specifications",
          label: "Special Requirements",
          placeholder: "Enter any special requirements or specifications...",
        },
      ],
    },
    {
      componentType: "card",
      label: "Delivery Information",
      layout: {
        type: "grid",
        cols: { sm: 1, md: 2 },
        gap: "1rem",
      },
      children: [
        {
          componentType: "input",
          id: "deliveryDate",
          label: "Preferred Delivery Date",
          type: "date",
          validation: [
            { type: "required", message: "Delivery date is required" },
          ],
        },
        {
          componentType: "select",
          id: "deliveryMethod",
          label: "Delivery Method",
          options: [
            { label: "Standard", value: "standard" },
            { label: "Express", value: "express" },
            { label: "Next Day", value: "nextday" },
          ],
        },
      ],
    },
    {
      componentType: "button",
      label: "Generate Quote",
      className:
        "w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700",
    },
  ],
};

// 3. Advanced Survey Form with Conditional Fields
const surveyForm: ComponentData = {
  componentType: "card",
  label: "Customer Satisfaction Survey",
  description: "Help us improve our services",
  className:
    "max-w-4xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg",
  layout: {
    type: "stack",
    gap: "2rem",
  },
  children: [
    {
      componentType: "card",
      label: "Overall Experience",
      layout: {
        type: "flex",
        direction: "column",
        gap: "1.5rem",
      },
      children: [
        {
          componentType: "select",
          id: "satisfaction",
          label: "How satisfied were you with our service?",
          required: true,
          options: [
            { label: "Very Satisfied", value: "5" },
            { label: "Satisfied", value: "4" },
            { label: "Neutral", value: "3" },
            { label: "Dissatisfied", value: "2" },
            { label: "Very Dissatisfied", value: "1" },
          ],
        },
        {
          componentType: "textarea",
          id: "feedback",
          label: "What made you feel this way?",
          placeholder:
            "Please provide specific details about your experience...",
          validation: [
            { type: "required", message: "Feedback is required" },
            {
              type: "minLength",
              value: 50,
              message: "Please provide at least 50 characters",
            },
          ],
        },
      ],
    },
    {
      componentType: "card",
      label: "Product Feedback",
      layout: {
        type: "grid",
        cols: { sm: 1, md: 2 },
        gap: "1rem",
      },
      children: [
        {
          componentType: "select",
          id: "usageFrequency",
          label: "How often do you use our product?",
          options: [
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Rarely", value: "rarely" },
          ],
        },
        {
          componentType: "select",
          id: "recommendLikelihood",
          label: "How likely are you to recommend us?",
          options: [
            { label: "Very Likely", value: "5" },
            { label: "Likely", value: "4" },
            { label: "Neutral", value: "3" },
            { label: "Unlikely", value: "2" },
            { label: "Very Unlikely", value: "1" },
          ],
        },
      ],
    },
    {
      componentType: "button",
      label: "Submit Survey",
      className:
        "w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700",
    },
  ],
};

// Usage Example
export default function TestFormsExample() {
  const [formStates, setFormStates] = useState<
    Record<string, Record<string, any>>
  >({
    job: {},
    product: {},
    survey: {},
  });

  const handleChange =
    (formId: string) =>
    (id: string, value: any, isValid: boolean = true) => {
      setFormStates((prev) => ({
        ...prev,
        [formId]: {
          ...prev[formId],
          [id]: value,
        },
      }));
    };

  return (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Job Application Form</h2>
        <DynamicComponent
          data={jobApplicationForm}
          onChange={handleChange("job")}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Product Configuration</h2>
        <DynamicComponent
          data={productConfigBuilder}
          onChange={handleChange("product")}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Customer Survey</h2>
        <DynamicComponent data={surveyForm} onChange={handleChange("survey")} />
      </section>

      <pre className="mt-8 p-4 bg-gray-100 rounded">
        {JSON.stringify(formStates, null, 2)}
      </pre>
    </div>
  );
}
