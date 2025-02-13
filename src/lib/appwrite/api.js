var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatar, database, storage } from "./config";
export function createUserAccount(user) {
    return __awaiter(this, void 0, void 0, function () {
        var newAccount, avatarUrl, newUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, account.create(ID.unique(), user.email, user.password, user.name)];
                case 1:
                    newAccount = _a.sent();
                    if (!newAccount)
                        throw new Error("Account creation failed");
                    avatarUrl = avatar.getInitials(user.name);
                    return [4 /*yield*/, saveUserToDB({
                            accountId: newAccount.$id,
                            name: newAccount.name,
                            email: newAccount.email,
                            username: user.username,
                            imageUrl: avatarUrl,
                        })];
                case 2:
                    newUser = _a.sent();
                    return [2 /*return*/, newUser];
                case 3:
                    error_1 = _a.sent();
                    console.error("❌ Error creating user account:", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function saveUserToDB(user) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), user)];
                case 1:
                    newUser = _a.sent();
                    return [2 /*return*/, newUser];
                case 2:
                    error_2 = _a.sent();
                    console.error("❌ Error saving user to database:", error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function signInAccount(user) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3, session, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, account.deleteSession("current")];
                case 2:
                    _a.sent();
                    console.log("🔄 Previous session cleared.");
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.warn("⚠️ No active session found or failed to clear session.");
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, account.createEmailPasswordSession(user.email, user.password)];
                case 5:
                    session = _a.sent();
                    if (!session)
                        throw new Error("❌ Login failed. Invalid credentials.");
                    console.log("✅ User signed in successfully:", session);
                    return [2 /*return*/, session];
                case 6:
                    error_4 = _a.sent();
                    console.error("❌ Error signing in:", error_4);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function getAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var sessions, currentAccount, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, account.listSessions()];
                case 1:
                    sessions = _a.sent();
                    if (sessions.sessions.length === 0) {
                        console.warn("⚠️ No active session found.");
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, account.get()];
                case 2:
                    currentAccount = _a.sent();
                    return [2 /*return*/, currentAccount];
                case 3:
                    error_5 = _a.sent();
                    console.error("❌ Error getting account:", error_5);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function getCurrentUser() {
    return __awaiter(this, void 0, void 0, function () {
        var currentAccount, currentUser, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("Fetching current account...");
                    return [4 /*yield*/, getAccount()];
                case 1:
                    currentAccount = _a.sent();
                    if (!currentAccount) {
                        console.warn("⚠️ No authenticated user found.");
                        return [2 /*return*/, null];
                    }
                    console.log("Current account:", currentAccount);
                    console.log("Querying database for user...");
                    return [4 /*yield*/, database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal("accountId", currentAccount.$id)])];
                case 2:
                    currentUser = _a.sent();
                    console.log("Database query result:", currentUser);
                    if (!currentUser.documents.length) {
                        console.warn("⚠️ User not found in database.");
                        return [2 /*return*/, null];
                    }
                    console.log("Authenticated user data:", currentUser.documents[0]);
                    return [2 /*return*/, currentUser.documents[0]];
                case 3:
                    error_6 = _a.sent();
                    console.error("❌ Error getting current user:", error_6);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function signOutAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, account.deleteSession("current")];
                case 1:
                    _a.sent();
                    console.log("✅ User signed out successfully.");
                    return [2 /*return*/, true];
                case 2:
                    error_7 = _a.sent();
                    console.error("❌ Error signing out:", error_7);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function createPost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadedFile, fileUrl, tags, newPost, error_8;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    if (!post.creater)
                        throw new Error("Creator (user ID) is required!");
                    return [4 /*yield*/, uploadFile(post.file[0])];
                case 1:
                    uploadedFile = _b.sent();
                    if (!uploadedFile)
                        throw new Error("File upload failed!");
                    fileUrl = getFilePreview(uploadedFile.$id);
                    if (!!fileUrl) return [3 /*break*/, 3];
                    return [4 /*yield*/, deleteFile(uploadedFile.$id)];
                case 2:
                    _b.sent();
                    throw new Error("Failed to generate file preview!");
                case 3:
                    tags = ((_a = post.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return tag.trim(); })) || [];
                    return [4 /*yield*/, database.createDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, ID.unique(), {
                            creater: post.creater, // Must be a valid document ID from Users collection
                            caption: post.caption,
                            imageUrl: fileUrl,
                            imageId: uploadedFile.$id,
                            location: post.location,
                            tags: tags,
                        })];
                case 4:
                    newPost = _b.sent();
                    if (!!newPost) return [3 /*break*/, 6];
                    return [4 /*yield*/, deleteFile(uploadedFile.$id)];
                case 5:
                    _b.sent();
                    throw new Error("Failed to create post!");
                case 6: return [2 /*return*/, newPost];
                case 7:
                    error_8 = _b.sent();
                    console.error("❌ Error creating post:", error_8);
                    throw error_8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function getRecentPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.listDocuments(appwriteConfig.databaseId, // Your database ID
                        appwriteConfig.postCollectionId, // Your collection ID for posts
                        [
                            Query.orderDesc("$createdAt"), // Order by creation time, descending
                            Query.limit(20) // Limit the results to the 20 most recent posts
                        ])];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, posts];
                case 2:
                    error_9 = _a.sent();
                    console.error("❌ Error fetching posts:", error_9);
                    throw error_9;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadedFile, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, storage.createFile(appwriteConfig.storageId, ID.unique(), file)];
                case 1:
                    uploadedFile = _a.sent();
                    return [2 /*return*/, uploadedFile];
                case 2:
                    error_10 = _a.sent();
                    console.error("❌ Error uploading file:", error_10);
                    throw error_10;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function getFilePreview(fileId) {
    return __awaiter(this, void 0, void 0, function () {
        var fileUrl;
        return __generator(this, function (_a) {
            try {
                fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000);
                return [2 /*return*/, fileUrl];
            }
            catch (error) {
                console.error("❌ Error previewingFile post:", error);
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
export function deleteFile(fileId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, storage.deleteFile(appwriteConfig.storageId, fileId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { status: 'OK' }];
                case 2:
                    error_11 = _a.sent();
                    console.error("❌ Error creating post:", error_11);
                    throw error_11;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function likePost(postId, likeArray) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedPost, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.updateDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId, {
                            likes: likeArray
                        })];
                case 1:
                    updatedPost = _a.sent();
                    if (!updatedPost)
                        throw Error;
                    return [2 /*return*/, updatedPost];
                case 2:
                    error_12 = _a.sent();
                    console.error("❌ Error creating post:", error_12);
                    throw error_12;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function savePost(postId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedPost, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.createDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, ID.unique(), {
                            user: userId,
                            post: postId
                        })];
                case 1:
                    updatedPost = _a.sent();
                    if (!updatedPost)
                        throw Error;
                    return [2 /*return*/, updatedPost];
                case 2:
                    error_13 = _a.sent();
                    console.error("❌ Error creating post:", error_13);
                    throw error_13;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function deleteSavedPost(savedRecordId) {
    return __awaiter(this, void 0, void 0, function () {
        var statusCode, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.deleteDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, savedRecordId)];
                case 1:
                    statusCode = _a.sent();
                    if (!statusCode)
                        throw Error;
                    return [2 /*return*/, { status: 'Ok' }];
                case 2:
                    error_14 = _a.sent();
                    console.error("❌ Error creating post:", error_14);
                    throw error_14;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function getPostById(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var post, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.getDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
                case 2:
                    error_15 = _a.sent();
                    console.log(error_15);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function updatePost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var hasFileToUpdate, image, uploadedFile, fileUrl, tags, updatedPost, error_16;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    hasFileToUpdate = post.file.length > 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    image = {
                        imageUrl: post.imageUrl,
                        imageId: post.imageId
                    };
                    if (!hasFileToUpdate) return [3 /*break*/, 6];
                    return [4 /*yield*/, uploadFile(post.file[0])];
                case 2:
                    uploadedFile = _b.sent();
                    if (!uploadedFile)
                        throw new Error("File upload failed!");
                    return [4 /*yield*/, getFilePreview(uploadedFile.$id)];
                case 3:
                    fileUrl = _b.sent();
                    if (!!fileUrl) return [3 /*break*/, 5];
                    return [4 /*yield*/, deleteFile(uploadedFile.$id)];
                case 4:
                    _b.sent();
                    throw new Error("Failed to generate file preview!");
                case 5:
                    image = __assign(__assign({}, image), { imageUrl: fileUrl, imageId: uploadedFile.$id });
                    _b.label = 6;
                case 6:
                    tags = Array.isArray(post.tags)
                        ? post.tags.map(function (tag) { return tag.trim(); }) // If it's an array, trim each tag
                        : ((_a = post.tags) === null || _a === void 0 ? void 0 : _a.replace(/ /g, '').split(',').map(function (tag) { return tag.trim(); })) || [];
                    return [4 /*yield*/, database.updateDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, post.postId, {
                            caption: post.caption,
                            imageUrl: image.imageUrl,
                            imageId: image.imageId,
                            location: post.location,
                            tags: tags, // Pass the processed tags as a simple array of strings
                        })];
                case 7:
                    updatedPost = _b.sent();
                    if (!!updatedPost) return [3 /*break*/, 9];
                    return [4 /*yield*/, deleteFile(post.imageId)];
                case 8:
                    _b.sent(); // Clean up the original file if update fails
                    throw new Error("Failed to update post!");
                case 9: return [2 /*return*/, updatedPost];
                case 10:
                    error_16 = _b.sent();
                    console.error("❌ Error updating post:", error_16);
                    throw error_16;
                case 11: return [2 /*return*/];
            }
        });
    });
}
export function deletePost(postId, imageId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!postId || !imageId)
                        throw Error;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, database.deleteDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_17 = _a.sent();
                    console.log(error_17);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function getInfinitePosts(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var queries, posts, error_18;
        var pageParam = _b.pageParam;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    queries = [Query.orderDesc("$updatedAt"), Query.limit(10)];
                    if (pageParam) {
                        queries.push(Query.cursorAfter(pageParam.toString()));
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, database.listDocuments(appwriteConfig.databaseId, appwriteConfig.postCollectionId, queries)];
                case 2:
                    posts = _c.sent();
                    if (!posts)
                        throw Error;
                    return [2 /*return*/, posts];
                case 3:
                    error_18 = _c.sent();
                    console.log(error_18);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function searchPosts(searchTerm) {
    return __awaiter(this, void 0, void 0, function () {
        var posts, error_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.listDocuments(appwriteConfig.databaseId, appwriteConfig.postCollectionId, [Query.search('caption', searchTerm)])];
                case 1:
                    posts = _a.sent();
                    if (!posts)
                        throw Error;
                    return [2 /*return*/, posts];
                case 2:
                    error_19 = _a.sent();
                    console.log(error_19);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
