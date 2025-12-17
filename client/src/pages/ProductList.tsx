/*
* Node module
* */
import {useState} from "react";
/*
* Components
* */
import {toast} from "sonner";
import {Input} from "../components/ui/input.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Search,ShoppingCart,CreditCard} from "lucide-react";
import ProductCard from "../components/ProductCard.tsx";
import seed_data from "../data/seed_data.tsx";
import CartItem from "@/components/CartItem.tsx";
/*
* Services
* */
import {orderApi} from "@/featutres/cart/api/orderApi.ts";
/*
* Type
* */
import type {Product} from "../featutres/products/types/product.types.tsx";
import type {CartItem as CartItemType} from "../featutres/cart/types/cart.types.tsx";


const ProductList = () => {
    //Declare use
    const [searchQuery, setSearchQuery] = useState("")
    const [cart, setCart] = useState<CartItemType[]>([])


    // filtering the searching product
    const filteredProducts = seed_data.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

    //Add product into cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product.id === product.id)

            if (existingItem) {
                return prevCart.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                )
            }

            return [...prevCart, { product, quantity: 1 }]
        })
    }
    // Update the quantity of a product
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1)
        {
            removeFromCart(productId);
            return
        }
        setCart(
            (prevCart) => prevCart.map(
            (item) => (item.product.id === productId) ? { ...item, quantity } : item
        ))
    }

    // Remove product from cart
    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
    }

    // The total price
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    //Payment
    const handleCheckout = async () => {
        if (cart.length === 0) {
            toast.info("Giỏ hàng trống")
            return
        }

        try {
            // Show loading toast
            toast.loading("Đang xử lý đơn hàng...")

            // Create order using orderApi (API call)
            const newOrder = await orderApi.createOrder(cart)

            // Clear cart after successful order
            setCart([])

            // Dismiss loading and show success
            toast.dismiss()
            toast.success(`Đơn hàng ${newOrder.id} đã được tạo thành công!`, {
                description: `Tổng tiền: ${newOrder.total.toLocaleString("vi-VN")}đ`,
            })

            console.log("Order created:", newOrder)
        } catch (error) {
            toast.dismiss()
            toast.error("Có lỗi xảy ra khi tạo đơn hàng")
            console.error("Error creating order:", error)
        }
    }

    //
    return (
        <div className="h-screen flex flex-col lg:flex-row">
            {/* Danh sách sản phẩm */}
            <div className="flex-1 flex flex-col">
                <div className="border-b bg-card p-4">
                    <h1 className="text-2xl font-bold mb    -4">Màn hình bán hàng</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onAdd={addToCart} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Giỏ hàng */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l bg-card flex flex-col">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-2">
                        {/*<ShoppingCart className="h-5 w-5" />*/}
                        <h2 className="text-lg font-semibold">Giỏ hàng</h2>
                        {/*<span className="ml-auto text-sm text-muted-foreground">{cart.length} sản phẩm</span>*/}
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-2">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <ShoppingCart className="h-12 w-12 mb-2 opacity-50" />
                            <p className="text-sm">Giỏ hàng trống</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartItem key={item.product.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
                        ))
                    )}
                </div>

                <div className="p-4 border-t space-y-4">
                    <Card className="p-4 bg-muted">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Tổng cộng:</span>
                            <span className="text-2xl font-bold text-primary">{total.toLocaleString("vi-VN")}đ</span>
                        </div>
                    </Card>
                    <Button onClick={handleCheckout} disabled={cart.length === 0} className="w-full h-12 text-base" size="lg">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;