export type DebtMatrix = {
    rows: string[]; // member names
    columns: string[]; // member names
    matrix: number[][]; // [payer][receiver] values
};