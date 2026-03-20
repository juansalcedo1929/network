import { NodeData } from './types';

// ============================================
// MAPEO REAL: NODO -> NOMBRE ESPECÍFICO
// Basado en el archivo proporcionado (Oeste/Este)
// Incluye agrupación por islas según solicitud
// ============================================

const NODE_MAP: { [key: string]: string } = {
  // ========== OESTE (Costado Izquierdo) ==========
  // Diputados
  'C-016-C1': 'Dip. Juan Diego Echevarría Ibarra',
  'C-017-C1': 'Dip. Juan Diego Echevarría Ibarra',
  'C-024-C3': 'Dip. Evelin Sánchez Sánchez',
  'D-025-C3': 'Dip. Evelin Sánchez Sánchez',
  'D-033-C4': 'Dip. Liliana Michelle Sánchez Allende',
  'D-035-C4': 'Dip. Liliana Michelle Sánchez Allende',
  'D-031-C5': 'Dip. Julia Andrea González Quiroz',
  'D-030-C5': 'Dip. Julia Andrea González Quiroz',
  'D-038-C6': 'Dip. Gloria Arcelia Miramontes Plantillas',
  'D-041-C6': 'Dip. Gloria Arcelia Miramontes Plantillas',
  'D-040-C6': 'Dip. Gloria Arcelia Miramontes Plantillas',
  'E-024-Z3': 'Dip. Araceli Geraldo Núñez',
  'C-021-C2': 'Dip. Yohana Sarahí Hinojosa Gilvaja',
  'C-022-C2': 'Dip. Yohana Sarahí Hinojosa Gilvaja',
  'C-023-C2': 'Dip. Yohana Sarahí Hinojosa Gilvaja',
  'A-007-A3': 'Dip. Norma Angélica Peñaloza Escobedo',
  'A-008-A3': 'Dip. Norma Angélica Peñaloza Escobedo',
  'A-001-A1': 'Dip. Danny Fidel Mogoyon Pérez',
  'A-002-A1': 'Dip. Danny Fidel Mogoyon Pérez',
  'A-003-A1': 'Dip. Danny Fidel Mogoyon Pérez',
  'A-009-A4': 'Dip. Adrián Humberto Valle Ballesteros',
  'A-010-A4': 'Dip. Adrián Humberto Valle Ballesteros',
  'A-011-A4': 'Dip. Adrián Humberto Valle Ballesteros',
  'A-017-A5': 'Dip. Adriana Padilla Mendoza',
  'A-018-A5': 'Dip. Adriana Padilla Mendoza',
  'A-019-A5': 'Dip. Adriana Padilla Mendoza',
  'B-028-A7': 'Dip. Teresita del Niño Jesús Ruiz Mendoza',
  'B-029-A7': 'Dip. Teresita del Niño Jesús Ruiz Mendoza',
  'B-030-A7': 'Dip. Teresita del Niño Jesús Ruiz Mendoza',
  'B-031-A8': 'Dip. María Tereza Méndez Vélez',
  'B-032-A8': 'Dip. María Tereza Méndez Vélez',
  'B-033-A8': 'Dip. María Tereza Méndez Vélez',

  // Secretarios Técnicos
  'C-020-C1': 'Sec. Técnico Ramón Medina',
  'C-018-C1': 'Sec. Técnico Ramón Medina',
  'C-019-C1': 'Sec. Técnico Ramón Medina',
  'C-027-C3': 'Sec. Técnico Jesús Medina',
  'D-028-C3': 'Sec. Técnico Jesús Medina',
  'D-029-C3A': 'Sec. Técnico Jesús Medina',
  'D-032-C4': 'Sec. Técnico Israel López',
  'D-034-C4': 'Sec. Técnico Israel López',
  'D-037-C4': 'Sec. Técnico Israel López',
  'E-011-C5': 'Sec. Técnico Adriana Domínguez',
  'E-010-C5': 'Sec. Técnico Adriana Domínguez',
  'D-042-C6': 'Sec. Técnico Harry Zatarain',
  'D-039-C6': 'Sec. Técnico Harry Zatarain',
  'E-022-Z2': 'Sec. Técnico Francisco Moreno',
  'E-023-Z2': 'Sec. Técnico Francisco Moreno',
  'E-019-Z2': 'Sec. Técnico Francisco Moreno',
  'E-021-ZAP': 'Sec. Técnico Francisco Moreno',
  'D-043-C7': 'Sec. Técnico Gerardo Salas',
  'D-044-C7': 'Sec. Técnico Gerardo Salas',
  'D-045-C7': 'Sec. Técnico Gerardo Salas',
  'A-022-A6': 'Sec. Técnico José Zatarain',
  'A-023-A6': 'Sec. Técnico José Zatarain',
  'A-024-A6': 'Sec. Técnico José Zatarain',
  'A-004-A2': 'Sec. Técnico Oscar González',
  'A-005-A2': 'Sec. Técnico Oscar González',
  'A-006-A2': 'Sec. Técnico Oscar González',
  'A-013-A4': 'Sec. Técnico Claudio Martínez',
  'A-014-A4': 'Sec. Técnico Claudio Martínez',
  'A-015-A4': 'Sec. Técnico Claudio Martínez',
  'A-020-A5': 'Sec. Técnico Cruz Montoya',
  'A-021-A5': 'Sec. Técnico Cruz Montoya',
  'B-025-A7': 'Sec. Técnico Sergio Gamboa',
  'B-026-A7': 'Sec. Técnico Sergio Gamboa',
  'B-027-A7': 'Sec. Técnico Sergio Gamboa',
  'B-034-A8': 'Sec. Técnico Ricardo Mejorado',
  'B-035-A8': 'Sec. Técnico Ricardo Mejorado',
  'B-036-A8': 'Sec. Técnico Ricardo Mejorado',

  // Otras áreas Oeste
  'B-037-A9': 'Transparencia',
  'B-038-A9': 'Transparencia',
  'B-039-A9': 'Transparencia',
  'B-040-A9': 'Transparencia',
  'B-041-A9': 'Transparencia',
  'G-005-E8': 'Asesores Dip. Blásquez Salinas',
  'G-006-E8': 'Asesores Dip. Blásquez Salinas',
  'G-007-E8': 'Asesores Dip. Blásquez Salinas',
  'I-014-CHEC': 'Asesores Consultoría',

  // ========== ISLAS COSTADO IZQUIERDO (OESTE) ==========
  // ISLA 1 Zona Oeste
  'B-045-B1': 'ISLA 1 Zona Oeste',
  'B-046-B1': 'ISLA 1 Zona Oeste',
  'B-047-B1': 'ISLA 1 Zona Oeste',
  // ISLA 2 Zona Oeste
  'B-048-B2': 'ISLA 2 Zona Oeste',
  'C-001-B2': 'ISLA 2 Zona Oeste',
  'C-002-B2': 'ISLA 2 Zona Oeste',
  // ISLA 3 Zona Oeste
  'C-003-B3': 'ISLA 3 Zona Oeste',
  'C-004-B3': 'ISLA 3 Zona Oeste',
  'C-005-B3': 'ISLA 3 Zona Oeste',
  // ISLA 4 Zona Oeste
  'C-009-B4': 'ISLA 4 Zona Oeste',
  'C-010-B4': 'ISLA 4 Zona Oeste',
  'C-011-B4': 'ISLA 4 Zona Oeste',
  // ISLA 5 Zona Oeste
  'C-006-B5': 'ISLA 5 Zona Oeste',
  'C-007-B5': 'ISLA 5 Zona Oeste',
  'C-008-B5': 'ISLA 5 Zona Oeste',
  // ISLA 6 Zona Oeste
  'C-012-B6': 'ISLA 6 Zona Oeste',
  'C-013-B6': 'ISLA 6 Zona Oeste',
  'C-014-B6': 'ISLA 6 Zona Oeste',

  // ========== ISLAS COSTADO DERECHO (ESTE) ==========
  // ISLA 1 Zona Este
  'D-046-D1': 'ISLA 1 Zona Este',
  'D-047-D1': 'ISLA 1 Zona Este',
  'D-048-D1': 'ISLA 1 Zona Este',
  // ISLA 2 Zona Este
  'E-001-D2': 'ISLA 2 Zona Este',
  'E-002-D2': 'ISLA 2 Zona Este',
  'E-003-D2': 'ISLA 2 Zona Este',
  // ISLA 3 Zona Este
  'E-009-D3': 'ISLA 3 Zona Este',
  'E-005-D3': 'ISLA 3 Zona Este',
  'E-006-D3': 'ISLA 3 Zona Este',
  // ISLA 4 Zona Este
  'E-007-D4': 'ISLA 4 Zona Este',
  'D-026-D4': 'ISLA 4 Zona Este',
  'D-036-D4': 'ISLA 4 Zona Este',
  // ISLA 5 Zona Este
  'E-008-D5': 'ISLA 5 Zona Este',
  'E-012-D5': 'ISLA 5 Zona Este',
  'E-014-D5': 'ISLA 5 Zona Este',
  // ISLA 6 Zona Este
  'E-004-D6': 'ISLA 6 Zona Este',
  'E-013-D6': 'ISLA 6 Zona Este',
  'E-015-D6': 'ISLA 6 Zona Este',

  // ========== ESTE (Resto de áreas) ==========
  'I-001-G8': 'Jefe de Recursos Materiales',
  'H-023-G8': 'Jefe de Recursos Materiales',
  'H-021-G7': 'Secretaria RMT',
  'G-022-G7': 'Secretaria RMT',
  'H-019-G6': 'Administración',
  'H-020-G6': 'Administración',
  'H-018-G5': 'Asesores Morena (Dip. González Quiroz)',
  'H-016-G5': 'Asesores Morena (Dip. González Quiroz)',
  'H-017-G5': 'Asesores Morena (Dip. González Quiroz)',
  'H-015-G4': 'Asesores Morena (Dip. Ang. Hernández)',
  'H-013-G4': 'Asesores Morena (Dip. Ang. Hernández)',
  'H-014-G4': 'Asesores Morena (Dip. Ang. Hernández)',
  'H-010-G3': 'Asesores Movimiento Ciudadano (Dip. García Ruvalcaba)',
  'I-002-G3': 'Asesores Movimiento Ciudadano (Dip. García Ruvalcaba)',
  'I-018-G3': 'Asesores Movimiento Ciudadano (Dip. García Ruvalcaba)',
  'G-011-G2': 'Asesores Morena (Dip. Canton Rocha)',
  'G-010-G2': 'Asesores Morena (Dip. Canton Rocha)',
  'H-006-G1': 'Asesores Morena (Dip. Miramontes Plantillas)',
  'H-007-G1': 'Asesores Morena (Dip. Miramontes Plantillas)',
  'G-002-E6': 'Dirección de Gestión y Transparencia',
  'F-023-E6': 'Dirección de Gestión y Transparencia',
  'G-003-E6': 'Dirección de Gestión y Transparencia',
  'H-004-F5': 'Inventarios',
  'G-023-F5': 'Inventarios',
  'G-024-F5': 'Inventarios',
  'H-002-F5': 'Inventarios',
  'H-003-F5': 'Inventarios',
  'H-001-F5': 'Inventarios',
  'G-016-F4': 'Secretaría Coord. Compras',
  'G-017-F4': 'Secretaría Coord. Compras',
  'G-019-F4': 'Coord. de Adquisición y Compras',
  'G-021-F3': 'Mensajería y Vehículos',
  'G-014-F3': 'Mensajería y Vehículos',
  'G-012-F3': 'Mensajería y Vehículos',
  'F-015-F2': 'Coordinador de Mantenimiento',
  'F-013-F2': 'Coordinador de Mantenimiento',
  'F-018-F2': 'Coordinador de Mantenimiento',
  // Las siguientes dos líneas sobrescriben las asignaciones previas de G-010-F2 y G-011-F2 (Asesores Morena Dip. Canton Rocha)
  'G-010-F2': 'Coordinador de Mantenimiento',
  'G-011-F2': 'Coordinador de Mantenimiento', // Se asume que "GG-011-F2" del listado es un error tipográfico y corresponde a G-011-F2
  'G-008-F1': 'Cuarto de Herramientas de Mantenimiento',
  'G-009-F1': 'Cuarto de Herramientas de Mantenimiento',
  'F-024-E7': 'Asesores Morena (Dip. Alejandro Arregui)',
  'G-001-E7': 'Asesores Morena (Dip. Alejandro Arregui)',
  'G-004-E7': 'Asesores Morena (Dip. Alejandro Arregui)',
  'F-020-E5': 'Asesores Morena (Dip. Eligio Valencia)',
  'F-021-E5': 'Asesores Morena (Dip. Eligio Valencia)',
  'F-022-E5': 'Asesores Morena (Dip. Eligio Valencia)',
  'F-016-E4': 'Comisión de Gobernación, Legislación y Puntos Const.',
  'F-019-E4': 'Comisión de Gobernación, Legislación y Puntos Const.',
  'F-004-E4': 'Comisión de Gobernación, Legislación y Puntos Const.',
  'F-015-E4': 'Comisión de Gobernación, Legislación y Puntos Const.',
  'F-008-E3': 'Asesores Morena (Dip. Dunnia Montserrat)',
  'F-013-E3': 'Asesores Morena (Dip. Dunnia Montserrat)',
  'F-012-E3': 'Asesores Morena (Dip. Dunnia Montserrat)',
  'F-009-E3': 'Asesores Morena (Dip. Dunnia Montserrat)',
  'F-011-E3': 'Asesores Morena (Norma Peñaloza)',
  'F-010-E3': 'Asesores Morena (Norma Peñaloza)',
  'F-005-E2': 'Asesores Morena (Norma Peñaloza)',
  'F-006-E2': 'Asesores Morena (Norma Peñaloza)',
  'F-007-E2': 'Asesores Morena (Norma Peñaloza)',
  'F-004-E1': 'Asesores Morena (Dip. Michelle Sánchez)',
  'F-003-E1': 'Asesores Morena (Dip. Michelle Sánchez)',
  'F-001-E1': 'Asesores Morena (Dip. Michelle Sánchez)',
  'F-002-E1': 'Asesores Morena (Dip. Michelle Sánchez)',

  // ========== PUNTOS DE ACCESO (WAP) no listados en el archivo ==========
  'I-016-ABAP': 'WAP Pasillo Central',
  'I-017-EAP': 'WAP Comedor / Escaleras',
};

