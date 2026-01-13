import { CheckoutHeader } from './CheckoutHeader';
import axios from 'axios';
import { OrderSummary } from './order-summary/OrderSummary';
import { useState, useEffect } from "react";
import './CheckoutPage.css';
import { PaymentSummary } from './PaymentSummary';


export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    window.axios = axios; // makes axios available in browser console for debugging

    useEffect(() => {
        const fetchCheckOutData = async() => {
            const response = 
             await axios
            .get('/api/delivery-options?expand=estimatedDeliveryTime');
             setDeliveryOptions(response.data);
        };
        fetchCheckOutData();
    }, [cart]);

    useEffect(() => {
        const fetchPaymentSummary = async() => {
            const response = await axios
            .get('/api/payment-summary')
             setPaymentSummary(response.data);
        };
        fetchPaymentSummary();
    },[cart]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
                </div>
            </div>
        </>
    );
}
