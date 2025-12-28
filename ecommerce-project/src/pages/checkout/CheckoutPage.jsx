import { CheckoutHeader } from './CheckoutHeader';
import axios from 'axios';
import { OrderSummary } from './order-summary/OrderSummary';
import { useState, useEffect } from "react";
import './CheckoutPage.css';
import { PaymentSummary } from './PaymentSummary';


export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckOutData = async() => {
            let response = 
             await axios
            .get('/api/delivery-options?expand=estimatedDeliveryTime');
             setDeliveryOptions(response.data);

        response = await axios
            .get('/api/payment-summary')
             setPaymentSummary(response.data);
        }
        fetchCheckOutData();
    }, []);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}
