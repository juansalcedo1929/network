export interface NodeData {
  id: string;
  name: string;
  office: string;
  x: number;
  y: number;
  rackId: string;
  unit: number;
  port: number;
  block: number;
  status: 'online' | 'offline';
}