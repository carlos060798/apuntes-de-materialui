export  interface Iproducts{
    products: Iproduct[]
}

export interface Iproduct{
    id: number;
    name: string;
    price: number;
    description: string;
}