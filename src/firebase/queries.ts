import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { app } from './config';
const db = getFirestore(app);

const MESES = [
    { id: 1, mes: 'enero' }, { id: 2, mes: 'febrero' }, { id: 3, mes: 'marzo' },
    { id: 4, mes: 'abril' }, { id: 5, mes: 'mayo' }, { id: 6, mes: 'junio' },
    { id: 7, mes: 'julio' }, { id: 8, mes: 'agosto' }, { id: 9, mes: 'septiembre' },
    { id: 10, mes: 'octubre' }, { id: 11, mes: 'noviembre' }, { id: 12, mes: 'diciembre' }
];

const DIA_ACTUAL = new Date().getDate().toString();
const MES_ACTUAL = MESES[new Date().getMonth()].mes;


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
        return { ok: true, data: docSnap.data() };
    }

    return { ok: false, data: {} };
}
export const setPreciosCompra = async (data: any) => {
    try {
        const docRef = doc(db, 'carniceria', 'precios-compra');
        await updateDoc(docRef, {
            ...data
        });
        return {ok:true}
    } catch (error) {
        return {ok:false}
    }

}