import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    CheckCircle, 
    Package, 
    Truck, 
    Flag, 
    RefreshCcw 
} from 'lucide-react';

// Mock data - replace with actual API call
const initialOrders = [
    {
        id: '001',
        date: '02 Feb, 2025',
        status: 'delivering',
        address: 'Calle Principal 123',
        total: 99.97,
        products: [
            { name: 'Producto 1', quantity: 2, price: 24.99 },
            { name: 'Producto 2', quantity: 1, price: 49.99 }
        ]
    },
    {
        id: '002',
        date: '02 Feb, 2025',
        status: 'preparing',
        address: 'Av. Segunda 456',
        total: 149.96,
        products: [
            { name: 'Producto 3', quantity: 3, price: 29.99 },
            { name: 'Producto 4', quantity: 1, price: 59.99 }
        ]
    }
];

// Status mapping for better readability and styling
const statusConfig = {
    accepted: { 
        label: 'Aceptado', 
        icon: CheckCircle, 
        badgeVariant: 'default',
        progress: 25
    },
    preparing: { 
        label: 'Preparando', 
        icon: Package, 
        badgeVariant: 'secondary',
        progress: 50
    },
    delivering: { 
        label: 'En Camino', 
        icon: Truck, 
        badgeVariant: 'outline',
        progress: 75
    },
    delivered: { 
        label: 'Entregado', 
        icon: Flag, 
        badgeVariant: 'success',
        progress: 100
    }
};

const OrderTrackingDashboard = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [filter, setFilter] = useState('all');

    // Filter orders based on status
    const filteredOrders = filter === 'all' 
        ? orders 
        : orders.filter(order => order.status === filter);

    const renderOrderTimeline = (status) => {
        const steps = ['accepted', 'preparing', 'delivering', 'delivered'];
        const currentStepIndex = steps.indexOf(status);

        return (
            <div className="relative flex justify-between items-center my-6">
                {/* Background timeline */}
                <div className="absolute inset-x-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2"></div>
                
                {/* Progress line */}
                <div 
                    className="absolute inset-x-0 h-1 bg-primary top-1/2 transform -translate-y-1/2" 
                    style={{ width: `${statusConfig[status].progress}%` }}
                ></div>

                {steps.map((step, index) => {
                    const StepIcon = statusConfig[step].icon;
                    const isCompleted = index <= currentStepIndex;
                    const isActive = index === currentStepIndex;

                    return (
                        <div key={step} className="relative z-10 flex flex-col items-center">
                            <div className={`
                                w-10 h-10 rounded-full border-2 flex items-center justify-center
                                ${isCompleted ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300'}
                                ${isActive ? 'animate-pulse' : ''}
                            `}>
                                <StepIcon className="w-5 h-5" />
                            </div>
                            <span className="text-xs text-gray-600 mt-2">
                                {statusConfig[step].label}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderStatusBadge = (status) => {
        const config = statusConfig[status];
        return (
            <Badge variant={config.badgeVariant} className="flex items-center gap-2">
                <config.icon className="w-4 h-4" />
                {config.label}
            </Badge>
        );
    };

    const refreshOrders = () => {
        // Placeholder for actual API call to refresh orders
        console.log('Refreshing orders...');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {[
                    { value: 'all', label: 'Todos' },
                    { value: 'preparing', label: 'Preparando' },
                    { value: 'delivering', label: 'En Camino' },
                    { value: 'delivered', label: 'Entregados' }
                ].map((filterOption) => (
                    <Button
                        key={filterOption.value}
                        variant={filter === filterOption.value ? 'default' : 'outline'}
                        onClick={() => setFilter(filterOption.value)}
                    >
                        {filterOption.label}
                    </Button>
                ))}
            </div>

            {/* Orders Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map(order => (
                    <Card key={order.id} className="hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>Pedido #{order.id}</CardTitle>
                            <span className="text-sm text-gray-500">{order.date}</span>
                        </CardHeader>
                        <CardContent>
                            {/* Order Timeline */}
                            {renderOrderTimeline(order.status)}

                            {/* Order Details */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>Estado:</span>
                                    {renderStatusBadge(order.status)}
                                </div>

                                {/* Product List */}
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    {order.products.map(product => (
                                        <div 
                                            key={product.name} 
                                            className="flex justify-between text-sm py-1"
                                        >
                                            <span>{product.name}</span>
                                            <span>{product.quantity} x ${product.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery Address */}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Dirección:</span>
                                    <span className="font-medium">{order.address}</span>
                                </div>

                                {/* Total */}
                                <div className="text-right text-lg font-bold text-primary">
                                    Total: ${order.total.toFixed(2)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Refresh Button */}
            <Button 
                onClick={refreshOrders} 
                className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0"
            >
                <RefreshCcw className="w-6 h-6" />
            </Button>
        </div>
    );
};

export default OrderTrackingDashboard;