import { ProductDTO } from "./product.dto";

export interface CartItemDTO {
    product: ProductDTO;
    amount: number;
}
