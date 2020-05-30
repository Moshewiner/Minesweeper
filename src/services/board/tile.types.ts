export enum TileStatus {
    Hidden = 'Hidden',
    Revealed = 'Revealed',
    Flag = 'Flag',
}

export enum ClickType {
    Primary,
    Secondary,
}
export enum TileType {
    Mine = 'Mine',
    NumberTile = 'NumberTile',
}

export type Tile = {
    type: TileType;
    status: TileStatus;
    value: number;
};