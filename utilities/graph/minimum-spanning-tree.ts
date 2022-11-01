import { Edge, Node } from "../../types/graph";

type Matrix = number[][];

export function createMinimumSpanningTree(nodes: Node[]): Edge[] {
  const distances = createDistanceMatrix(nodes);
  const connections = createConnectionMatrix(distances);
  const edges: Edge[] = [];
  for (let i = 0; i < connections.length; i++) {
    for (let j = 0; j < i; j++) {
      if (connections[i][j]) {
        const startNodeId = i;
        const endNodeId = j;
        edges.push({
          startNodeId,
          endNodeId,
        });
      }
    }
  }
  return edges;
}

function createConnectionMatrix(weights: Matrix): Matrix {
  const size = weights.length;
  const edges = createEmptyMatrix(size, size);
  const connectedIndices = new Set([0]);
  const unconnectedIndices = new Set(
    Array(size - 1)
      .fill(null)
      .map((_, index) => index + 1)
  );
  while (connectedIndices.size < size) {
    let minimumWeight = Number.MAX_VALUE;
    let minimumConnectedIndex = -1;
    let minimumUnconnectedIndex = -1;
    connectedIndices.forEach((connectedIndex) => {
      unconnectedIndices.forEach((unconnectedIndex) => {
        const weight = weights[connectedIndex][unconnectedIndex];
        if (weight < minimumWeight) {
          minimumWeight = weight;
          minimumConnectedIndex = connectedIndex;
          minimumUnconnectedIndex = unconnectedIndex;
        }
      });
    });
    edges[minimumConnectedIndex][minimumUnconnectedIndex] = 1;
    edges[minimumUnconnectedIndex][minimumConnectedIndex] = 1;
    connectedIndices.add(minimumUnconnectedIndex);
    unconnectedIndices.delete(minimumUnconnectedIndex);
  }
  return edges;
}

function createDistanceMatrix(nodes: Node[]): Matrix {
  const size = nodes.length;
  const matrix = createEmptyMatrix(size, size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < i; j++) {
      matrix[i][j] = matrix[j][i] = getDistance(nodes[i], nodes[j]);
    }
  }
  return matrix;
}

function createEmptyMatrix(rows: number, columns: number): Matrix {
  return Array(rows)
    .fill(0)
    .map(() => Array(columns).fill(0));
}

function getDistance(node1: Node, node2: Node): number {
  const { x: x1, y: y1 } = node1;
  const { x: x2, y: y2 } = node2;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
