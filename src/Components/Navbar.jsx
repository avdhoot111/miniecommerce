import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%
`;

const StoreName = styled.div`
    margin-left: 20px;
    margin-top: 14px;
`;

const NavigationMenus = styled.div`
    display: flex;
    gap: 10px;
    margin-right: 20px;
    margin-top: 14px;
`;

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('userToken');
        window.location.reload();
    }
  return (
    <NavbarWrapper>
        <StoreName>Store +</StoreName>
        <NavigationMenus>
            <div onClick={() => navigate('/')}>All Products</div>
            <div onClick={() => navigate('/electronics')}>Electronics</div>
            <div onClick={() => navigate('/jewelery')}>Jewelery</div>
            <div>Fashion</div>
            <div onClick={() => navigate('/cart')}>Cart</div>
            <div onClick={() => handleLogOut()}>Logout</div>
        </NavigationMenus>
    </NavbarWrapper>
  )
}

export default Navbar