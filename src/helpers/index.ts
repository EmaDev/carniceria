export const totalCalculator = (arr: any[], property:string) => {

    let total = 0;

    arr.forEach( item => {
        total += item[property];
    });

    return total;
}

export const MESES = [
    { id: 1, mes: 'enero', numero: "01" }, { id: 2, mes: 'febrero', numero: "02" }, { id: 3, mes: 'marzo', numero: "03" },
    { id: 4, mes: 'abril', numero: "04"}, { id: 5, mes: 'mayo', numero: "05" }, { id: 6, mes: 'junio', numero: "06" },
    { id: 7, mes: 'julio', numero: "07" }, { id: 8, mes: 'agosto', numero: "08" }, { id: 9, mes: 'septiembre', numero: "09" },
    { id: 10, mes: 'octubre', numero: "10" }, { id: 11, mes: 'noviembre', numero: "11" }, { id: 12, mes: 'diciembre',numero: "12" }
];

export const ANIO_ACTUAL = new Date().getFullYear();
export const DIA_ACTUAL = new Date().getDate().toString();
export const MES_ACTUAL = MESES[new Date().getMonth()].mes;
export const COLECCION_ANIO_ACTUAL = "ventas" + ANIO_ACTUAL;