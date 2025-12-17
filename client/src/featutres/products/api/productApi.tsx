import type {Product} from "../types/product.types.tsx";
import type {ApiResponse} from "@/types/common.types.tsx";
import AxiosClient from "../../../api/axiosClient.tsx";
import {ENDPOINT_URL} from "@/api/endpoints.tsx";
const ProductApi = {
    // GET /api/products
    getALL: async (): Promise<Product[]> => {
      const response = await AxiosClient.get<ApiResponse<Product[]>>(
          ENDPOINT_URL.PRODUCTION.BASE
      );
      return response.data.data ?? [];
    },

    // GET /api/products/:id
    getById: async(id: string): Promise<Product> => {
        const response = await AxiosClient.get<ApiResponse<Product>>(
            ENDPOINT_URL.PRODUCTION.BY_ID(id)
        );
        return response.data.data!;
    },

    // GET /api/products/search?q=keyword
    search: async(): Promise<Product[]> => {
        const response = await AxiosClient.get<ApiResponse<Product[]>>(
            ENDPOINT_URL.PRODUCTION.SEARCH
        );
        return response.data.data ?? [];
    },
    // GET /api/products/category/:category
    getByCategory: async(category: string): Promise<Product[]> => {
        const response = await AxiosClient.get<ApiResponse<Product[]>>(
            ENDPOINT_URL.PRODUCTION.BY_CATEGORY(category)
        );
        return response.data.data ?? [];
    },
};

export default ProductApi;