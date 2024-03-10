import { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, ReactFlowProvider, SelectionMode, addEdge, useEdgesState, useNodesState } from 'reactflow';

import { initialNodes, initialEdges } from '../FlowData/dragdropdata.js';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar.js';
import './dragdropstyle.css';
import ClickNode from './Nodes/ClickNode.js';
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


let id = 0;
const getId = () => `dndnode_${id++}`;
function DragDropFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [updating, setUpdating] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  // Dnd
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` }, // create a newNode function
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const nodeTypes = useMemo(
    () => ({
      clickNode: ClickNode,
    }),
    [],
  );

  const onNodeClick = (e, node) => {
    console.log('node click', node.data.label)
    if (updating === null || updating.id !== node.id) {
      setUpdating(node);
    }
  }
  const onPaneClick = (e) => {
    e.stopPropagation();
    console.log('pane click')
    if (updating !== null) {
      setUpdating(null);
    }
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            selectionOnDrag
            defaultEdgeOptions={defaultEdgeOptions}
            selectionMode={SelectionMode.Partial}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}

          >
            {updating !== null &&
              <Panel position="top-right">
                {updating.data.label}
              </Panel>
            }
            <Controls />
            <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
            {/* Variant: dots, lines, cross */}
            <Background variant="lines" gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar nodes={nodes} />
      </ReactFlowProvider>
    </div>
  );
}

export default DragDropFlow;
