import { useState } from "react";
import { handleSubmit } from "./utils/util";
import Components from "./components/component-registry/component-renderer";
import { Button } from "./components/ui/button";

export interface DataType {
  _uid: string;
  component: string;
  headline?: string;
  title?: string;
  className?: string;
  children?: string;
}

const data: DataType[] = [
  {
    _uid: "BUY6Drn9e1",
    component: "foo",
    headline: "Foo",
  },
  {
    _uid: "gJZoSLkfZV",
    component: "bar",
    title: "Bar",
  },
  {
    _uid: "X1JAfdsZxy",
    component: "foo",
    headline: "Another headline",
  },
];

function App() {
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [componentData, setComponentData] = useState<DataType[]>(data);
  console.log("componentData:", componentData);

  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center gap-5">
      <div className="text-3xl pt-28">Chat</div>
      <div className="flex flex-col items-center">
        <textarea
          className="bg-gray-400 text-black rounded-2xl px-5 py-3 w-[400px]"
          onChange={(e) => setVal(e.target.value)}
          value={val}
        />
        <Button
          children={"Submit"}
          onClick={() =>
            handleSubmit({
              setLoading,
              setComponentData,
              val,
            })
          }
        />
        {loading && <>Loading...</>}

        {/* Content Display */}
        <div className="min-h-[700px] w-[500px] bg-white border border-black rounded-3xl text-black">
          {componentData.map((block) => Components(block))}
        </div>
      </div>
    </div>
  );
}

export default App;
