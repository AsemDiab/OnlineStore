import { Product } from "../Product";
import { StorageMap, StorageItem } from "../types/Inventory.types";

export function setQuantity(
  storage: StorageMap,
  product: Product,
  qty: number,
): boolean {
  if (qty === 0) {
    storage.delete(product.id);
  } else {
    storage.set(product.id, { product, qty });
  }
  return true;
}
export function getQuantity(storage: StorageMap, product: Product): number {
  return storage.get(product.id)?.qty ?? 0;
}

export function storageContent(
  storage: StorageMap,
): { product: Product; qty: number }[] {
  return Array.from(storage).map(([Id, record]) => {
    return record;
  });
}
export function clear(storage: StorageMap): void {
  storage.clear();
}
export function getItem(storage: StorageMap, id: number): Product | null {
  return storage.get(id)?.product ?? null;
}
