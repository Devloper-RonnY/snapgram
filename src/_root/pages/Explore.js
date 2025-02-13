import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesandMutations';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
var Explore = function () {
    var _a = useInView(), ref = _a.ref, InView = _a.InView;
    var _b = useGetPosts(), posts = _b.data, fetchNextPage = _b.fetchNextPage, hasNextPage = _b.hasNextPage;
    var _c = useState(''), searchValue = _c[0], setSearchValue = _c[1];
    var debounceValue = useDebounce(searchValue, 500);
    var _d = useSearchPosts(debounceValue), searchPosts = _d.data, isSearchFetching = _d.isFetching;
    useEffect(function () {
        if (InView && !searchValue)
            fetchNextPage();
    }, [InView, searchValue]);
    if (!posts) {
        return (_jsx("div", { className: 'flex-center w-full h-full', children: _jsx(Loader, {}) }));
    }
    var shouldSearchResults = searchValue !== "";
    var shouldShowPosts = !shouldSearchResults && posts.pages.every(function (item) { return item.documents.length === 0; });
    return (_jsxs("div", { className: 'explore-container', children: [_jsxs("div", { className: 'explore-inner_container', children: [_jsx("h2", { className: 'h-bold md:h2-bold w-full', children: "Search Posts" }), _jsxs("div", { className: 'flex gap-1 px-4 w-full rounded-lg bg-dark-4', children: [_jsx("img", { src: '/assets/icons/search.svg', width: 24, height: 24, alt: 'search' }), _jsx(Input, { type: "text", placeholder: 'search', className: 'explore-search', value: searchValue, onChange: function (e) { return setSearchValue(e.target.value); } })] })] }), _jsxs("div", { className: 'flex-between w-full max-w-5xl mt-16 mb-7', children: [_jsx("h2", { className: 'body-bold md:h3-bold', children: "Popular Today" }), _jsxs("div", { className: 'flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer', children: [_jsx("p", { className: 'small-medium md:base-medium text-light-2', children: "All" }), _jsx("img", { src: '/assets/icons/filter.svg', width: 20, height: 20, alt: 'filter' })] })] }), _jsx("div", { className: 'flex flex-wrap gap-9 w-full max-w-5xl', children: shouldSearchResults ? (_jsx(SearchResults, { isDearFetching: isSearchFetching, searchedPosts: searchPosts })) : shouldShowPosts ? (_jsx("p", { className: 'text-light-4 mt-10 text-center w-full', children: "End of posts" })) : posts.pages.map(function (item, index) { return (_jsx(GridPostList, { posts: item.documents }, "".concat(index))); }) }), hasNextPage && !searchValue && (_jsx("div", { ref: ref, className: 'mt-10', children: _jsx(Loader, {}) }))] }));
};
export default Explore;
