// distanceBetweenNodes.js

// ――― 1) Clase GraphSimple ―――
class GraphSimple {
  constructor(n) {
    this.adj = Array.from({ length: n }, () => []);
  }

  addEdge(u, v, w) {
    this.adj[u].push([v, w]);
    this.adj[v].push([u, w]);
  }

  dijkstraSimple(source) {
    const n = this.adj.length;
    const dist = Array(n).fill(Infinity);
    const visited = Array(n).fill(false);
    dist[source] = 0;

    for (let i = 0; i < n; i++) {
      let u = -1;
      for (let j = 0; j < n; j++) {
        if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
          u = j;
        }
      }
      if (u === -1 || dist[u] === Infinity) break;
      visited[u] = true;

      for (const [v, w] of this.adj[u]) {
        if (!visited[v] && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
        }
      }
    }
    return dist;
  }

  // ――― Helper para distancia A→B
  distanceBetween(u, v) {
    const dist = this.dijkstraSimple(u);
    return dist[v];
  }
}

// ――― 2) Definición de aristas ―――
const edges = [
  [0, 1, 7],
  [0, 2, 9],
  [0, 5, 14],
  [1, 2, 10],
  [1, 3, 15],
  [2, 3, 11],
  [2, 5, 2],
  [3, 4, 6],
  [4, 5, 9],
];

// ――― 3) Construir el grafo ―――
const graph = new GraphSimple(6);
for (const [u, v, w] of edges) {
  graph.addEdge(u, v, w);
}

// ――― 4) Leer nodos A y B desde la línea de comandos ―――
const [nodeA, nodeB] = process.argv.slice(2).map(Number);
if (
  nodeA === undefined ||
  nodeB === undefined ||
  isNaN(nodeA) ||
  isNaN(nodeB)
) {
  console.error("Uso: node distanceBetweenNodes.js <nodoA> <nodoB>");
  process.exit(1);
}

// ――― 5) Calcular y mostrar la distancia mínima A→B ―――
const distance = graph.distanceBetween(nodeA, nodeB);
console.log(
  `Distancia mínima de ${nodeA} a ${nodeB}:`,
  distance === Infinity ? "No hay ruta" : distance
);
