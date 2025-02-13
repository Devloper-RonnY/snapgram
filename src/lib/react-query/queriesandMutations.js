import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost } from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";
export var useCreateUserAccount = function () {
    return useMutation({
        mutationFn: function (user) { return createUserAccount(user); }
    });
};
export var useSignInAccount = function () {
    return useMutation({
        mutationFn: function (user) { return signInAccount(user); },
    });
};
export var useSignOutAccount = function () {
    return useMutation({
        mutationFn: signOutAccount
    });
};
export var useCreatePost = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (post) { return createPost(post); }, // This function must exist
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
        },
    });
};
export var useGetRecentPosts = function () {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    });
};
export var useLikePost = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (_a) {
            var PostId = _a.PostId, likeArray = _a.likeArray;
            return likePost(PostId, likeArray);
        },
        onSuccess: function (data) {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data === null || data === void 0 ? void 0 : data.$id]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            });
        }
    });
};
export var useSavePost = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (_a) {
            var postId = _a.postId, userId = _a.userId;
            return savePost(postId, userId);
        },
        onSuccess: function (data) {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            });
        }
    });
};
export var useDeleteSavedPost = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (savedRecordId) { return deleteSavedPost(savedRecordId); },
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            });
        }
    });
};
export var useGetcurrentUser = function () {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    });
};
export var useGetPostById = function (postId) {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: function () { return getPostById(postId); },
        enabled: !!postId
    });
};
export var useUpdatePost = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (post) { return updatePost(post); },
        onSuccess: function (data) {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data === null || data === void 0 ? void 0 : data.$id]
            });
        }
    });
};
export var useDeletePost = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (_a) {
            var postId = _a.postId, imageId = _a.imageId;
            return deletePost(postId, imageId);
        },
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            });
        }
    });
};
export var useGetPosts = function () {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfinitePosts,
        getNextPageParam: function (lastPage) {
            if (lastPage && lastPage.documents.length === 0)
                return null;
            var lastId = lastPage.documents[lastPage.documents.length - 1].$id;
            return lastId;
        }
    });
};
export var useSearchPosts = function (SearchTerm) {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, SearchTerm],
        queryFn: function () {
            console.log('Searching for:', SearchTerm);
            return searchPosts(SearchTerm);
        },
        enabled: !!SearchTerm
    });
};
