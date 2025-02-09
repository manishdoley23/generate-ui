import TemplateForm from "./components/json-based/dynamic-component";
import ComplexFormExample from "./components/json-based/dynamic-component-example";
import TestFormsExample from "./components/json-based/test-components";
// import IntentBasedComponent from "./components/intent-based/intent-based-component";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center gap-5">
      <TemplateForm />
      <ComplexFormExample />
      {/* <IntentBasedComponent /> */}
      <TestFormsExample />
    </div>
  );
}

export default App;
