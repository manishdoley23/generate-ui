import { useEffect, useState } from "react";
// import { HTMLPreview } from "./components/helper";
import { componentParse } from "./component-parse";
import { DynamicComponent } from "./components/dynamic";
import { handleSubmit } from "./utils/util";

function App() {
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [html, setHtml] = useState("");
  const [component, setComponent] = useState<React.ComponentType | null>(null);
  const [streamedContent, setStreamedContent] = useState("");
  const [tsx, setTsx] = useState("");

  useEffect(() => {}, [streamedContent]);

  const parseContent = (content: string) => {
    console.log("content:", content);

    try {
      const htmlMatch = streamedContent.match(/```tsx\n([\s\S]*?)```/);

      const htmlContent = htmlMatch ? htmlMatch[1] : "";

      // const codeMatch = content.match(/```(jsx?|javascript)\n([\s\S]*?)```/);
      // const codeContent = codeMatch ? codeMatch[2] : "";

      setHtml(htmlContent);
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center gap-5">
      <div className="text-3xl pt-28">Chat</div>
      <div className="flex flex-col items-center">
        <textarea
          className="bg-gray-400 text-black rounded-2xl px-5 py-3 w-[400px]"
          onChange={(e) => setVal(e.target.value)}
          value={val}
        />
        <button
          onMouseDown={() =>
            handleSubmit({
              setLoading,
              setStreamedContent,
              val,
            })
          }
        >
          Submit
        </button>
        {loading && <>Loading...</>}

        {/* Content Display */}
        <div className="min-h-[700px] w-[500px] bg-white border border-black rounded-3xl text-black">
          {/* <HTMLPreview htmlContent={html} /> */}
          {/* <DynamicComponent component={component} /> */}
          {/* {streamedContent} */}
          {/* {data.content.body.map((block) => block.component)} */}
        </div>
      </div>
    </div>
  );
}

export default App;
