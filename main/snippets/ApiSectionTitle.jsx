export const ApiSectionTitle = ({ title = "Section" }) => {
  return (
    <div>
      <div className="api-section-heading flex flex-col gap-y-4 w-full">
        <div className="flex items-baseline border-b pb-2.5 border-gray-100 dark:border-gray-800 w-full">
          <h4 className="api-section-heading-title flex-1 mb-0">{title}</h4>
        </div>
      </div>
    </div>
  );
};
