function BuildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        graph[from] == null ? graph[from] = [to] : graph[from].push(to);
    }
    for (let [from, to] of edges.map(r => r.split('-'))){
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph
}
module.exports = {BuildGraph}