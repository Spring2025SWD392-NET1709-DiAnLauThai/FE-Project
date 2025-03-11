export interface ColorPayload {
    colorName: string;
    colorCode: string;
}

export interface ColorResponse {
    id: string;
    colorName: string;
    colorCode: string;
    tshirtColors: any[];
}