import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { getVentasDelDia, removeSale } from '../firebase/queries';
import Swal from 'sweetalert2';
import { SalesContext } from '../context/SalesContext';

const Container = styled.div<any>`
   background-color: #BEBEBE;
   margin: 1rem 0 0 0;
   padding: 5px;
   height: ${({ showMore }) => !showMore && '150px'};
   max-height: 500px;
   width: 100%;
   border-radius: 5px;
   overflow: auto;
`;

const Button = styled.button`
   border-style: none;
   width: 95%;
   display: block;
   margin: .8rem auto;
   padding: 1rem;
   font-size: 1.2rem;
   font-weight: 700;
   background-color: #343434;
   color: #F0F0F0;
   border-radius: 5px;
   cursor:pointer;

   &:hover{
    background-color: #242424;
    transition: .4s;
   }
`;

const ActionButton = styled.button<any>`
  margin: 0 .3rem;
  padding: .4rem 1rem;
  background-color: ${({ color }) => color};
  border-style: none;
  border-radius: 6px;
  font-size: 1.4rem;
  display: flex;
  align-itmes:center;
  margin:auto;
  color:#fff;
  p{
    margin: 0 .5rem 0 0;
  }
  &:hover{
    box-shadow: 1px 1px 4px #000;
  }
`;


export const Table = () => {

  const {sales, getSales} = useContext(SalesContext);
  const [showMoreActive, setShowMore] = useState(false);

  const handleRemove = (data: any) => {

    Swal.fire({
      title: 'Estas seguro?',
      text: "de eliminar esta venta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        await removeSale(data);
        Swal.fire(
          'Eliminado!',
          'Se elimino correctamente.',
          'success'
        )
        getSales();
      }
    })

  }

  return (
    <>
      <Container showMore={showMoreActive}>
        <table>
          <thead className='tableHead'>
            <tr className='tableHead'>
              <td className='tableHeadItem'>Categoria</td>
              <td className='tableHeadItem'>importe</td>
              <td className='tableHeadItem'>Acciones</td>
            </tr>
          </thead>
          <tbody>
            
            {
              sales.map(({ id, precio, categoria }) => (
                <tr key={id}>
                  <td className='tdBody'>{categoria}</td>
                  <td className='tdBody txt-right txt-price'>$ {precio}</td>
                  <td className='tdAction'>
                    <ActionButton
                      color='#D13838'
                      onClick={() => handleRemove({ id, precio, categoria })}>
                      <p>Elminar</p>
                      <AiFillDelete />
                    </ActionButton>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </Container>
      <Button onClick={() => { setShowMore(!showMoreActive) }}>{(showMoreActive) ? 'Ocultar' : 'Mostrar tabla completa'}</Button>
    </>
  )
}
