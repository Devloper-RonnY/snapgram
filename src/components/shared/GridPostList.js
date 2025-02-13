import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
var GridPostList = function (_a) {
    var posts = _a.posts, _b = _a.showUser, showUser = _b === void 0 ? true : _b, _c = _a.showStats, showStats = _c === void 0 ? true : _c;
    var user = useUserContext().user;
    return (_jsx("div", { className: "grid-container", children: posts.map(function (post) {
            var _a;
            return (_jsxs("li", { className: "relative min-w-80 h-80", children: [_jsx(Link, { to: "/posts/".concat(post.$id, "}"), className: "grid-post_link", children: _jsx("img", { src: post.imageUrl, alt: "post", className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "grid-post_user", children: [showUser && (_jsx("div", { className: "flex items-center justify-start gap-2 flex-1", children: _jsx("img", { src: ((_a = post.creater) === null || _a === void 0 ? void 0 : _a.imageUrl) || "/assets/icons/profile-placeholder.svg", alt: "creator", className: "rounded-full w-8 h-8" }) })), showStats && _jsx(PostStats, { post: post, userId: user.id })] })] }, post.$id));
        }) }));
};
export default GridPostList;
