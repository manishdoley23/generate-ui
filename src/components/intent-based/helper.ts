import { IntentDefinition, UserIntent } from "./types";

export function getActionLabel(intent: UserIntent): string {
  switch (intent) {
    case "create_template":
      return "Create Template";
    case "edit_template":
      return "Save Changes";
    case "view_template":
      return "Close";
  }
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function resolveIntent(intent: UserIntent): IntentDefinition {
  switch (intent) {
    case "create_template":
      return {
        requiredFields: ["name_input", "category_selection"],
        optionalFields: ["description_input", "content_editor"],
      };
    case "edit_template":
      return {
        requiredFields: ["name_input"],
        optionalFields: [
          "category_selection",
          "description_input",
          "content_editor",
        ],
      };
    case "view_template":
      return {
        requiredFields: ["name_input", "content_editor"],
        optionalFields: [],
      };
  }
}
