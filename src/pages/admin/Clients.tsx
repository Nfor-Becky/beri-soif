import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase'; // Ensure this is the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log('Attempting to fetch clients...');
        const clientsCollection = collection(firestore, 'users');
        console.log('Collection Reference:', clientsCollection);
        
        const clientSnapshot = await getDocs(clientsCollection);
        console.log('Client Snapshot:', clientSnapshot);

        const clientList = clientSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log('Fetched Clients:', clientList);
        setClients(clientList);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error fetching clients: {error}</div>;
  }

  return (
    <div>
      <table className="mt-4 border-collapse border border-gray-200 w-full rounded-xl">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Client Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Created At</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td className="border border-gray-300 p-2">{client.id}</td>
              <td className="border border-gray-300 p-2">{client.email}</td>
              <td className="border border-gray-300 p-2">{client.createdAt?.toDate().toString()}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;