export const MainForm = ({
  onSubmit,
  children,
}: {
  onSubmit?: (b: any) => any;
  children?: React.ReactNode;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
      {children}
    </form>
  );
};
