import React from 'react';
import { NodeData } from './types';

interface RackProps {
  nodes: NodeData[];
  activeNode: NodeData | null;
  currentBlock: number;
  onBlockChange: (newBlock: number) => void;
  onPortSelect: (node: NodeData) => void;
  onBack: () => void;
}

export const RackView: React.FC<RackProps> = ({
  nodes,
  activeNode,
  currentBlock,
  onBlockChange,
  onPortSelect,
  onBack
}) => {
  const totalBlocks = 5;

  // Mapeo de letras para patch panels (A hasta I)
  const getPatchLetter = (blockIndex: number, panelIndex: number): string => {
    // blockIndex: 1-5, panelIndex: 0 para primer panel, 1 para segundo panel
    const letterIndex = (blockIndex - 1) * 2 + panelIndex;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    return letters[letterIndex] || '?';
  };

  // Filtrar nodos del bloque actual
  const blockNodes = nodes.filter(n => n.block === currentBlock);
  
  // Función para obtener el nodo en un puerto específico del bloque actual
  const getNodeAtPort = (portInBlock: number): NodeData | undefined => {
    const globalPort = (currentBlock - 1) * 48 + portInBlock;
    return nodes.find(n => n.port === globalPort);
  };

  // Nodos para los patch panels (ordenados por puerto)
  const sortedBlockNodes = [...blockNodes].sort((a, b) => a.port - b.port);
  const firstPatchNodes = sortedBlockNodes.filter(n => {
    const portInBlock = n.port - (currentBlock - 1) * 48;
    return portInBlock >= 1 && portInBlock <= 24;
  });
  const secondPatchNodes = sortedBlockNodes.filter(n => {
    const portInBlock = n.port - (currentBlock - 1) * 48;
    return portInBlock >= 25 && portInBlock <= 48;
  });

  // Navegación
  const goToPrevious = () => onBlockChange(currentBlock - 1);
  const goToNext = () => onBlockChange(currentBlock + 1);

  // Función para obtener el número de puerto físico en el panel (1-24)
  const getPhysicalPortNumber = (portInBlock: number): number => {
    return portInBlock <= 24 ? portInBlock : portInBlock - 24;
  };

  return (
    <div className="view-container slide-in">
      <header className="header-glass">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button className="btn-modern" onClick={onBack}>← VOLVER AL PANEL</button>
          
          {/* Navegador de bloques */}
          <div className="block-navigator" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn-modern" 
              onClick={goToPrevious} 
              disabled={currentBlock === 1}
              style={{ opacity: currentBlock === 1 ? 0.5 : 1 }}
            >
              ←
            </button>
            <span className="status-text" style={{ minWidth: '100px', textAlign: 'center' }}>
              Bloque {currentBlock} / {totalBlocks}
            </span>
            <button 
              className="btn-modern" 
              onClick={goToNext} 
              disabled={currentBlock === totalBlocks}
              style={{ opacity: currentBlock === totalBlocks ? 0.5 : 1 }}
            >
              →
            </button>
          </div>
        </div>

        <div className="status-text">
          {activeNode ? `VINCULADO: ${activeNode.office} [${activeNode.name}]` : "MODO INSPECCIÓN"}
        </div>
      </header>

      <div className="panduit-rack">
        <div className="rack-post left">
          <div className="screw top"></div>
          <div className="screw middle"></div>
          <div className="screw bottom"></div>
        </div>
        <div className="rack-post right">
          <div className="screw top"></div>
          <div className="screw middle"></div>
          <div className="screw bottom"></div>
        </div>

        <div className="rack-content">
          {/* BLOQUE ACTUAL: switch + patch panels (2 excepto bloque 5 que tiene 1) */}
          <div className="rack-block">

            {/* SWITCH 48P - muestra números 1, 2, 3... */}
            <div className="rack-unit hardware-unit">
              <div className="unit-number">{currentBlock}</div>
              <div className="switch-body-real">
                <div className="switch-front-panel">
                  <div className="brand-zone">
                    <span className="brand-name">CISCO CATALYST</span>
                    <span className="brand-model">CORE-3850</span>
                  </div>

                  <div className="ports-matrix-real">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const portInBlock = i + 1;
                      const connectedNode = getNodeAtPort(portInBlock);
                      const isActive = activeNode && activeNode.port === (currentBlock - 1) * 48 + portInBlock;

                      const statusClass = `
                        ${connectedNode ? 'has-connection' : 'empty-port'}
                        ${isActive ? 'active-led' : ''}
                      `;

                      return (
                        <div
                          key={portInBlock}
                          className={`port-led-real ${statusClass}`}
                          onClick={() => connectedNode && onPortSelect(connectedNode)}
                          title={
                            connectedNode
                              ? `${connectedNode.name} (${connectedNode.office})`
                              : `Puerto ${portInBlock} libre`
                          }
                        >
                          <span className="led-number">{portInBlock}</span>
                          <span className="led-indicator"></span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* PRIMER PATCH PANEL (puertos 1-24 del bloque) - Siempre visible */}
            <div className="rack-unit hardware-unit">
              <div className="unit-number">{getPatchLetter(currentBlock, 0)}</div>
              <div className="patch-panel-real">
                <div className="panel-brand">PANDUIT <span>DP24 (Puertos 1-24)</span></div>
                <div className="ports-grid-24">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const portInBlock = idx + 1;
                    const physicalPortNumber = getPhysicalPortNumber(portInBlock);
                    const node = firstPatchNodes.find(n => {
                      const p = n.port - (currentBlock - 1) * 48;
                      return p === portInBlock;
                    });
                    const isActive = activeNode && activeNode.id === node?.id;

                    return node ? (
                      <div
                        key={node.id}
                        className={`patch-port-real ${isActive ? 'active-patch' : ''}`}
                        onClick={() => onPortSelect(node)}
                        title={`${node.name} - ${node.office}`}
                      >
                        <div className="port-id-label">
                          {node.name}
                        </div>
                        <div className="rj45-jack">
                          <div className="jack-pins"></div>
                          <div className="jack-led"></div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={`empty-${portInBlock}`}
                        className="patch-port-real"
                        title={`Puerto ${physicalPortNumber} vacío`}
                      >
                        <div className="port-id-label">
                          --
                        </div>
                        <div className="rj45-jack">
                          <div className="jack-pins"></div>
                          <div className="jack-led" style={{ background: 'var(--led-off)' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SEGUNDO PATCH PANEL (puertos 25-48 del bloque) - Oculto en bloque 5 */}
            {currentBlock < 5 && (
              <div className="rack-unit hardware-unit">
                <div className="unit-number">{getPatchLetter(currentBlock, 1)}</div>
                <div className="patch-panel-real">
                  <div className="panel-brand">PANDUIT <span>DP24 (Puertos 25-48)</span></div>
                  <div className="ports-grid-24">
                    {Array.from({ length: 24 }).map((_, idx) => {
                      const portInBlock = idx + 25; // 25 a 48
                      const physicalPortNumber = getPhysicalPortNumber(portInBlock);
                      const node = secondPatchNodes.find(n => {
                        const p = n.port - (currentBlock - 1) * 48;
                        return p === portInBlock;
                      });
                      const isActive = activeNode && activeNode.id === node?.id;

                      return node ? (
                        <div
                          key={node.id}
                          className={`patch-port-real ${isActive ? 'active-patch' : ''}`}
                          onClick={() => onPortSelect(node)}
                          title={`${node.name} - ${node.office}`}
                        >
                          <div className="port-id-label">
                            {node.name}
                          </div>
                          <div className="rj45-jack">
                            <div className="jack-pins"></div>
                            <div className="jack-led"></div>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={`empty-${portInBlock}`}
                          className="patch-port-real"
                          title={`Puerto ${physicalPortNumber} vacío`}
                        >
                          <div className="port-id-label">
                            --
                          </div>
                          <div className="rj45-jack">
                            <div className="jack-pins"></div>
                            <div className="jack-led" style={{ background: 'var(--led-off)' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};