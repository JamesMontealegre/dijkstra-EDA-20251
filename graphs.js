// graphs.js

// ─── 1) Clase GraphSimple ───────────────────────────────────────────────────────

class GraphSimple {
  constructor(n) {
    // Para cada nodo (0 … n−1) guardamos una lista de [vecino, peso]
    this.adj = Array.from({ length: n }, () => []);
  }

  addEdge(u, v, w) {
    // Añade u → v
    this.adj[u].push([v, w]);
    // Añade v → u (grafo no dirigido)
    this.adj[v].push([u, w]);
  }

  dijkstraSimple(source) {
    const n = this.adj.length;
    const dist = Array(n).fill(Infinity);
    const visited = Array(n).fill(false);
    dist[source] = 0;

    for (let i = 0; i < n; i++) {
      // 1) Busca el nodo u no visitado con menor dist[u]
      let u = -1;
      for (let j = 0; j < n; j++) {
        if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
          u = j;
        }
      }
      // Si no hay más nodos alcanzables, salimos
      if (u === -1 || dist[u] === Infinity) break;
      visited[u] = true;

      // 2) Relaja cada arista (u → v) de u
      for (const [v, w] of this.adj[u]) {
        if (!visited[v] && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
        }
      }
    }

    return dist;
  }
}

// ─── 2) Creación del grafo y adición de aristas ────────────────────────────────

const graph = new GraphSimple(6);

// Aquí definimos exactamente las mismas aristas del ejercicio:
// [nodoA, nodoB, peso]
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

// Asegúrate de recorrer este array para agregar cada arista:
for (const [u, v, w] of edges) {
  graph.addEdge(u, v, w);
}

// ─── 3) Ejecución de Dijkstra y salida ────────────────────────────────────────

const distances = graph.dijkstraSimple(0);
console.log("Distancias desde el nodo 0:", distances);