// ============================================
// DEFINICIÓN DE PANELES (LABELS)
// El orden de los labels respeta la disposición física de los puertos en los switches.
// ============================================

const b1Labels = ['A-001-A1', 'A-002-A1', 'A-003-A1', 'A-004-A2', 'A-005-A2', 'A-006-A2', 'A-007-A3', 'A-008-A3', 'A-009-A4', 'A-010-A4', 'A-011-A4', null, 'A-013-A4', 'A-014-A4', 'A-015-A4', 'A-016-A5', 'A-017-A5', 'A-018-A5', 'A-019-A5', 'A-020-A5', 'A-021-A5', 'A-022-A6', 'A-023-A6', 'A-024-A6', 'B-025-A7', 'B-026-A7', 'B-027-A7', 'B-028-A7', 'B-029-A7', 'B-030-A7', 'B-031-A8', 'B-032-A8', 'B-033-A8', 'B-034-A8', 'B-035-A8', 'B-036-A8', 'B-037-A9', 'B-038-A9', 'B-039-A9', 'B-040-A9', 'B-041-A9', null, null, null, 'B-045-B1', 'B-046-B1', 'B-047-B1', 'B-048-B2'];

const b2Labels = ['C-001-B2', 'C-002-B2', 'C-003-B3', 'C-004-B3', 'C-005-B3', 'C-006-B5', 'C-007-B5', 'C-008-B5', 'C-009-B4', 'C-010-B4', 'C-011-B4', 'C-012-B6', 'C-013-B6', 'C-014-B6', 'C-015-B7', 'C-016-C1', 'C-017-C1', 'C-018-C1', 'C-019-C1', 'C-020-C1', 'C-021-C2', 'C-022-C2', 'C-023-C2', 'C-024-C3', 'D-025-C3', 'D-026-D4', 'D-027-C3', 'D-028-C3', 'D-029-C3', 'D-030-C5', 'D-031-C5', 'D-032-C4', 'D-033-C4', 'D-034-C4', 'D-035-C4', 'D-036-D4', 'D-037-C4', 'D-038-C6', 'D-039-C6', 'D-040-C6', 'D-041-C6', 'D-042-C6', 'D-043-C7', 'D-044-C7', 'D-045-C7', 'D-046-D1', 'D-047-D1', 'D-048-D1'];

