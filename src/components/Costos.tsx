import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiSave } from 'react-icons/bi';
import { HiLockClosed } from 'react-icons/hi';
import { getPreciosCompra, setPreciosCompra } from '../firebase/queries';
import Swal from 'sweetalert2';

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

const InputsContianer = styled.div`
   width: 100%;
   margin:auto;
   display:flex;
   justify-content: space-evenly;

`;
const Label = styled.label`
    font-size: 1.2rem;
    font-weight: 700;
    margin: .5rem;
    display: block;
`;
const Input = styled.div`
   margin:auto;
   width: 100%;
   display:flex;
   
   input{
    padding: .5rem;
    border-radius: 5px 0 0 5px;
    margin:  0;
    border-style:none;
    width:100%;
   }
   div{
    background-color: #343434;
    padding: .5rem;
    align-items:center;
    color:#fff;
    border-radius:  0 5px 5px 0;
    cursor:pointer;
    &:hover{
      color:#e1e1e1;
      background-color: #242424;
    }
   }
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
  
  const [showData, setShowData] = useState(true);
  
  const [precios, setPrecios] = useState<any>({carne: 0, pollo: 0});
  const {carne, pollo} = precios;
  useEffect( () => {

    const getPrecios = async() => {
      const resp = await getPreciosCompra();
      if(resp.ok){
        setPrecios(resp.data);
      }
    }
    getPrecios();
  },[]);

  const handleForm = ({target}:any) => {
    setPrecios({
      ...precios,
      [target.name]: target.value
    })
  }

  const handleSumbit = async(category:string) => {
    if(precios[category] <= 0){
      
      return Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Utiliza un precio valido',
      }); 
    }

    const resp = await setPreciosCompra({[category]: precios[category]});
    if(resp.ok){
      return Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      return Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Ocurrio un error',
      }); 
    }
  }

  return (
    <Container>
      <ButtonLock onClick={() => setShowData(!showData)}><HiLockClosed /></ButtonLock>
      {
        (showData) &&
          <>
            <Title>Costos al <span className='txt-price'>{`${today.getDate()}/${today.getMonth()}`}</span></Title>

            <InputsContianer>
              <div>
                <Label>Carne</Label>
                <Input>
                  <input type={'number'} 
                  placeholder={'Precio por kilo'}
                  value={carne}
                  name={'carne'}
                  onChange={handleForm}
                  />
                  <div onClick={() => handleSumbit('carne')}><BiSave /></div>
                </Input>
              </div>
              <div><Label>Pollo</Label>
                <Input>
                  <input type={'number'} 
                  value={pollo}
                  name={'pollo'}
                  placeholder={'Precio por kilo'}
                  onChange={handleForm}
                  />
                  <div onClick={() => handleSumbit('pollo')}><BiSave /></div>
                </Input></div>
            </InputsContianer>
          </>
      }
    </Container>
  )
}
