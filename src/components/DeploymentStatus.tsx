import React from 'react';
import { DeploymentStatus } from '../types/dashboard';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface DeploymentStatusProps {
  deployments: DeploymentStatus[];
}

export const DeploymentStatusList: React.FC<DeploymentStatusProps> = ({ deployments }) => {
  const getStatusIcon = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="text-green-500" />;
      case 'degraded':
        return <AlertCircle className="text-yellow-500" />;
      case 'failed':
        return <XCircle className="text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Deployments</h3>
        <div className="mt-4">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {deployments.map((deployment) => (
                <li key={deployment.name} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(deployment.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {deployment.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: {deployment.age}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-sm text-gray-500">
                        Replicas: {deployment.availableReplicas}/{deployment.replicas}
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