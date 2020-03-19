export class Store {
    _id: string;
    name: string;
    address: string;
    layourUrl: string;
    aisles: Array<Aisle>;
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