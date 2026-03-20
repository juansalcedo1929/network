import React, { useState } from 'react';
import { NodeData } from './types';

interface PhysicalMapProps {
  nodes: NodeData[];
  areasSinNodo: string[];
  onSelectOffice: (node: NodeData) => void;
}

// Interfaz para agrupar nodos por oficina
interface OfficeGroup {
  office: string;
  nodes: NodeData[];
  blocks: number[];
  labels: string[];
}

// ============================================
// ORDEN FÍSICO DE LAS OFICINAS (OESTE → ESTE)
// ============================================
const OFFICE_ORDER = [
  // ========== OESTE ==========
  // Diputados Oeste
  'Dip. Juan Diego Echevarría Ibarra',
  'Dip. Evelin Sánchez Sánchez',
  'Dip. Liliana Michelle Sánchez Allende',
  'Dip. Julia Andrea González Quiroz',
  'Dip. Gloria Arcelia Miramontes Plantillas',
  'Dip. Araceli Geraldo Núñez',
  'Dip. Yohana Sarahí Hinojosa Gilvaja',
  'Dip. Norma Angélica Peñaloza Escobedo',
  'Dip. Danny Fidel Mogoyon Pérez',
  'Dip. Adrián Humberto Valle Ballesteros',
  'Dip. Adriana Padilla Mendoza',
  'Dip. Teresita del Niño Jesús Ruiz Mendoza',
  'Dip. María Tereza Méndez Vélez',
  
  // Secretarios Técnicos Oeste
  'Sec. Técnico Ramón Medina',
  'Sec. Técnico Jesús Medina',
  'Sec. Técnico Israel López',
  'Sec. Técnico Adriana Domínguez',
  'Sec. Técnico Harry Zatarain',
  'Sec. Técnico Francisco Moreno',
  'Sec. Técnico Gerardo Salas',
  'Sec. Técnico José Zatarain',
  'Sec. Técnico Oscar González',
  'Sec. Técnico Claudio Martínez',
  'Sec. Técnico Cruz Montoya',
  'Sec. Técnico Sergio Gamboa',
  'Sec. Técnico Ricardo Mejorado',
  
  // Otras áreas Oeste
  'Transparencia',
  'Asesores Dip. Blásquez Salinas',
  'Asesores Consultoría',
  
  // ========== ISLAS OESTE ==========
  'ISLA 1 Zona Oeste',
  'ISLA 2 Zona Oeste',
  'ISLA 3 Zona Oeste',
  'ISLA 4 Zona Oeste',
  'ISLA 5 Zona Oeste',
  'ISLA 6 Zona Oeste',
  
  // ========== ISLAS ESTE ==========
  'ISLA 1 Zona Este',
  'ISLA 2 Zona Este',
  'ISLA 3 Zona Este',
  'ISLA 4 Zona Este',
  'ISLA 5 Zona Este',
  'ISLA 6 Zona Este',
  
  // ========== ESTE ==========
  // Dirección y Administración
  'Jefe de Recursos Materiales',
  'Secretaria RMT',
  'Administración',
  'Dirección de Gestión y Transparencia',
  'Coordinador de Mantenimiento',
  'Cuarto de Herramientas de Mantenimiento',
  
  // Asesores Este
  'Asesores Morena (Dip. González Quiroz)',
  'Asesores Morena (Dip. Ang. Hernández)',
  'Asesores Morena (Dip. Canton Rocha)',
  'Asesores Morena (Dip. Miramontes Plantillas)',
  'Asesores Morena (Dip. Alejandro Arregui)',
  'Asesores Morena (Dip. Eligio Valencia)',
  'Asesores Morena (Dip. Dunnia Montserrat)',
  'Asesores Morena (Norma Peñaloza)',
  'Asesores Morena (Dip. Michelle Sánchez)',
  'Asesores Movimiento Ciudadano (Dip. García Ruvalcaba)',
  
  // Operaciones Este
  'Inventarios',
  'Secretaría Coord. Compras',
  'Coord. de Adquisición y Compras',
  'Mensajería y Vehículos',
  'Comisión de Gobernación, Legislación y Puntos Const.',
  
  // Puntos de Acceso
  'WAP Pasillo Central',
  'WAP Comedor / Escaleras'
];

