import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
export function formatDateString(dateString) {
    var options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    var date = new Date(dateString);
    var formattedDate = date.toLocaleDateString("en-US", options);
    var time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
    return "".concat(formattedDate, " at ").concat(time);
}
export var multiFormatDateString = function (timestamp) {
    if (timestamp === void 0) { timestamp = ""; }
    var date = new Date(timestamp); // Directly using timestamp without unnecessary conversion
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    var diffInSeconds = diff / 1000;
    var diffInMinutes = diffInSeconds / 60;
    var diffInHours = diffInMinutes / 60;
    var diffInDays = diffInHours / 24;
    // Now use Math.floor only when necessary for days, hours, and minutes
    if (diffInDays >= 30) {
        return formatDateString(timestamp); // More than 30 days, show full date
    }
    else if (diffInDays >= 1) {
        return "".concat(Math.floor(diffInDays), " day").concat(Math.floor(diffInDays) > 1 ? 's' : '', " ago"); // Handle singular and plural
    }
    else if (diffInHours >= 1) {
        return "".concat(Math.floor(diffInHours), " hour").concat(Math.floor(diffInHours) > 1 ? 's' : '', " ago"); // Handle singular and plural
    }
    else if (diffInMinutes >= 1) {
        return "".concat(Math.floor(diffInMinutes), " minute").concat(Math.floor(diffInMinutes) > 1 ? 's' : '', " ago"); // Handle singular and plural
    }
    else {
        return "Just now";
    }
};
export var checkIsLiked = function (likeList, userId) {
    return likeList.includes(userId);
};
