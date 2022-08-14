export const totalCalculator = (arr: any[], property:string) => {

    let total = 0;

    arr.forEach( item => {
        total += item[property];
    });

    return total;
}