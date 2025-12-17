/*
* Components
* */
import {Button} from "@/components/ui/button.tsx";
import {Plus,Minus,Trash2} from "lucide-react";
/*
* Types
* */
import type {CartItem as CartItemType} from "@/featutres/cart/types/cart.types.tsx";

interface CartItemProps {
    item: CartItemType
    onUpdateQuantity: (productId: string, quantity: number) => void
    onRemove: (productId: string) => void
}

const CartItem = ({item, onUpdateQuantity,onRemove}:CartItemProps) => {
    return (
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
            <img
                src={item.product.image_url|| "/placeholder.svg"}
                alt={item.product.name}
                className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                <p className="text-primary text-sm font-semibold">{item.product.price.toLocaleString("vi-VN")}đ</p>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="h-7 w-7 p-0"
                >
                    <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="h-7 w-7 p-0"
                >
                    <Plus className="h-3 w-3" />
                </Button>
            </div>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemove(item.product.id)}
                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CartItem;