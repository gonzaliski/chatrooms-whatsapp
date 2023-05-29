export const Spinner = () => {
  return (
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em]">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
