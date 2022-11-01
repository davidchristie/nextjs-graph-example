import { useEffect, useRef } from "react";
import styles from "../styles/Graph.module.css";
import { Edge, Node } from "../types/graph";

export interface GraphProps {
  nodes: Node[];
  edges: Edge[];
}

const nodePixelSize = 10;

export function Graph(props: GraphProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "darkgray";
        props.nodes.forEach((node) => {
          ctx.fillRect(
            node.x * canvasWidth - nodePixelSize / 2,
            node.y * canvasHeight - nodePixelSize / 2,
            nodePixelSize,
            nodePixelSize
          );
        });
        props.edges.forEach((edge) => {
          const startNode = props.nodes[edge.startNodeId];
          const endNode = props.nodes[edge.endNodeId];
          ctx.strokeStyle = "darkgray";
          ctx.beginPath();
          ctx.moveTo(startNode.x * canvasWidth, startNode.y * canvasHeight);
          ctx.lineTo(endNode.x * canvasWidth, endNode.y * canvasHeight);
          ctx.stroke();
        });
      }
    }
  }, []);
  return (
    <canvas
      className={styles.canvas}
      width={1000}
      height={1000}
      ref={canvasRef}
    />
  );
}
