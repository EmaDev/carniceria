import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { getPreciosCompra, setPreciosCompra } from '../firebase/queries';
import { CostoForm } from './CostoForm';

const Container = styled.div`
   margin: 1rem;
   padding: 2rem 1rem;
   background-color: #BEBEBE;
   border-radius: 6px;
   position:relative;
`;

const Title = styled.h2`
   margin: 0 1rem;
   font-size: 1.4rem;
   font-weight: 700;
   text-transform: uppercase;
`;

const ButtonLock = styled.div`
   position: absolute;
   right:1rem;
   top: 1rem;
   font-size: 2rem;
   color: #000;
   cursor:pointer;

   &:hover{
    right: 1.5rem;
    transition: .4s;
   }
`;

const today = new Date();
export const Costos = () => {

  const [showData, setShowData] = useState(false);

  const [precios, setPrecios] = useState<any[]>([]);

  useEffect(() => {
    getPrecios();
  }, []);

  const getPrecios = async () => {
    const resp = await getPreciosCompra();
    if (resp.ok) {
      setPrecios(resp.data);
    }
  }

  return (
    <Container>
      <ButtonLock onClick={() => setShowData(!showData)}>
        {(showData) ? <HiLockOpen />
          : <HiLockClosed />
        }

      </ButtonLock>
      {
        (showData) &&
        <>
          <Title>Costos al <span className='txt-price'>{`${today.getDate()}/${today.getMonth()}`}</span></Title>

          {
            precios.map(item => (
              <CostoForm
                key={item[0]}
                title={item[0]}
                id={item[1].id}
                precio={item[1].precio}
                kilogramos={item[1].kilogramos}
                reload={getPrecios}
              />
            ))
          }

        </>
      }
    </Container>
  )
}
