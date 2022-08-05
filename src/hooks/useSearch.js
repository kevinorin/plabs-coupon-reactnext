import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";



/**
 * Common URL-based search state (both local and from URL)
 *
 * Note that a local search string is maintained for user entry, while updates to URL
 *   are only made on user "enter" (performance). However, only the URL search value
 *   should be used in filters (source of truth)!
 */
const useSearch = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const rawUrlSearch = router.query.search ?? "";
  const urlSearch = Array.isArray(rawUrlSearch) ? rawUrlSearch[0] : rawUrlSearch;

  // Determine whether the local search text and URL search are out of sync (useful in UI)
  const unappliedSearch = Boolean((searchText || urlSearch) && searchText !== urlSearch);

  // Update local search text to match URL (since it should not update URL when typing!)
  useEffect(
    () => {
      if (urlSearch !== searchText) {
        setSearchText(urlSearch);
      }
    },
    // NOTE: Only should set search text when the URL changes (not after state updates!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlSearch]
  );

  /** Change handler for search input */
  const handleSearchChange = (event) => {
    const { value } = event.target;

    setSearchText(value);
  };

  /** "Enter" detection handler for search input */
  const handleSearchSubmit = (event) => {
    if (event.key !== "Enter") return;

    router.replace({
      query: {
        ...router.query,
        search: searchText,
      },
    });
  };

  return {
    handleSearchChange,
    handleSearchSubmit,
    searchText,
    setSearchText,
    unappliedSearch,
  };
};

export { useSearch };
