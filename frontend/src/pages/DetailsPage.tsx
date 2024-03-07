import { useEffect, useState } from 'react';
import SleepChart from '../components/SleepChart';
import SleepTable from '../components/SleepTable';
import { TableData } from '../types';
import { useSearchParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const DetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const selectedName = searchParams.get('name');

  const handleRowClick = (name: string) => setSearchParams({ name });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsTableLoaded(false);
      const response = await fetch(`${apiUrl}/api/sleeps`);
      const data = await response.json();

      setTableData(data);
      setIsTableLoaded(true);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isTableLoaded ? (
        <SleepTable data={tableData} handleRowClick={handleRowClick} />
      ) : (
        <div>Loading...</div>
      )}
      {selectedName ? (
        <SleepChart name={selectedName} />
      ) : (
        <div>Select a row from the table to display the chart</div>
      )}
    </div>
  );
};
export default DetailsPage;
