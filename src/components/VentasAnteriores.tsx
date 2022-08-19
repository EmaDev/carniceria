import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {HiLockClosed, HiLockOpen} from 'react-icons/hi';
import { Table } from './Table';
import { SalesContext} from '../context/SalesContext';
import { Spinner } from './Spinner';

const Container = styled.div`
  padding: .5rem;
  background-color: #9C9C9C;
  position:relative;
`;
const Title = styled.h2`
   margin: 1rem;
   font-size: 1.7rem;
   font-weight: 700;
   text-transform: uppercase;
`;
const Total = styled.div`
   width: 90%;
   margin: 1rem auto;
   padding: 1rem 0 0 0;
   background-color: #BEBEBE;
   border-radius: 5px;
   text-align: center;
   position:relative;

   p{
    font-size: 1.8rem;
    font-weight: 700;
    margin:0;
   }
   div{
     position:absolute;
     left: 1rem;
     margin:auto;
     cursor:pointer;
     font-size: 1.8rem;

     &:hover{
        left: 1.5rem;
        transition: .6s ease;
     }
    }
`;

const ButtonUpdate = styled.button`
   width: 100%;
   border-style: none;
   padding: .8rem;
   font-size: 1.4rem;
   font-weight: 700;
   background-color: #343434;
   color: #F0F0F0;
   border-radius: 5px 0 5px 0;
   cursor:pointer;

   &:hover{
    background-color: #242424;
    transition: .4s;
   }
`;

export const VentasAnteriores = () => {

  const {totalAmount, getSales} = useContext(SalesContext);
  const [showTotalActive, setShowTotal] = useState(true);
  
  return (
    <Container>
        
        <Title>Ventas del dia</Title>
        <span className='subTitle'>Total</span>
        <Total>
            <div onClick={ () => {setShowTotal(!showTotalActive)}}>
                {(showTotalActive) ?
                <HiLockOpen/>
                :
                <HiLockClosed/>
                }
            </div>
            <p className='txt-price'>
                {(showTotalActive) ? `$ ${totalAmount}` : '******'}
            </p>
           <ButtonUpdate onClick={getSales}>Actualizar</ButtonUpdate>
        </Total>
        <span className='subTitle'>Todas las ventas</span>
        <Table/>
    </Container>
  )
}
