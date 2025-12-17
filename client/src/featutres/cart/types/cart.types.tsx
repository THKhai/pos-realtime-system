import type {Product} from '../../products/types/product.types.tsx';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items:CartItem[];
    totalItems: number;
    totalPrice: number;
}

export interface OrderPayload {
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
    totalPrice: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    createdAt: string;
}