import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { getTodasLasVentasDel2022, getVentasPorMes } from '../firebase/queries';
import { MESES, totalCalculator } from '../helpers';

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

const Select = styled.select`
    padding: 1rem 3rem;
    margin: 0 1rem;
    border-style: none;
    background-color: #e1e1e1;
    font-size: 1.8rem;
    font-weight: 500;
    border-radius: 6px;
`;
const Button = styled.button`
  padding: .5rem 3rem;
  margin: 0 .5rem;
  background-color: #343434;
  color: #fff;
  border-style: none;
  border-radius: 5px;
  font-weight: 700;

  &:hover{
    box-shadow: 1px 1px 2px #343434;
    background-color: #242424;
    tranisition .5s ease;
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

export const HistorialDeVentas = () => {

    const [ventasTotales, setVentasTotales] = useState<any[]>([]);
    const [showData, setShowData] = useState(false);
    const selectRef: any = useRef();

    const handleFiltrar = async () => {
        const resp = await getVentasPorMes(selectRef.current.value);
        setVentasTotales(resp);
    }

    const getTodasLasVentas = async() => {
        await getTodasLasVentasDel2022();
    }
    const calcularImporteTotal = (ventas: any[]) => {
        let importe = 0;
        if (ventas.length > 0) {
            ventas.forEach(venta => {
                if (venta['precio']) {
                    importe += venta.precio;
                } else {
                    importe += venta.importe;
                }
            })
        }

        return `$ ${importe}`
    }

    return (
        <Container>
            <ButtonLock onClick={() => setShowData(!showData)}>
                {(showData) ? <HiLockOpen />
                    : <HiLockClosed />
                }

            </ButtonLock>
            {
                showData &&
                <>
                    <Title>Historial</Title>

                    <div style={{ display: 'flex', margin: '1rem 0' }}>
                        <Select ref={selectRef}>
                            {
                                MESES.map(mes => (
                                    <option key={mes.id} value={mes.mes}>{mes.mes}</option>
                                ))
                            }
                        </Select>
                        <Button onClick={handleFiltrar}>Filtrar</Button>
                    </div>

                    <table>
                        <thead className='tableHead'>
                            <tr className='tableHead'>
                                <td className='tableHeadItem'>Fecha</td>
                                <td className='tableHeadItem'>importe total</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ventasTotales.map(venta => (
                                    <tr key={venta.fecha}>
                                        <td className='tdBody txt-price'>{venta.fecha}</td>
                                        <td className='tdBody txt-right txt-price'>
                                            {calcularImporteTotal(venta.ventas)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
            }
        </Container>
    )
}
