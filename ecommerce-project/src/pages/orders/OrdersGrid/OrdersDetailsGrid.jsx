import { Fragment } from 'react';
import { ProductDetails } from '../ProductDetails.jsx';

export function OrdersDetailsGrid({order}) {
    return (
        <div className="order-details-grid">
            {order.products.map((orderProduct) => (
                <Fragment key={orderProduct.productId}>
                    <div className="product-image-container">
                        <img src={orderProduct.product.image} />
                    </div>

                    <ProductDetails orderProduct={orderProduct} />

                    <div className="product-actions">
                        <a href="/tracking">
                            <button className="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                    </div>
                </Fragment>
            ))}
        </div>
    );
}