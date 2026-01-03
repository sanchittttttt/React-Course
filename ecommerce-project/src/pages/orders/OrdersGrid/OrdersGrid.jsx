import { Fragment } from 'react';
import { ProductDetails } from '../ProductDetails.jsx';
import { OrdersHeader } from './OrderHeader.jsx';
import { OrdersDetailsGrid } from './OrdersDetailsGrid.jsx';

export function OrdersGrid({orders}) {
    return (
        <div className="orders-grid">
            {orders.map((order) => (
                <div key={order.id} className="order-container">
                    {/* ORDER HEADER */}
                    <OrdersHeader order={order} />

                    {/* ORDER PRODUCTS */}
                    <OrdersDetailsGrid order={order} />
                </div>
            ))}
        </div>
    );
}