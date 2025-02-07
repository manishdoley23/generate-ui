interface ComponentMeta {
  id: string;
  type: "form" | "list" | "table" | "chart";
  allowedPrompts: string[];
  constraints: {
    maxItems?: number;
    requiredFields?: string[];
    allowedFields?: string[];
  };
}

interface ComponentRegistry {
  [key: string]: ComponentMeta;
}
