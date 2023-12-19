import React from "react";
import styled from "styled-components";
import { useState } from "react"

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

function PasswordChange() {
    const [email, setEmail] = useState(''); 
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!email || !oldPassword || ! newPassword) {
        alert('Please enter email ,old password and new password');
        return;
      }
      const response = await fetch('http://localhost:3000/passwordChange', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, oldPassword, newPassword}) 
      });
  
      if(response.ok) {
        alert('Password changed successfully');
      } else {
        alert('Password change not successfull'); 
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
                    placeholder="Old Password" 
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)} 
                    />

                    <Input
                    type="password"
                    placeholder="New Password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    <Button type="submit">Change Password</Button>
                </Form>
            </Container>

            </div>
        </React.Fragment>
    );
}

export default PasswordChange;