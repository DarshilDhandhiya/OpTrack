export interface ServerMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
}

export interface ContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  cpu: number;
  memory: number;
}

export interface DeploymentStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'failed';
  replicas: number;
  availableReplicas: number;
  age: string;
}