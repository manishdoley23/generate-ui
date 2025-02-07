export const HTMLPreview = ({ htmlContent }: { htmlContent: string }) => {
  if (!htmlContent) return null;

  // return <Markdown>{htmlContent}</Markdown>;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};
