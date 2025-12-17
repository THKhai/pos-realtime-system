import AxiosClient from "@/api/axiosClient"
import { ENDPOINT_URL } from "@/api/endpoints"
import type { Order, CartItem, OrderPayload } from "@/featutres/cart/types/cart.types"
import type { ApiResponse } from "@/types/common.types"

export const orderApi = {
  // Get all orders
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await AxiosClient.get<ApiResponse<Order[]>>(
          ENDPOINT_URL.ORDERS.BASE
      )
      return response.data.data ?? []
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw error
    }
  },

  // Create new order
  createOrder: async (items: CartItem[]): Promise<Order> => {
    try {
      // Transform cart items to OrderPayload format
      const payload: OrderPayload = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      }

      const response = await AxiosClient.post<ApiResponse<Order>>(
        ENDPOINT_URL.ORDERS.BASE,
        payload
      )

      if (!response.data) {
        throw new Error("No data returned from server")
      }

      return response.data.data!;
    } catch (error) {
      console.error("Error creating order:", error)
      throw error
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await AxiosClient.get<ApiResponse<Order>>(
        ENDPOINT_URL.ORDERS.BY_ID(orderId)
      )

      if (!response.data) {
        throw new Error("Order not found")
      }

      return response.data.data!
    } catch (error) {
      console.error("Error fetching order:", error)
      throw error
    }
  },
}
