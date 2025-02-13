import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queriesandMutations';
import { multiFormatDateString } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';
var PostDetails = function () {
    var _a, _b, _c;
    var id = useParams().id;
    var _d = useGetPostById(id || ''), post = _d.data, isPending = _d.isPending;
    var user = useUserContext().user;
    var handleDeletePost = function () {
    };
    return (_jsx("div", { className: 'post_details-container w-full', children: isPending ? _jsx(Loader, {}) : (_jsxs("div", { className: 'post_details-info w-full', children: [_jsx("img", { src: post === null || post === void 0 ? void 0 : post.imageUrl, alt: 'post', className: 'post_details-img' }), _jsxs("div", { className: 'flex-between w-full flex-col gap-3', children: [_jsxs("div", { className: "flex items-center gap-3 w-full", children: [_jsxs(Link, { to: "/profile/".concat(((_a = post.creater) === null || _a === void 0 ? void 0 : _a.id) || "#"), className: 'flex items-center gap-3', children: [_jsx("img", { src: ((_b = post.creater) === null || _b === void 0 ? void 0 : _b.imageUrl) || "/assets/icons/profile-placeholder.svg", alt: "creator", className: "rounded-full w-12 lg:h-12" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "base-medium lg:body-bold text-light-1", children: (_c = post.creater) === null || _c === void 0 ? void 0 : _c.name }), _jsxs("div", { className: "flex-center gap-2 text-light-3", children: [_jsx("p", { className: "subtle-semibold lg:small-reguglar", children: multiFormatDateString(post.$createdAt) }), " -", _jsx("p", { className: "subtle-semibold lg:small-regular", children: post.location })] })] })] }), _jsxs("div", { className: 'flex-center', children: [_jsx(Link, { to: "/update-post/".concat(post.$id), children: _jsx("img", { src: '/assets/icons/edit.svg', width: 24, height: 24, alt: 'edit' }) }), _jsx(Button, { onClick: handleDeletePost, variant: 'ghost', className: 'ghost_details-delete_btn', children: _jsx("img", { src: '/assets/icons/delete.svg', alt: 'delete', width: 24, height: 24 }) })] })] }), _jsx("hr", { className: 'border w-full border-dark-4/80' }), _jsxs("div", { className: "flex flex-col flex-1 w-full sm:font-medium ig:base-regular", children: [_jsx("p", { children: post.caption }), _jsx("ul", { className: "flex gap-1 mt-2", children: post.tags.map(function (tag) { return (_jsxs("li", { className: "text-light-3", children: ["#", tag] }, tag)); }) })] }), _jsx("div", { className: 'w-full', children: _jsx(PostStats, { post: post, userId: user.id }) })] })] })) }));
};
export default PostDetails;
