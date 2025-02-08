import TemplateForm from "./components/dynamic-component";
import IntentBasedComponent from "./components/intent-based/intent-based-component";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center gap-5">
      <TemplateForm />
      <IntentBasedComponent />
    </div>
  );
}

export default App;
