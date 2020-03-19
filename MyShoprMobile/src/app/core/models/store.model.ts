export class Store {
    _id: string;
    storeId: string;
    name: string;
    address: string;
    layourUrl: string;
    aisles: Array<any>;
}

export class Aisle {
    aisleId: number|string;
    items: Array<string>;
    position: Position;
}

export class Position {
    xPos: number;
    yPos: number;
}