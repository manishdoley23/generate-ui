import React from "react";
import Foo from "./Foo";
import Bar from "./Bar";
// import DynamicForm from "../ui/dynamic-form";
import { Button } from "../ui/button";

const Components = {
  foo: Foo,
  bar: Bar,
  button: Button,
};

const ComponentRenderer = (block: any) => {
  if (typeof Components[block.component] !== "undefined") {
    const cleanProps = Object.entries(block).reduce((props, [key, value]) => {
      if (value !== undefined && key !== "component") {
        props[key] = value;
      }
      return props;
    }, {} as Record<string, any>);

    return React.createElement(Components[block.component], {
      block: block,
      ...cleanProps,
      key: block._uid,
    });
  }
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block._uid }
  );
};

export default ComponentRenderer;
