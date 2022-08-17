import { useRef, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { setPreciosCompra } from '../firebase/queries';

const GlobalContainer = styled.div`
   padding: .5rem 0;
   border-bottom: 1px solid #9c9c9c;
`;
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
  margin: 0 .5rem;
  background-color: ${({ color }) => color};
  color: #fff;
  border-style: none;
  border-radius: 5px;
  font-weight: 700;

  &:hover{
    box-shadow: 1px 1px 4px #343434;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;  
  font-weight: 700;
`;

const TotalContainer = styled.div`
   display:flex;
   flex-direction:column;
   text-align:right;
   margin: 0 1rem;
   p{
    margin: 0 1rem;
   }
`;
const TotalDiv = styled.div`
  display:grid;
  grid-template-columns: 15% 85%;
  font-family: 'Roboto', sans-serif;
  border: 1px solid gray;
  margin: .5px 0;
  border-radius: 6px;
  label{
    font-size: 1.6rem;
    background-color: #343434;
    text-align:center;
    color: #fff;
    border-radius: 5px 0 0 5px;
  }
`;
interface Props {
  title: string;
  id: string;
  precio: number;
  kilogramos: number;
  reload: () => void;
}
export const CostoForm = ({ title, id, kilogramos, precio, reload }: Props) => {

  const [formValues, setFormValues] = useState({ price: '', kg: '' });
  const { price, kg } = formValues;

  const handleSetValue = ({ target }: any) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  const resetValues = () => {
    setFormValues({kg: '', price: ''});
  }

  const handleAgregar = async () => {
    if (parseInt(price) < 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Utiliza un precio valido',
      });
    }

    const resp = await setPreciosCompra({
      [title]: {
        id,
        precio: parseInt(price) + precio,
        kilogramos: kg !== '' ? parseInt(kg) + kilogramos : kilogramos
      }
    });

    resetValues();
    if (resp.ok) {
      reload();
      return Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Ocurrio un error',
      });
    }
  }

  const handleResetear = () => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Los datos volveran a cero",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setPreciosCompra({
          [title]: {
            id,
            precio: 0,
            kilogramos: 0
          }
        });
        await reload();
        Swal.fire(
          'Eliminado!',
          'Se elimino correctamente.',
          'success'
        )
      }
    })
  }
  return (
    <GlobalContainer>
      <Label>{title}</Label>
      <Container>
        <Form>
          <Input type={'number'} placeholder='Precio' name="price" value={price} onChange={handleSetValue} />
          <Input type={'number'} placeholder='Kilogramos' name="kg" value={kg} onChange={handleSetValue} />
          <Button type={'button'} onClick={handleAgregar} color='#517a54'>Agregar</Button>
          <Button type={'button'} onClick={handleResetear} color='#D13838'>Resetear</Button>
        </Form>
        <TotalContainer>
          <Label style={{ textAlign: 'start' }}>Totales:</Label>
          <TotalDiv>
            <label>$</label>
            <p>{precio}</p>
          </TotalDiv>
          <TotalDiv>
            <label>Kg</label>
            <p>{kilogramos}</p>
          </TotalDiv>
        </TotalContainer>
      </Container>
    </GlobalContainer>
  )
}
