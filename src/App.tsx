import React, { useState, useEffect } from 'react';
import { MetricsChart } from './components/MetricsChart';
import { ContainerList } from './components/ContainerList';
import { DeploymentStatusList } from './components/DeploymentStatus';
import { generateServerMetrics, mockContainers, mockDeployments } from './data/mockData';
import { ServerMetric } from './types/dashboard';
import { Activity } from 'lucide-react';

function App() {
  const [metrics, setMetrics] = useState<ServerMetric[]>(generateServerMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = [...prev.slice(1)];
        const lastTimestamp = new Date(prev[prev.length - 1].timestamp);
        newMetrics.push({
          timestamp: new Date(lastTimestamp.getTime() + 3600000).toISOString(),
          cpu: Math.random() * 100,
          memory: 40 + Math.random() * 40,
          network: Math.random() * 1000
        });
        return newMetrics;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-3xl font-bold leading-tight text-gray-900">
                DevOps Dashboard
              </h1>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Server Metrics</h2>
                <MetricsChart data={metrics} />
              </div>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ContainerList containers={mockContainers} />
                <DeploymentStatusList deployments={mockDeployments} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;