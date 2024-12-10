import { ServerMetric, ContainerStatus, DeploymentStatus } from '../types/dashboard';

export const generateServerMetrics = (): ServerMetric[] => {
  const metrics: ServerMetric[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    metrics.push({
      timestamp: new Date(now.getTime() - i * 3600000).toISOString(),
      cpu: Math.random() * 100,
      memory: 40 + Math.random() * 40,
      network: Math.random() * 1000
    });
  }
  
  return metrics.reverse();
};

export const mockContainers: ContainerStatus[] = [
  {
    id: 'web-1',
    name: 'web-server',
    status: 'running',
    uptime: '2d 5h',
    cpu: 45,
    memory: 512
  },
  {
    id: 'db-1',
    name: 'database',
    status: 'running',
    uptime: '5d 12h',
    cpu: 65,
    memory: 1024
  },
  {
    id: 'cache-1',
    name: 'redis-cache',
    status: 'stopped',
    uptime: '0',
    cpu: 0,
    memory: 0
  }
];

export const mockDeployments: DeploymentStatus[] = [
  {
    name: 'frontend',
    status: 'healthy',
    replicas: 3,
    availableReplicas: 3,
    age: '2d'
  },
  {
    name: 'backend',
    status: 'degraded',
    replicas: 5,
    availableReplicas: 4,
    age: '5d'
  },
  {
    name: 'worker',
    status: 'healthy',
    replicas: 2,
    availableReplicas: 2,
    age: '1d'
  }
];