import { jsx as _jsx } from "react/jsx-runtime";
import Loader from "./Loader";
import GridPostList from "./GridPostList";
var SearchResults = function (_a) {
    var isSearchFetching = _a.isSearchFetching, searchedPosts = _a.searchedPosts;
    if (isSearchFetching)
        return _jsx(Loader, {});
    if (searchedPosts && searchedPosts.length > 0) {
        return (_jsx(GridPostList, { posts: searchedPosts }));
    }
    return (_jsx("p", { className: "text-light-4 mt-10 text-center w-full", children: "No Results Found" }));
};
export default SearchResults;
