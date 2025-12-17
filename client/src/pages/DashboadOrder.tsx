/*
* Node module
* */
import {useState} from "react";

/*
* Components
* */
import {Card} from "@/components/ui/card.tsx";
import {Receipt,Clock} from "lucide-react";

/*
* Type
*/
import type {Order} from "@/featutres/cart/types/cart.types.tsx";

const DashboadOrder = () => {
    //Declare use
    const[orders]  = useState<Order[]>([]);

    // format the time
    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN")
    }
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Màn hình theo dõi đơn hàng</h1>
                    <p className="text-muted-foreground">Cập nhật tự động mỗi 2 giây</p>
                </div>

                {orders.length === 0 ? (
                    <Card className="p-12">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Receipt className="h-16 w-16 mb-4 opacity-50" />
                            <p className="text-lg">Chưa có đơn hàng nào</p>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="p-5 hover:border-primary transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Receipt className="h-4 w-4 text-primary" />
                                            <span className="font-mono text-sm font-semibold">{order.id}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {formatTime(order.createdAt)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground mb-1">{formatDate(order.createdAt)}</div>
                                        <div className="text-xl font-bold text-primary">{order.total.toLocaleString("vi-VN")}đ</div>
                                    </div>
                                </div>

                                <div className="space-y-2 border-t pt-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.product.name}
                      </span>
                                            <span className="font-medium">
                        {(item.product.price * item.quantity).toLocaleString("vi-VN")}đ
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboadOrder;