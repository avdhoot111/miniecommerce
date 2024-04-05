import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 250px;
`;

const PasswordToggleBtn = styled.button`
  position: absolute;
  top: 44px;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://fakestoreapi.com/auth/login", {username,password})
        .then((res) => {
            if(res.status === 200) {
                localStorage.setItem('userToken', res.data.token);
                window.location.reload();
            }
        })
        .catch((err) => {
            setError('Invalid Credentials', err);
        })
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <LoginPageWrapper>
      <h2>Login</h2>
      <LoginForm onSubmit={handleSubmit}>
        <FormField>
          <Label>Username:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>Password:</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggleBtn type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </PasswordToggleBtn>
        </FormField>
        <button type="submit">Login</button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
