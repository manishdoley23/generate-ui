interface DynamicComponentProps {
  component: React.ComponentType | null;
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  component: Component,
}) => {
  if (!Component) return null;

  try {
    return <Component />;
  } catch (error) {
    console.error("Error rendering component:", error);
    return <div>Error rendering component</div>;
  }
};
