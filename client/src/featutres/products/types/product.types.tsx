export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string;
    // description: string;
    // inStock: boolean;
}

export type ProductCategory = 'Đồ uống' | 'Đồ ăn';

export interface ProductFilters{
    search?: string;
    category?: ProductCategory;
}