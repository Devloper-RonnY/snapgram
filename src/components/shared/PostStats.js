var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDeleteSavedPost, useGetcurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesandMutations";
import { useEffect, useState } from "react";
import { checkIsLiked } from "@/lib/utils";
import Loader from "./Loader";
var PostStats = function (_a) {
    var post = _a.post, userId = _a.userId;
    var likeList = post.likes.map(function (user) { return user.$id; });
    var _b = useState(likeList), likes = _b[0], setLikes = _b[1];
    var _c = useState(false), isSaved = _c[0], setIsSaved = _c[1];
    var likePost = useLikePost().mutate;
    var _d = useSavePost(), savePost = _d.mutate, isSavingPost = _d.isPending;
    var _e = useDeleteSavedPost(), deletSavedPost = _e.mutate, isdeletingSaved = _e.isPending;
    var currentUser = useGetcurrentUser().data;
    var savedPostRecord = currentUser === null || currentUser === void 0 ? void 0 : currentUser.save.find(function (record) { return record.post.$id === post.$id; });
    useEffect(function () {
        setIsSaved(!!savedPostRecord);
    }, [currentUser]);
    var handleLikePost = function (e) {
        e.stopPropagation();
        var newLikes = __spreadArray([], likes, true);
        var hasLiked = newLikes.includes(userId);
        if (hasLiked) {
            newLikes = newLikes.filter(function (id) { return id !== userId; });
        }
        else {
            newLikes.push(userId);
        }
        setLikes(newLikes);
        likePost({ PostId: post.$id, likeArray: newLikes });
    };
    var handleSavePost = function (e) {
        e.stopPropagation();
        if (savedPostRecord) {
            setIsSaved(false);
            deletSavedPost(savedPostRecord.$id);
        }
        else {
            savePost({ postId: post.$id, userId: userId });
            setIsSaved(true);
        }
    };
    return (_jsxs("div", { className: "flex justify-between items-center z-20 ", children: [_jsxs("div", { className: "flex gap-2 mr-5", children: [_jsx("img", { src: checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg" :
                            "/assets/icons/like.svg", alt: "like", height: 20, width: 20, className: "cursor-pointer", onClick: handleLikePost }), _jsx("p", { className: "small-medium lg:base-medium", children: likes.length })] }), _jsx("div", { className: "flex gap-2 ", children: isSavingPost || isdeletingSaved ? _jsx(Loader, {}) : _jsx("img", { src: isSaved
                        ? "/assets/icons/saved.svg"
                        : "/assets/icons/save.svg", alt: "like", height: 20, width: 20, className: "cursor-pointer", onClick: handleSavePost }) })] }));
};
export default PostStats;
