import { useEffect, useState } from 'react';
import SleepChart from '../components/SleepChart';
import SleepTable from '../components/SleepTable';
import { TableData } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;

const DetailsPage = () => {
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [data, setData] = useState<TableData[]>([]);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsTableLoaded(false);
      const response = await fetch(`${apiUrl}/api/sleeps`);
      const data = await response.json();

      setData(data);
      setIsTableLoaded(true);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isTableLoaded ? (
        <SleepTable data={data} handleRowClick={setSelectedName} />
      ) : (
        <div>Loading...</div>
      )}
      {selectedName && <SleepChart />}
    </div>
  );
};
export default DetailsPage;
