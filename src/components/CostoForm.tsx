import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: grid;
   grid-template-columns: 60% 40%;
   padding: 0;

   @media(min-width: 678px){
    grid-template-columns: 35% 65%;
   }
`;
const Form = styled.form`
  display:grid;
  grid-template-columns: 50% 50%;
`;
const Input = styled.input`
  padding: .5rem;
  margin: .5rem;
  border-style:none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: .5rem;
  margin: 0 1rem;
  background-color: gray;
  border-style: none;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1.6rem;  
  font-weight: 700;
`;

const TotalContainer = styled.div`
   display:flex;
   flex-direction:column;
   text-align:right;
   
   p{
    margin: 0;
    font-weight: 700;
   }
`;

interface Props {
    title: string;
}
export const CostoForm = ({title}: Props) => {
    return (
        <>
            <Label>{title}</Label>
            <Container>
                <Form>
                    <Input placeholder='precio' />
                    <Input placeholder='Kilogramos' />
                    <Button>Agregar</Button>
                    <Button>Resetar</Button>
                </Form>
                <TotalContainer>
                    <p>$ 96000</p>
                    <p>Kg 98</p>
                </TotalContainer>
            </Container>
        </>
    )
}
