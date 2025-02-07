import React from "react";

export default (props) => {
  const [counter, setCounter] = React.useState(0);
  return (
    <div className="foo">
      <hr />
      Hi I'm a Foo component with the headline: {counter}
      <h2>{props.block.headline}</h2>
      asgdklahjsgdhkl j ajshdlkajshdlk halskjdh aklsjdh jklas
      <button onClick={() => setCounter((prev) => prev + 1)} />
    </div>
  );
};
