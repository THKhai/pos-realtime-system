export const ENDPOINT_URL = {
    PRODUCTION: {
        BASE: '/products',
        BY_ID: (id: string) => `/products/${id}`,
        BY_CATEGORY: (category: string) => `/products/${category}`,
        SEARCH: `/products/search`,
    },
    CATEGORY: {
        BASE: '/category',
    },
    ORDERS: {
        BASE: '/orders',
        BY_ID: (id: string) => `/orders/${id}`,
    },
} as const;