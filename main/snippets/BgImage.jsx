export const BgImage = () => {
  return (
    <>
      <span
        className="fixed inset-0 -z-10 pointer-events-none dark:hidden"
        style={{
          backgroundImage: "url('/images/bg_light.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left -400px",
          backgroundAttachment: "fixed",
        }}
      />
      <span
        className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: "url('/images/dark_bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "",
          backgroundPosition: "center 0",
          backgroundAttachment: "fixed",
        }}
      />
    </>
  );
};
