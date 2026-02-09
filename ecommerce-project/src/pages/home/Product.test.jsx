import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';//renders components in a fake page for testing
import userEvent from '@testing-library/user-event';//simulates user interactions
import axios from 'axios';//make HTTP requests
import { Product } from './Product';

vi.mock('axios');//mocking axios to prevent real HTTP requests during tests

describe('Product Component', () => {

    let product;

    let loadCart;

    beforeEach(() => { //beforeEach is a test hook along with beforeAll, afterEach, afterAll
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        loadCart = vi.fn();//mock function to simulate loading cart
    });

    it('displays product details correctly', () => {
        render(<Product product={product} loadCart={loadCart} />);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument(); //check if product name is displayed

        expect(screen.getByText('$10.90')).toBeInTheDocument(); //check if price is displayed

        expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg'); //check if image is displayed with correct src

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png'); //check if rating stars image is displayed with correct src

        expect(
            screen.getByText('87')
        ).toBeInTheDocument(); //check if rating count is displayed
    });

    it('adds aproduct in the cart', async () => {

        render(<Product product={product} loadCart={loadCart} />);

        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1
            }
        );

        expect(loadCart).toHaveBeenCalled();
    });

    it('Selects quantity correctly', async () => {
        render(<Product product={product} loadCart={loadCart} />);

        const quantitySelector = screen.getByTestId('product-quantity-select');

        expect(
            quantitySelector
        ).toHaveValue('1');
    });

});