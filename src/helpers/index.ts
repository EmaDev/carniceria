export const totalCalculator = (arr: any[], property:string) => {

    let total = 0;

    arr.forEach( item => {
        total += item[property];
    });

    return total;
}

export const MESES = [
    { id: 1, mes: 'enero' }, { id: 2, mes: 'febrero' }, { id: 3, mes: 'marzo' },
    { id: 4, mes: 'abril' }, { id: 5, mes: 'mayo' }, { id: 6, mes: 'junio' },
    { id: 7, mes: 'julio' }, { id: 8, mes: 'agosto' }, { id: 9, mes: 'septiembre' },
    { id: 10, mes: 'octubre' }, { id: 11, mes: 'noviembre' }, { id: 12, mes: 'diciembre' }
];

export const DIA_ACTUAL = new Date().getDate().toString();
export const MES_ACTUAL = MESES[new Date().getMonth()].mes;