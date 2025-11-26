export const SectionCard = ({ item }) => {
  const getLink = (item, label) => item?.links?.find((l) => l.label?.toLowerCase() === label.toLowerCase());
  const github = getLink(item, "github");
  const sample = getLink(item, "sample app");
  const quickstart = getLink(item, "quickstart");
  const docs = getLink(item, "Get started");

  const title = item?.name ?? "";
  const subtext = item?.subtext ?? "";
  const badge = item?.badge ?? "";
  const date = item?.date ?? "";

  const isHttpsLogo = typeof item?.logo === "string" && /^https:\/\//i.test(item.logo);

  const src = isHttpsLogo ? item.logo : `/docs/images/icons/light/${item?.logo}`;
  const srcDark = isHttpsLogo ? item.logo : `/docs/images/icons/dark/${item?.logo}`;

  // Add grayscale class only if https
  const imgClass = "!my-0 w-8 h-8 object-contain shrink-0 " + (isHttpsLogo ? "mint-filter mint-grayscale" : "");

  const tertiary = quickstart || docs;
  const tertiaryLabel = quickstart ? "Quickstart" : docs ? "Get started" : "";

  return (
    <article
      className="
      libraries_card mb-[16px]
      rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow
      border-gray-200 dark:border-gray-800 dark:bg-black
    "
    >
      <div className="px-4 md:px-5 pt-4 md:pt-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3 min-w-0">
            {item?.logo && (
              <>
                <img noZoom src={src} alt={title} className={`${imgClass} mint-block dark:mint-hidden my-0`} />
                <img noZoom src={srcDark} alt={title} className={`${imgClass} mint-hidden dark:mint-block my-0`} />
              </>
            )}

            <div className="min-w-0">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate !m-0 leading-snug">
                {title}
              </h4>
              {!!subtext && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate !m-0 leading-tight">{subtext}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-0.5 shrink-0">
            {!!badge && (
              <span
                className="
                  inline-flex items-center rounded-full px-1.5 py-[0.5px] text-[10px] font-medium
                  border border-emerald-700 text-emerald-700 bg-emerald-200
                  dark:border-emerald-400 dark:text-emerald-300 dark:bg-emerald-900/30
                "
              >
                {badge}
              </span>
            )}
            {!!date && (
              <span className="mr-[5px] text-[10px] text-gray-500 dark:text-gray-400">
                on {date.replace(/^on\s+/i, "")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="h-px mx-3 bg-gray-200 dark:bg-gray-800" />

      <div className="px-4 md:px-5 py-3">
        <div className="libraries_cards flex items-center justify-between w-full gap-3">
          {github && (
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                no_external_icon inline-flex items-center gap-1.5 text-xs font-medium
                !text-black dark:!text-white
                !no-underline !border-0
                transition-colors duration-200
                hover:!text-neutral-700 dark:hover:!text-neutral-200
              "
              style={{ borderBottom: "none !important" }}
            >
              <Icon icon="github" className="w-3 h-3 shrink-0" />
              <span className="leading-none">Github</span>
            </a>
          )}

          {sample && (
            <a
              href={sample.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                no_external_icon inline-flex items-center gap-1.5 text-xs font-medium
                !text-black dark:!text-white
                !no-underline !border-0
                transition-colors duration-200
                hover:!text-neutral-700 dark:hover:!text-neutral-200
              "
              style={{ borderBottom: "none !important" }}
            >
              <Icon icon="download" className="w-3 h-3 shrink-0" />
              <span className="leading-none">Sample App</span>
            </a>
          )}

          {tertiary && (
            <a
              href={tertiary.url}
              className="
                no_external_icon inline-flex items-center gap-1.5 text-xs font-medium
                !text-black dark:!text-white
                !no-underline !border-0
                transition-colors duration-200
                hover:!text-neutral-700 dark:hover:!text-neutral-200
              "
              style={{ borderBottom: "none !important" }}
            >
              {tertiaryLabel === "Quickstart" ? (
                <Icon icon="play" className="w-3 h-3 shrink-0" />
              ) : (
                <Icon icon="file-lines" className="w-3 h-3 shrink-0" />
              )}
              <span className="leading-none">{tertiaryLabel}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const QuickstartCard = ({ item }) => {
  const title = item?.name ?? "";
  const subtext = item?.subtext ?? "";
  const badge = item?.badge ?? "";
  const date = item?.date ?? "";
  const link = item?.link ?? "";

  const isHttpsLogo = typeof item?.logo === "string" && /^https:\/\//i.test(item.logo);

  const src = isHttpsLogo ? item.logo : `/docs/images/icons/light/${item?.logo}`;
  const srcDark = isHttpsLogo ? item.logo : `/docs/images/icons/dark/${item?.logo}`;

  // Add grayscale class only if https
  const imgClass = "!my-0 w-8 h-8 object-contain shrink-0 " + (isHttpsLogo ? "mint-filter mint-grayscale" : "");

  return (
    <a
      href={link}
      className="
        border-b-0 libraries_card mb-[16px] block
        rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow
        border-gray-200 dark:border-gray-800 dark:bg-black
        !no-underline
      "
    >
      <article>
        <div className="px-4 md:px-5 pt-4 md:pt-5 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3 min-w-0">
              {item?.logo && (
                <>
                  <img noZoom src={src} alt={title} className={`${imgClass} mint-block dark:mint-hidden my-0`} />
                  <img noZoom src={srcDark} alt={title} className={`${imgClass} mint-hidden dark:mint-block my-0`} />
                </>
              )}

              <div className="min-w-0">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate !m-0 leading-snug">
                  {title}
                </h4>
                {!!subtext && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate !m-0 leading-tight">{subtext}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-0.5 shrink-0">
              {!!badge && (
                <span
                  className="
                    inline-flex items-center rounded-full px-1.5 py-[0.5px] text-[10px] font-medium
                    border border-emerald-700 text-emerald-700 bg-emerald-200
                    dark:border-emerald-400 dark:text-emerald-300 dark:bg-emerald-900/30
                  "
                >
                  {badge}
                </span>
              )}
              {!!date && (
                <span className="mr-[5px] text-[10px] text-gray-500 dark:text-gray-400">
                  on {date.replace(/^on\s+/i, "")}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="h-px mx-3 bg-gray-200 dark:bg-gray-800" />

        <div className="px-4 md:px-5 py-3">
          <div className="libraries_cards flex items-center justify-start w-full gap-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium !text-black dark:!text-white">
              <Icon icon="play" className="w-3 h-3 shrink-0" />
              <span className="leading-none">Quickstart</span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
};
