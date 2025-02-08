import { Dispatch, SetStateAction } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSubmit = async ({
  setLoading,
  setComponentData,
  val,
}: {
  setLoading: (val: boolean) => void;
  setComponentData: Dispatch<SetStateAction<[]>>;
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
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};
