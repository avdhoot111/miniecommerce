import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store';

const ProductImage = styled.img`
    width: 180px;
    height: 180px;
`;

const SingleProductWrapper = styled.div`
    border: 1px solid lightblue;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const AllProductsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px;
    margin-top: 30px;
`;

const Price = styled.div`
    text-align: center;
`;

const PageInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const PageHeading = styled.span`
    font-size: 24px;
    font-weight: 600;
    margin-left: 70px;
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;    
    width: 90%;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
    margin-right: 50px;
`;

const Button = styled.div`
    padding: 4px 5px;
    border-radius: 8px;
    cursor: ${({ isInCart }) => isInCart ? 'not-allowed' : 'pointer'};
    pointer-events: ${({ isInCart }) => isInCart ? 'none' : ''};
    background-color: ${({ isInCart }) => isInCart ? 'lightgrey' : 'orange'};
    width: fit-content;
    margin: auto;
    font-size: 14px;
`;

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    console.log(cart);

    useEffect(() => {
        setLoading(true);
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {setAllProducts(data)})
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const isProductInCart = (productId) => {
        return cart.some(item => item.id === productId);
      };

    const sortProducts = () => {
        if (sortBy === 'lowToHigh') {
            return [...allProducts].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highToLow') {
            return [...allProducts].sort((a, b) => b.price - a.price);
        } else {
            return allProducts;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <PageWrapper>
            <AllProductsWrapper>
                <PageInfoWrapper>
                    <PageHeading>All Products</PageHeading>
                    <SelectWrapper>
                        <select value={sortBy} onChange={handleSortChange}>
                            <option value="">Sort by Price</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </SelectWrapper>
                </PageInfoWrapper>
                {sortProducts().map((product) => (
                    <SingleProductWrapper key={product.id}>
                        <ProductImage src={product.image} alt="#" />
                        <Price>Price: {product.price}$</Price>
                        <Button
                            onClick={() => handleAddToCart(product)}
                            isInCart={isProductInCart(product.id)}
                        >{isProductInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</Button>
                    </SingleProductWrapper>
                ))}
            </AllProductsWrapper>
        </PageWrapper>
    );
};

export default AllProducts;