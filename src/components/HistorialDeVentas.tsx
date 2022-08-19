import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { getVentasPorMes } from '../firebase/queries';
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

export const HistorialDeVentas = () => {

    const [ventasTotales, setVentasTotales] = useState<any[]>([]);
    const selectRef: any = useRef();

    const handleFiltrar = async () => {
        const resp = await getVentasPorMes(selectRef.current.value);
        setVentasTotales(resp);
    }

    const calcularImporteTotal = (ventas:any[]) => {
        let importe = 0;
        if(ventas.length > 0){
           ventas.forEach( venta => {
            if(venta['precio']){
                importe += venta.precio;
            }else{
                importe += venta.importe;
            }
           })
        }

        return `$ ${importe}`
    }

    return (
        <Container>
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
                        ventasTotales.map( venta => (
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
        </Container>
    )
}
