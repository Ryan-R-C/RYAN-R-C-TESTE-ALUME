export const calculateInstallment = (PV: number, i: number, n: number) => {
    return PV * (i / (1 - Math.pow(1 + i, -n)));
};