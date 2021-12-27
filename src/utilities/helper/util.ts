/*
1'111 - CHP
*/
export const formatnumber = (num: any, fix: any) => { return num ? num.toFixed(fix).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$&\'') : '' }
