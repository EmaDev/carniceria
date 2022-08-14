import React, { createContext, useEffect, useState } from 'react';
import { getVentasDelDia } from '../firebase/queries';
import { totalCalculator } from '../helpers';

interface SalesContextProps {
    sales: [];
    totalAmount: number;
    isLoading: boolean;
    updateTotalAmount: (amount:number) => void;
    getSales: () => void; 
    setIsLoading: (status:boolean) => void;
}
export const SalesContext = createContext({} as SalesContextProps);

export const SalesContextPorvider = ({children}:any) => {

  const [sales, setSales] = useState<[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect( () => {
    getAllSales();
  }, []);

  const getAllSales = async() => {
    setIsLoading(true);
    const resp = await getVentasDelDia();
    if(resp.ok){
        setSales(resp.data);
        setTotalAmount( totalCalculator(resp.data, 'precio'));
    }
    setIsLoading(false);
  }

  const updateTotalAmount = (amount:number) => {
    
    setTotalAmount( (prev) => prev + amount);
  }

  return (
    <SalesContext.Provider
    value={{
        sales,
        totalAmount,
        isLoading,
        getSales: getAllSales,
        updateTotalAmount,
        setIsLoading
    }}
    >
        {children}
    </SalesContext.Provider>
  )
}
