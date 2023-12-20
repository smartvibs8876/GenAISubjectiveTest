import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toggle } from './redux/actions';
import { useDispatch } from 'react-redux';
//import { useDispatch, useSelector } from'@reduxjs/toolkit'

const Form = styled.form`
  background: #fff;
  padding: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  display: block;
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  border-radius: 0.5rem;
`; 

const Button = styled.button`
  display: block;
  background: #3498db;
  color: #fff;
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;

  &:hover {
    background: #2980b9; 
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

function Login(){
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!email || !password) {
        alert('Please enter email and password');
        return;
      }
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}) 
      });
  
      if(response.ok) {
        alert('Login successful!');
        dispatch(toggle())
        navigate('/')
      } else {
        alert('Invalid credentials!'); 
      }
    }
    return(
        <React.Fragment>
            <div className="auth-form">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    />

                    <Button type="submit">Login</Button>
                    <Button type="submit" onClick={(e)=>{navigate("/passwordChange")}}>Change Password</Button>
                    <Button type="submit">Forgot Password</Button>
                </Form>
            </Container>

            </div>
        </React.Fragment>
    );
}

export default Login;