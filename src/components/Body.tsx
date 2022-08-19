import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SalesContext } from '../context/SalesContext';
import { getVentasDelDia } from '../firebase/queries';
import '../styles/body.css';
import { Costos } from './Costos';
import { HistorialDeVentas } from './HistorialDeVentas';
import { NuevaVenta } from './NuevaVenta';
import { Spinner } from './Spinner';
import { VentasAnteriores } from './VentasAnteriores';

export const Body = () => {

    const { isLoading } = useContext(SalesContext);

    return (
        <div className='globalContainer'>
            <Costos />
            <div className='containerVentas'>
                {(isLoading) && <div className='modal'><Spinner/></div>}
                <NuevaVenta />
                <VentasAnteriores />
            </div>
            <HistorialDeVentas/>
        </div>
    )
}
