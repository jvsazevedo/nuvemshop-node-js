import { TCategory } from "../../lib/category";
import { TProduct } from "../../lib/product";

export function validate(category: TCategory) {
    return !!(category.name.en || category.name.es || category.name.pt);
}

export function validateProduct(product: TProduct) {
    return !!(product.name.en || product.name.es || product.name.pt);
}