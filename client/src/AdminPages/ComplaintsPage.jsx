import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const mockComplaints = [
  {
    id: '1',
    userId: 'user123',
    userName: 'John Smith',
    type: 'Pest Control',
    description: 'Severe locust infestation in wheat fields requiring immediate attention',
    status: 'pending',
    createdAt: '2024-03-14T15:30:00Z'
  },
  {
    id: '2',
    userId: 'user456',
    userName: 'Maria Garcia',
    type: 'Irrigation',
    description: 'Water supply issues affecting crop irrigation in sector B',
    status: 'in-progress',
    createdAt: '2024-03-13T10:15:00Z'
  },
  {
    id: '3',
    userId: 'user789',
    userName: 'David Chen',
    type: 'Equipment',
    description: 'Harvester malfunction causing delays in crop collection',
    status: 'resolved',
    createdAt: '2024-03-12T09:45:00Z'
  }
];

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState(mockComplaints);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Complaints</h1>
      <div className="grid gap-6">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{complaint.type}</h3>
                  <p className="text-sm text-gray-500">Reported by: {complaint.userName}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
              </span>
            </div>
            <p className="mt-4 text-gray-600">{complaint.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              Submitted: {new Date(complaint.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage; 