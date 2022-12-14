import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { createNewSale } from '../firebase/queries';
import { SalesContext } from '../context/SalesContext';
import { Spinner } from './Spinner';

const Container = styled.div`
  padding: .5rem;
  background-color: #BEBEBE;
  position:relative;
`;
const Title = styled.h2`
   margin: 1rem;
   font-size: 1.7rem;
   font-weight: 700;
   text-transform: uppercase;
`;

const Input = styled.input`
   border-style: none;
   width: 95%;
   display: block;
   margin: 1rem auto;
   padding: 1rem;
   font-size: 1.6rem;
   font-weight: 500;
   box-shadow: 1px 1px 1px #9C9C9C;
   background-color: #F0F0F0;
   border-radius: 5px;
`;

const Submit = styled.button`
   border-style: none;
   width: 95%;
   display: block;
   margin: 2rem auto;
   padding: 1rem;
   font-size: 1.4rem;
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

const Select = styled.select`
   display:block;
   width: 95%;
   padding: 1rem;
   margin: .5rem auto;
   font-size: 1.5rem;
   font-weight: 500;
   border-style:none;
   box-shadow: 1px 1px 1px #9C9C9C;
   background-color: #F0F0F0;
   border-radius: 5px;

   option{
    font-size: 1.4rem;
   }
`;

interface Form {
    category: string;
    amount: string;
}
const initialState: Form = {
    category: 'Carne',
    amount: '',
}
export const NuevaVenta = () => {

    const { updateTotalAmount, setIsLoading, getSales } = useContext(SalesContext);
    const [formValues, setForm] = useState<Form>(initialState);
    const { category, amount } = formValues;


    const setFormValues = ({ target }: any) => {
        setForm({
            ...formValues,
            [target.name]: (target.name === 'amount' ? parseInt(target.value) : target.value)
        })
    }

    const handleOnSubmit = async (e: any) => {

        e.preventDefault();
        e.target.disabled = true;

        setIsLoading(true);

        if (category === '') {
            setIsLoading(false);
            e.target.disabled = false;
            return Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Selecciona una categoria'
            });
        }
        if (amount === '' || parseInt(amount) <= 0 || parseInt(amount) > 50000) {
            setIsLoading(false);
            e.target.disabled = false;
            return Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Escribe un importe valido'
            });
        }

        const resp = await createNewSale({
            category,
            amount,
            id: uuidv4()
        });

        setForm({
            category: 'Carne',
            amount: ''
        });

        setIsLoading(false);
        e.target.disabled = false;

        if (!resp.ok) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo registrar la venta!',
            })
        }

        updateTotalAmount(parseInt(amount));
        getSales();

        return Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado correctamente',
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <Container>
            <Title>Nueva Venta</Title>
            <form>
                <span className='subTitle'>Categoria</span>

                <Select defaultValue={'Carne'} name='category' onChange={setFormValues}>
                    <option value={'Carne'}>Carne</option>
                    <option value={'Pollo'}>Pollo</option>
                    <option value={'Pescado'}>Pescado</option>
                    <option value={'Otros'}>Otros</option>
                </Select>

                <span className='subTitle'>Importe</span>
                <Input
                    name='amount' type={'number'} placeholder={'importe'}
                    value={amount}
                    onChange={setFormValues}
                />
                <Submit type={'submit'} disabled={false} onClick={handleOnSubmit}>
                    Guardar
                </Submit>

            </form>

        </Container >
    )
}
