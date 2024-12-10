import React from 'react';
import { ContainerStatus } from '../types/dashboard';
import { Box, CircleDot, AlertTriangle } from 'lucide-react';

interface ContainerListProps {
  containers: ContainerStatus[];
}

export const ContainerList: React.FC<ContainerListProps> = ({ containers }) => {
  const getStatusIcon = (status: ContainerStatus['status']) => {
    switch (status) {
      case 'running':
        return <CircleDot className="text-green-500" />;
      case 'stopped':
        return <Box className="text-gray-500" />;
      case 'error':
        return <AlertTriangle className="text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Containers</h3>
        <div className="mt-4">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {containers.map((container) => (
                <li key={container.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(container.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {container.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Uptime: {container.uptime}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-sm text-gray-500">
                        CPU: {container.cpu}% | Memory: {container.memory}MB
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};