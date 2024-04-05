import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store';
import { useNavigate } from 'react-router';

const PageWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 90%;
    padding-left: 30px;
    padding-right: 30px;
    width: fit-content;
`;

const SingleProductWrapper = styled.div`
    border: 1px solid lightblue;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ProductImage = styled.img`
    width: 180px;
    height: 180px;
`;

const Price = styled.div`
    text-align: center;
`;

const Button = styled.div`
  padding: 4px 5px;
  border-radius: 8px;
  cursor: pointer;
  background-color: red; /* Change to your desired color */
  width: fit-content;
  margin: auto;
  font-size: 14px;
`;

const AllProductsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px;
    margin-top: 30px;
`;

const PageHeading = styled.span`
    font-size: 24px;
    font-weight: 600;
    margin-left: 70px;
`;

const BackButton = styled.div`
    margin-left: 70px;
    margin-top: 25px;
`;

const TotalCartPriceWrapper = styled.div`
    margin-right: 30px;
`;

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
`;

const NoItemsMessage = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const totalCartPrice = cart.reduce((total, item) => total + item.price, 0);

  if(cart.length === 0) {
    return <NoItemsMessage>No items in cart. Start adding one!</NoItemsMessage>
  }

  return (
    <div>
      <PageHeading>Cart</PageHeading>
      <TopWrapper>
        <BackButton onClick={() => navigate('/')}>Back</BackButton>
        <TotalCartPriceWrapper>Total Cart Value: ${totalCartPrice.toFixed(2)}</TotalCartPriceWrapper>
      </TopWrapper>
    <AllProductsWrapper>
      <PageWrapper>
        {cart.map(item => (
            <SingleProductWrapper key={item.id}>
                <ProductImage src={item.image} alt="#" />
                <Price>Price: {item.price}</Price>
                <Button onClick={() => handleRemoveFromCart(item)}>Remove</Button>
            </SingleProductWrapper>
        ))}
      </PageWrapper>
    </AllProductsWrapper>
    </div>
  );
};

export default Cart;
