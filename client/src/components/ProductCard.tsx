import {Card} from "./ui/card.tsx";
import {Button} from "./ui/button.tsx";
import type {Product} from "../featutres/products/types/product.types.tsx";
import { Plus } from "lucide-react"

interface ProductCardProps {
    product: Product
    onAdd: (product: Product) => void
}

const ProductCard = ({product,onAdd}:ProductCardProps) => {
    return (
        <Card className="p-4 hover:border-primary transition-colors cursor-pointer group">
            <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
                <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="space-y-2">
                <h3 className="font-medium text-sm">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">{product.price.toLocaleString("vi-VN")}đ</span>
                    <Button  onClick={() => onAdd(product)} className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;