export const PhysicalMapView: React.FC<PhysicalMapProps> = ({ nodes, areasSinNodo, onSelectOffice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUnassignedModal, setShowUnassignedModal] = useState(false);

  // Agrupar nodos por oficina
  const officeMap = new Map<string, OfficeGroup>();
  
  // Separar nodos asignados y no asignados
  const assignedNodes: NodeData[] = [];
  const unassignedNodes: NodeData[] = [];
  
  nodes.forEach(node => {
    if (node.office.includes('(Sin Asignar)')) {
      unassignedNodes.push(node);
    } else {
      assignedNodes.push(node);
    }
  });

  // Agrupar nodos asignados por oficina
  assignedNodes.forEach(node => {
    const office = node.office;
    if (!officeMap.has(office)) {
      officeMap.set(office, {
        office,
        nodes: [],
        blocks: [],
        labels: []
      });
    }
    const group = officeMap.get(office)!;
    group.nodes.push(node);
    if (!group.blocks.includes(node.block)) {
      group.blocks.push(node.block);
    }
    group.labels.push(node.name);
  });

  // Crear grupo especial para nodos no asignados
  if (unassignedNodes.length > 0) {
    // Obtener bloques únicos sin usar Set
    const uniqueBlocks: number[] = [];
    unassignedNodes.forEach(node => {
      if (!uniqueBlocks.includes(node.block)) {
        uniqueBlocks.push(node.block);
      }
    });

    officeMap.set('🔴 Nodos Sin Asignar', {
      office: '🔴 Nodos Sin Asignar',
      nodes: unassignedNodes,
      blocks: uniqueBlocks,
      labels: unassignedNodes.map(n => n.name)
    });
  }

  // Obtener todas las oficinas agrupadas
  const officeGroups = Array.from(officeMap.values());
  
  // Crear un mapa para acceso rápido
  const officeMapByTitle = new Map(
    officeGroups.map(group => [group.office, group])
  );

  // Separar el grupo de no asignados
  const unassignedGroup = officeMapByTitle.get('🔴 Nodos Sin Asignar');
  
  // Ordenar las oficinas según OFFICE_ORDER (solo las que existen)
  const orderedOffices = OFFICE_ORDER
    .filter(officeTitle => officeMapByTitle.has(officeTitle) && officeTitle !== '🔴 Nodos Sin Asignar')
    .map(officeTitle => officeMapByTitle.get(officeTitle)!);

  // Agregar oficinas que no están en OFFICE_ORDER al final
  const unlistedOffices = officeGroups
    .filter(group => !OFFICE_ORDER.includes(group.office) && group.office !== '🔴 Nodos Sin Asignar')
    .sort((a, b) => a.office.localeCompare(b.office));

  // Construir el orden final: oficinas ordenadas + no listadas + no asignados (al final)
  const finalOrderedGroups = [
    ...orderedOffices, 
    ...unlistedOffices,
    ...(unassignedGroup ? [unassignedGroup] : [])
  ];

  // Filtrar grupos basado en el término de búsqueda
  const filteredGroups = finalOrderedGroups.filter(group => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Buscar en el nombre de la oficina
    if (group.office.toLowerCase().includes(searchLower)) return true;
    
    // Buscar en los labels (nodos)
    if (group.labels.some(label => label.toLowerCase().includes(searchLower))) return true;
    
    // Buscar en los bloques
    if (group.blocks.some(block => block.toString().includes(searchTerm))) return true;
    
    return false;
  });

  const totalOffices = officeGroups.length - (unassignedGroup ? 1 : 0);
  const totalNodes = assignedNodes.length;

  return (
    <div className="view-container fade-in">
      {/* Modal de nodos sin asignar */}
      {showUnassignedModal && (
        <div className="modal-overlay" onClick={() => setShowUnassignedModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nodos Sin Asignar ({unassignedNodes.length})</h2>
              <button className="modal-close" onClick={() => setShowUnassignedModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <table className="unassigned-table">
                <thead>
                  <tr>
                    <th>Nodo</th>
                    <th>Bloque</th>
                    <th>Rack</th>
                    <th>Puerto</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {unassignedNodes.map(node => (
                    <tr key={node.id}>
                      <td><span className="node-badge">{node.name}</span></td>
                      <td>Bloque {node.block}</td>
                      <td>{node.rackId}</td>
                      <td>Puerto {node.port}</td>
                      <td>
                        <button 
                          className="action-button"
                          onClick={() => {
                            onSelectOffice(node);
                            setShowUnassignedModal(false);
                          }}
                        >
                          Ver en rack
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Header con estadísticas */}
      <div className="map-header">
        <div className="header-title">
          <h1>Mapa Físico de Oficinas</h1>
          <p>Selecciona una oficina para ver su conexión en el rack</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-value">{totalOffices}</span>
            <span className="stat-label">Oficinas</span>
          </div>
          <div className="stat-badge">
            <span className="stat-value">{totalNodes}</span>
            <span className="stat-label">Nodos</span>
          </div>
          <div 
            className="stat-badge clickable" 
            onClick={() => setShowUnassignedModal(true)}
          >
            <span className="stat-value">{unassignedNodes.length}</span>
            <span className="stat-label">Sin asignar</span>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda mejorada */}
      <div className="search-container">
        <div className="search-wrapper">
          <div className="search-icon-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-0.59 4.23-1.57L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" fill="currentColor"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nodo, oficina, bloque... Ej: A-001, Diputado, Bloque 2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="search-clear-button"
              onClick={() => setSearchTerm('')}
              aria-label="Limpiar búsqueda"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="search-results-badge">
            <span className="results-count">{filteredGroups.length}</span>
            <span className="results-label">resultados</span>
          </div>
        )}
      </div>

      <div className="main-layout modern-layout">
        {/* Grid de oficinas */}
        <section className="nodes-grid">
          <div className="grid-header">
            <h3>Oficinas con conectividad</h3>
            <span className="grid-count">
              {searchTerm 
                ? `${filteredGroups.length} de ${totalOffices + (unassignedGroup ? 1 : 0)} grupos` 
                : `${totalOffices} oficinas`}
            </span>
          </div>
          
          <div className="cards-grid">
            {filteredGroups.map(group => {
              const multipleBlocks = group.blocks.length > 1;
              const firstNode = group.nodes[0];
              const isUnassigned = group.office === '🔴 Nodos Sin Asignar';

              // Función para renderizar texto con resaltado
              const renderHighlightedText = (text: string, search: string) => {
                if (!search) return text;
                
                const parts = text.split(new RegExp(`(${search})`, 'gi'));
                return (
                  <>
                    {parts.map((part, i) => 
                      part.toLowerCase() === search.toLowerCase() 
                        ? <mark key={i} className="search-highlight">{part}</mark> 
                        : part
                    )}
                  </>
                );
              };

              return (
                <div 
                  key={group.office}
                  className={`office-card ${isUnassigned ? 'unassigned-card' : ''} ${searchTerm ? 'highlight-card' : ''}`}
                  onClick={() => {
                    if (isUnassigned) {
                      setShowUnassignedModal(true);
                    } else {
                      onSelectOffice(firstNode);
                    }
                  }}
                >
                  <div className="card-header">
                    <span className="card-id">
                      {renderHighlightedText(group.office, searchTerm)}
                    </span>
                    <div className={`status-indicator ${isUnassigned ? 'warning' : 'online'}`}>
                      <span className="status-dot"></span>
                      <span className="status-text">
                        {isUnassigned ? `${group.nodes.length} sin asignar` : 'conectado'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <div className="office-labels">
                      {group.labels.slice(0, 6).map((label, idx) => (
                        <span key={idx} className="label-chip">
                          {renderHighlightedText(label, searchTerm)}
                        </span>
                      ))}
                      {group.labels.length > 6 && (
                        <span className="label-chip more">+{group.labels.length - 6}</span>
                      )}
                    </div>
                    <div className="office-blocks">
                      <span className="block-info">
                        {multipleBlocks ? 'Bloques: ' : 'Bloque: '}
                        {group.blocks.sort((a, b) => a - b).map((block, index, array) => (
                          <React.Fragment key={block}>
                            <span>
                              {searchTerm && block.toString().includes(searchTerm) 
                                ? <mark className="search-highlight">{block}</mark>
                                : block
                              }
                            </span>
                            {index < array.length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="connection-line"></div>
                    <span className="connection-detail">
                      {isUnassigned ? '👁️ Ver detalles' : '🔗 Ver en rack'}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredGroups.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <p>No se encontraron resultados para <strong>"{searchTerm}"</strong></p>
                <button className="clear-search-button" onClick={() => setSearchTerm('')}>
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Panel lateral simplificado */}
        <aside className="info-panel">
          <div className="panel-header">
            <h3>Información</h3>
          </div>

          <div className="legend-section">
            <h4>Leyenda</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-dot online"></div>
                <span>Oficina con nodo(s)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot selected"></div>
                <span>Múltiples bloques</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot warning"></div>
                <span>Nodos sin asignar</span>
              </div>
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-row">
              <span>Nodos asignados</span>
              <span className="stat-number">{totalNodes}</span>
            </div>
            <div className="stat-row">
              <span>Oficinas distintas</span>
              <span className="stat-number">{totalOffices}</span>
            </div>
            <div className="stat-row clickable" onClick={() => setShowUnassignedModal(true)}>
              <span>Nodos sin asignar</span>
              <span className="stat-number warning">{unassignedNodes.length}</span>
            </div>
          </div>

          {searchTerm && (
            <div className="search-tips">
              <h4>Tips de búsqueda</h4>
              <ul>
                <li>✏️ Busca por nombre de nodo: <code>A-001</code></li>
                <li>🏢 Busca por oficina: <code>Diputado</code></li>
                <li>🔢 Busca por bloque: <code>2</code></li>
                <li>📋 Búsqueda no sensible a mayúsculas</li>
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Estilos del modal y buscador */}
      <style>{`
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 900px;
          max-height: 80vh;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #1f2937;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 2rem;
          line-height: 1;
          color: #6b7280;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background-color: #f3f4f6;
          color: #1f2937;
        }

        .modal-body {
          padding: 2rem;
          overflow-y: auto;
        }

        .unassigned-table {
          width: 100%;
          border-collapse: collapse;
        }

        .unassigned-table th {
          text-align: left;
          padding: 0.75rem;
          background-color: #f9fafb;
          color: #6b7280;
          font-weight: 600;
          font-size: 0.875rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .unassigned-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }

        .unassigned-table tr:hover td {
          background-color: #f9fafb;
        }

        .node-badge {
          background-color: #e5e7eb;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          display: inline-block;
        }

        .action-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .action-button:hover {
          background-color: #2563eb;
        }

        /* Search Styles */
        .search-container {
          margin: 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon-wrapper {
          position: absolute;
          left: 1rem;
          color: #9ca3af;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s;
          background-color: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-clear-button {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .search-clear-button:hover {
          background-color: #f3f4f6;
          color: #4b5563;
        }

        .search-results-badge {
          background-color: #e5e7eb;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .results-count {
          background-color: #3b82f6;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-weight: 600;
        }

        .results-label {
          color: #4b5563;
        }

        /* Card Styles */
        .office-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .office-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #3b82f6;
        }

        .office-card.highlight-card {
          border-color: #3b82f6;
          background-color: #f0f9ff;
        }

        .office-card.unassigned-card {
          background-color: #fff7ed;
          border-color: #f97316;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-id {
          font-weight: 600;
          color: #1f2937;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
        }

        .status-indicator.online {
          background-color: #d1fae5;
          color: #065f46;
        }

        .status-indicator.warning {
          background-color: #ffedd5;
          color: #9a3412;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .online .status-dot {
          background-color: #10b981;
        }

        .warning .status-dot {
          background-color: #f97316;
        }

        .office-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .label-chip {
          background-color: #f3f4f6;
          color: #4b5563;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .label-chip.more {
          background-color: #e5e7eb;
          color: #374151;
        }

        .search-highlight {
          background-color: #fef08a;
          color: #854d0e;
          font-weight: 600;
          padding: 0 2px;
          border-radius: 2px;
        }

        .office-blocks {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .card-footer {
          display: flex;
          justify-content: flex-end;
        }

        .connection-detail {
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* No Results */
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          background-color: #f9fafb;
          border-radius: 12px;
        }

        .no-results-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .clear-search-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.2s;
        }

        .clear-search-button:hover {
          background-color: #2563eb;
        }

        /* Search Tips */
        .search-tips {
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f9fafb;
          border-radius: 8px;
        }

        .search-tips h4 {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .search-tips ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .search-tips li {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .search-tips code {
          background-color: #e5e7eb;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #374151;
        }

        /* Clickable stats */
        .clickable {
          cursor: pointer;
          transition: all 0.2s;
        }

        .clickable:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        .stat-row.clickable:hover {
          background-color: #f3f4f6;
          border-radius: 6px;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Existing styles */
        .view-container {
          padding: 1.5rem;
        }

        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-stats {
          display: flex;
          gap: 1rem;
        }

        .stat-badge {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 2rem;
        }

        .grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }

        .info-panel {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          height: fit-content;
        }

        .legend-section {
          margin: 1.5rem 0;
        }

        .legend-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .legend-dot.online {
          background-color: #10b981;
        }

        .legend-dot.selected {
          background-color: #3b82f6;
        }

        .legend-dot.warning {
          background-color: #f97316;
        }

        .quick-stats {
          margin-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 1.5rem;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .stat-number {
          font-weight: 600;
          color: #1f2937;
        }

        .stat-number.warning {
          color: #f97316;
        }
      `}</style>
    </div>
  );
};