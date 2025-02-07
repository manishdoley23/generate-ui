import { Dispatch, SetStateAction } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DataType } from "../App";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSubmit = async ({
  setLoading,
  setComponentData,
  val,
}: {
  setLoading: (val: boolean) => void;
  setComponentData: Dispatch<SetStateAction<DataType[]>>;
  val: string;
}) => {
  try {
    setLoading(true);

    console.log("Sending request with value:", val);

    const response = await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        body: val,
      }),
    });

    // if (!response.body) return;

    const data = await response.json();
    console.log("data:", data);
    const setter: DataType = {
      _uid: "123ugasdhj",
      component: data.id,
      headline: "Button",
      className: "bg-red-400",
      children: "Submit",
    };
    setComponentData((prev) => [...prev, setter]);
    // const element = componentRegistry(data.id);
    // console.log("element", element);
    // setComponentData(element);

    // const reader = response.body.getReader();
    // const decoder = new TextDecoder();

    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) {
    //     console.log("Stream complete");
    //     break;
    //   }

    //   const chunk = decoder.decode(value);
    //   // console.log("Received chunk:", chunk);

    //   const lines = chunk.split("\n");

    //   for (const line of lines) {
    //     if (line.startsWith("data: ")) {
    //       const data = line.slice(6);
    //       if (data === "[DONE]") {
    //         console.log("Received DONE signal");
    //         break;
    //       }
    //       try {
    //         const { content } = JSON.parse(data);
    //         console.log("Parsed content:", content);
    //         setStreamedContent((prev: string) => prev + content);
    //       } catch (e) {
    //         console.error("Error parsing chunk:", e);
    //       }
    //     }
    //   }
    // }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};
