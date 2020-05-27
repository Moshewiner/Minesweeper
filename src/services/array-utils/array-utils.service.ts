export function oneDimentionalIndexToTwo(index: number, colsCount: number): [number, number] {
  return [Math.floor(index / colsCount), index % colsCount];
}

export function twoDimentionalIndexToOne(x: number, y: number, colsCount: number): number {
  return x * colsCount + y;
}
