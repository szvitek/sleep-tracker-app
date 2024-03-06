import { TableData } from '../types';

type TableDataProps = {
  data: TableData[];
  handleRowClick: (name: string) => void;
};

const SleepTable = ({ data, handleRowClick }: TableDataProps) => {
  return (
    <div className="flex items-center flex-col w-2/3">
      <h1 className="text-xl mb-4">Sleeps</h1>
      {data.length ? (
        <table className="border-collapse border border-slate-500 table-auto w-full">
          <thead className="bg-slate-500">
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Number of rows</th>
            </tr>
          </thead>
          <tbody className="bg-slate-300">
            {data.map((entry) => (
              <tr
                key={entry._id.name}
                className="hover:bg-slate-500 cursor-pointer"
                onClick={() => handleRowClick(entry._id.name)}
              >
                <td>{entry._id.name}</td>
                <td>{entry._id.gender}</td>
                <td>{entry.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data to diplay</div>
      )}
    </div>
  );
};
export default SleepTable;
