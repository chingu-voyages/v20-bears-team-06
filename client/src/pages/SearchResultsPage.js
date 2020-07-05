import React from "react";

import SearchResults from "../components/SearchResults";
const SearchResultsPage = (props) => {
  console.log(
    "search results page",
    JSON.stringify(props.location.state.searchTerm)
  );

  return (
    <div className="search-results-page">
      <SearchResults searchTerm={props.location.state.searchTerm} />
    </div>
  );
};

export default SearchResultsPage;
