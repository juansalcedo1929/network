import React, { useState } from 'react';
import { PhysicalMapView } from './PhysicalMapView';
import { RackView } from './RackView';
import { NODES, AREAS_SIN_NODO } from './data';
import { NodeData } from './types';
import './App.css';

type ViewMode = 'physical' | 'rack';

function App() {
  const [view, setView] = useState<ViewMode>('physical');
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [currentRackBlock, setCurrentRackBlock] = useState(1);



  // Desde el mapa físico de oficinas al rack
  const handleOfficeClick = (node: NodeData) => {
    setActiveNode(node);
    setCurrentRackBlock(node.block);
    setView('rack');
  };

  // Cambio de bloque dentro del rack
  const handleRackBlockChange = (newBlock: number) => {
    setCurrentRackBlock(newBlock);
    if (activeNode && activeNode.block !== newBlock) {
      setActiveNode(null);
    }
  };

  // Dentro del rack, al seleccionar un puerto
  const handlePortClickOnRack = (node: NodeData) => {
    setActiveNode(node);
  };

  // Volver al mapa de oficinas
  const handleBackToPhysical = () => {
    setView('physical');
  };

  return (
    <div className="app-container">
      {/* Selector de vistas */}
      <div className="view-tabs">
        <button
          className={`tab-button ${view === 'physical' ? 'active' : ''}`}
          onClick={() => setView('physical')}
        >
          🏢 Oficinas
        </button>
        <button
          className={`tab-button ${view === 'rack' ? 'active' : ''}`}
          onClick={() => setView('rack')}
        >
          🗄️ Rack
        </button>
      </div>

      {view === 'physical' && (
        <PhysicalMapView
          nodes={NODES}
          areasSinNodo={AREAS_SIN_NODO}
          onSelectOffice={handleOfficeClick}
        />
      )}

      {view === 'rack' && (
        <RackView
          nodes={NODES}
          activeNode={activeNode}
          currentBlock={currentRackBlock}
          onBlockChange={handleRackBlockChange}
          onPortSelect={handlePortClickOnRack}
          onBack={handleBackToPhysical} // Siempre va a oficinas
        />
      )}
    </div>
  );
}

export default App;