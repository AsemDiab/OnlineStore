"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromArray = deleteFromArray;
function deleteFromArray(key, array) {
    var index = array.indexOf(key, 0);
    if (index > -1) {
        array.splice(index, 1);
    }
}
