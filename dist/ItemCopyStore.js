"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCopyStore = void 0;
class ItemCopyStore {
    constructor(id = 0) {
        this.productId = id;
    }
    isAvalible() {
        return true;
    }
}
exports.ItemCopyStore = ItemCopyStore;