const b3Labels = ['E-001-D2', 'E-002-D2', 'E-003-D2', 'E-004-D6', 'E-005-D3', 'E-006-D3', 'E-007-D4', 'E-008-D5', 'E-009-D3', 'E-010-C5', 'E-011-C5', 'E-012-D5', 'E-013-D6', 'E-014-D5', 'E-015-D6', 'E-016-Z1', 'E-017-Z1', 'E-018-Z1', 'E-019-Z2', 'E-020-Z2', 'E-021-ZAP', 'E-022-Z2', 'E-023-Z2', 'E-024-Z3', 'F-001-E1', 'F-002-E1', 'F-003-E1', 'F-004-E1', 'F-005-E2', 'F-006-E2', 'F-007-E2', 'F-008-E3', 'F-009-E3', 'F-010-E3', 'F-011-E3', 'F-012-E3', 'F-013-E3', 'F-014-E4', 'F-015-E4', 'F-016-E4', 'F-017-E4', 'F-018-E4', 'F-019-E4', 'F-020-E5', 'F-021-E5', 'F-022-E5', 'F-023-E6', 'F-024-E7'];

const b4Labels = ['G-001-E7', 'G-002-E6', 'G-003-E6', 'G-004-E7', 'G-005-E8', 'G-006-E8', 'G-007-E8', 'G-008-F1', 'G-009-F1', 'G-010-F2', 'G-011-F2', 'G-012-F3', 'G-013-F2', 'G-014-F3', 'G-015-F2', 'G-016-F4', 'G-017-F4', 'G-018-F2', 'G-019-F4', 'G-020-F4', 'G-021-F3', 'G-022-F4', 'G-023-F5', 'G-024-F5', 'H-001-F5', 'H-002-F5', 'H-003-F5', 'H-004-F5', null, 'H-006-G1', 'H-007-G1', 'H-008-G2', 'H-009-G2', 'H-010-G3', null, 'H-012-FGAP', 'H-013-G4', 'H-014-G4', 'H-015-G4', 'H-016-G5', 'H-017-G5', 'H-018-G5', 'H-019-G6', 'H-020-G6', 'H-021-G7', 'H-022-G7', 'H-023-G8', 'H-024-CHEC'];

