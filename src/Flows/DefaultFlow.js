import { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, ReactFlowProvider, SelectionMode, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges } from '../FlowData/nodes-edges.js';

const panOnDrag = [1, 2];
const defaultEdgeOptions = { animated: true };
const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

function DefaultFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          defaultEdgeOptions={defaultEdgeOptions}
          selectionMode={SelectionMode.Partial}
        >
          <Panel position="top-left">top-left</Panel>
          <Controls />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          {/* Variant: dots, lines, cross */}
          <Background variant="lines" gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default DefaultFlow;
