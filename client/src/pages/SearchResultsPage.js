import React from "react";

import SearchResults from "../components/SearchResults";
const SearchResultsPage = (props) => {
  let searchTerm = null;
  if (
    props &&
    props.location &&
    props.location.state &&
    props.location.state.searchTerm
  ) {
    searchTerm = props.location.state.searchTerm;
  }

  return (
    <div className="search-results-page">
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

export default SearchResultsPage;