const b5Labels = ['I-001-G8', 'I-002-G3', null, null, null, null, null, null, null, null, null, null, 'I-013-H3', 'I-014-CHEC', 'I-015-H2', 'I-016-ABAP', 'I-017-EAP', 'I-018-G3', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

// ============================================
// FUNCIÓN GENERADORA DE NODOS
// ============================================

const generateNodesFromArrays = (block: number, labels: (string | null)[]): NodeData[] => {
  const nodes: NodeData[] = [];
  labels.forEach((label, index) => {
    if (label !== null) {
      const portInBlock = index + 1;
      const globalPort = (block - 1) * 48 + portInBlock;

      nodes.push({
        id: `node-${block}-${portInBlock}`,
        name: label,
        office: NODE_MAP[label] || `Nodo ${label} (Sin Asignar)`,
        x: 0,
        y: 0,
        rackId: `R${block}`,
        unit: 10 + block,
        port: globalPort,
        block: block,
        status: 'online',
      });
    }
  });
  return nodes;
};

export const NODES: NodeData[] = [
  ...generateNodesFromArrays(1, b1Labels),
  ...generateNodesFromArrays(2, b2Labels),
  ...generateNodesFromArrays(3, b3Labels),
  ...generateNodesFromArrays(4, b4Labels),
  ...generateNodesFromArrays(5, b5Labels),
];

export const AREAS_SIN_NODO = [
  "Site Informática", "Comedor", "Baños", "Cuarto de Limpieza", "Elevadores", "Sala de Juntas B"
];