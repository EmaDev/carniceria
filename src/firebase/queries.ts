import {
    getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove,
    orderBy, query, collection,
    getDocs, where, setDoc,
} from "firebase/firestore";
import { app } from './config';
import { MESES, DIA_ACTUAL, MES_ACTUAL, ANIO_ACTUAL, COLECCION_ANIO_ACTUAL } from '../helpers/index';
const db = getFirestore(app);

export const getVentasDelDia = async () => {

    const docRef = doc(db, "carniceria", COLECCION_ANIO_ACTUAL, MES_ACTUAL, DIA_ACTUAL);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ok: true, data: docSnap.data().ventas };
    } else {
        return { ok: false, error: 'Error', data: [] };
    }
}

export const createNewSale = async (data: any) => {
    try {
        const docRef = doc(db, "carniceria", COLECCION_ANIO_ACTUAL, MES_ACTUAL, DIA_ACTUAL);

        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            await updateDoc(docRef, {
                ventas: arrayUnion({
                    id: data.id,
                    categoria: data.category,
                    precio: parseInt(data.amount),
                })
            });
        } else {
            await setDoc(docRef, {
                fecha: DIA_ACTUAL,
                ventas: [{
                    id: data.id,
                    categoria: data.category,
                    precio: parseInt(data.amount),
                }]
            });
        }
        return { ok: true };

    } catch (error) {
        console.log(error);
        return { ok: false };
    }
}

export const removeSale = async (data: any) => {
    const docRef = doc(db, "carniceria", COLECCION_ANIO_ACTUAL, MES_ACTUAL, DIA_ACTUAL);

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

    const q = query(collection(db, "carniceria", COLECCION_ANIO_ACTUAL, month), orderBy("fecha")); 
    /*where("fecha", "<=", parseInt(DIA_ACTUAL))*/

    const querySnapshot = await getDocs(q);
    const arrData: any = [];
    querySnapshot.forEach((doc) => {
        const { fecha, ventas } = doc.data();
        const monthNumber = MESES.find(mes => mes.mes === month);
        arrData.push({
            fecha:  (parseInt(fecha) < 10) ? `0${fecha}/${monthNumber?.numero}` : `${fecha}/${monthNumber?.numero}`,
            ventas
        })
    });

    return arrData;
}

export const getTodasLasVentasDel2022 = async () => {
    const docRef = doc(collection(db, 'carniceria'), 'ventas2023');

    getDoc(docRef)
    .then((documento) => {
      if (documento.exists()) {
        // Obtén los nombres de las colecciones desde los datos del documento
        const datosDocumento = documento.data();
        const nombresColecciones = Object.keys(datosDocumento);
        
        console.log('Nombres de las colecciones:', nombresColecciones);
      } else {
        console.log('El documento no existe.');
      }
    })
    .catch((error) => {
      console.error('Error al obtener el documento:', error);
    });
}