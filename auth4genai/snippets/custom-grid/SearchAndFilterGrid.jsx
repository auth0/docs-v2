import { useState, useMemo, useRef, useEffect } from "react";
import { CustomCard } from "/snippets/custom-grid/CustomCard.jsx";

export const SearchAndFilterGrid = ({ items = [], filters = [] }) => {
  const fuzzySearch = (needle, haystack) => {
    if (!needle || !haystack) return false;
    const needleLower = needle.toLowerCase();
    const haystackLower = haystack.toLowerCase();
    return haystackLower.includes(needleLower);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  const filterButtonsRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (!filterButtonsRef.current || !indicatorRef.current) return;

    const activeButton = filterButtonsRef.current.querySelector(
      ".custom-grid-filter-button.active"
    );
    const container = filterButtonsRef.current;
    const indicator = indicatorRef.current;

    if (activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left - 2;
      const width = buttonRect.width;

      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = "1";
    }
  }, [filter]);

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) => {
        return (
          fuzzySearch(searchTerm, item.title) ||
          fuzzySearch(searchTerm, item.description)
        );
      });
    }

    if (filter) {
      filtered = filtered.filter((item) => item.type === filter);
    }

    return filtered;
  }, [searchTerm, filter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (a.status === "Available" && b.status === "Coming Soon") return -1;
      if (a.status === "Coming Soon" && b.status === "Available") return 1;
      return a.title.localeCompare(b.title);
    });
  }, [filteredItems]);

  return (
    <div className="custom-grid-container">
      <div className="custom-grid-search-container">
        <div className="custom-grid-search-filter-wrapper">
          <div className="custom-grid-search-input-wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="custom-grid-search-input"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="custom-grid-search-icon"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="custom-grid-filter-buttons-wrapper">
            <div className="custom-grid-filter-buttons" ref={filterButtonsRef}>
              <button
                onClick={() => setFilter(null)}
                className={`custom-grid-filter-button ${
                  filter === null ? "active" : ""
                }`}
              >
                All
              </button>
              {filters.map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`custom-grid-filter-button ${
                    filter === filterOption ? "active" : ""
                  }`}
                >
                  {filterOption}
                </button>
              ))}
              <span
                ref={indicatorRef}
                className="custom-grid-filter-buttons-indicator"
              />
            </div>
          </div>
        </div>
      </div>

      <Columns cols={2}>
        {sortedItems.map((item) => (
          <CustomCard item={item} key={item.id} />
        ))}
      </Columns>

      {sortedItems.length === 0 && (
        <div className="custom-grid-no-results">
          <div className="custom-grid-no-results-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="sc-cpUzJl"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2a8 8 0 104.87 14.348l5.423 5.423 1.414-1.415-5.415-5.415A8 8 0 0010 2zm-6 8a6 6 0 1112 0 6 6 0 01-12 0z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h3 className="custom-grid-no-results-title">No results found</h3>
          <p className="custom-grid-no-results-text">
            {searchTerm ? `No results for "${searchTerm}". ` : ""}Try adjusting
            your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};
