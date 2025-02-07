import { transform } from "@babel/standalone";
import React from "react";
import { useState, useEffect } from "react";

export const componentParse = (code: string) => {
  try {
    // Transform TSX to JS
    const transformed = transform(code, {
      presets: ["typescript", "react"],
    }).code;

    // Create component in a controlled context
    const createComponent = new Function(
      "React",
      "useState",
      "useEffect",
      `return ${transformed}`
    );

    return createComponent(React, useState, useEffect);
  } catch (error) {
    console.error("Error parsing component code:", error);
    return null;
  }
};
