export interface Node {
  x: number;
  y: number;
  highlighted?: true;
}

export interface Edge {
  startNodeId: number;
  endNodeId: number;
  highlighted?: true;
}
