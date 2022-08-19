import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove, orderBy, query, collection, getDocs, where } from "firebase/firestore";
import { app } from './config';
import {MESES,DIA_ACTUAL,MES_ACTUAL} from '../helpers/index';
const db = getFirestore(app);



export const getVentasDelDia = async () => {

    const docRef = doc(db, "carniceria", 'ventasNuevo', MES_ACTUAL, DIA_ACTUAL);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ok: true, data: docSnap.data().ventas };
    } else {
        return { ok: false, error: 'Error', data: [] };
    }
}

export const createNewSale = async (data: any) => {

    try {
        const docRef = doc(db, "carniceria", "ventasNuevo", MES_ACTUAL, DIA_ACTUAL);
        await updateDoc(docRef, {
            ventas: arrayUnion({
                id: data.id,
                categoria: data.category,
                precio: parseInt(data.amount)
            })
        });

        return { ok: true };
    } catch (error) {
        return { ok: false };
    }
}

export const removeSale = async (data: any) => {
    const docRef = doc(db, "carniceria", "ventasNuevo", MES_ACTUAL, DIA_ACTUAL);

    await updateDoc(docRef, {
        ventas: arrayRemove({
            id: data.id,
            categoria: data.categoria,
            precio: data.precio
        })
    });
}


export const getPreciosCompra = async () => {

    const docRef = doc(db, 'carniceria', 'precios-compra');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const orden: any = Object.entries(docSnap.data()).sort((a, b) => { return a[1].id - b[1].id });
        return { ok: true, data: orden };
    }

    return { ok: false, data: [] };
}
export const setPreciosCompra = async (data: any) => {
    try {
        const docRef = doc(db, 'carniceria', 'precios-compra');
        await updateDoc(docRef, {
            ...data
        });
        return { ok: true }
    } catch (error) {
        console.log(error);
        return { ok: false }
    }

}

export const getVentasPorMes = async (month: string) => {

    const q = query(collection(db, "carniceria", "ventasNuevo", month), 
    orderBy("fecha"), where("fecha", "<=", parseInt(DIA_ACTUAL)));

    const querySnapshot = await getDocs(q);
    const arrData:any = [];
    querySnapshot.forEach((doc) => {
        const {fecha, ventas} = doc.data();
        const monthNumber = MESES.find(mes => mes.mes === month);
        arrData.push({
            fecha: `${fecha}/${monthNumber?.id}`,
            ventas
        })
    });
    return arrData;
}