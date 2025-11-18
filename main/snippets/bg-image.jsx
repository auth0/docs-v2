export const BgImage = () => {
  return (
    <>
      <span
        className="fixed inset-0 -z-10 pointer-events-none dark:hidden"
        style={{
          backgroundImage: "url('/docs/images/bg_light.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left -250px",
          backgroundAttachment: "fixed",
        }}
      />
      <span
        className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: "url('/docs/images/bg_dark.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "",
          backgroundPosition: "center 0",
          backgroundAttachment: "fixed",
        }}
      />
    </>
  );
};
