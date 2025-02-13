import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesandMutations"; // Your query hook
var Home = function () {
    var _a = useGetRecentPosts(), posts = _a.data, isPostLoading = _a.isPending, isErrorPosts = _a.isError;
    return (_jsx("div", { className: "flex flex-1", children: _jsx("div", { className: "home-container", children: _jsxs("div", { className: "home-posts", children: [_jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Home Feed" }), isPostLoading && !posts ? (_jsx(Loader, {})) : (_jsx("ul", { className: "flex flex-1 flex-col gap-9 w-full", children: posts === null || posts === void 0 ? void 0 : posts.documents.map(function (post) { return (_jsx(PostCard, { post: post }, post.$id)); }) }))] }) }) }));
};
export default Home;
