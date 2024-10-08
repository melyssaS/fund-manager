import DataTable from 'react-data-table-component';
import { Transaction } from '../../models/models';


interface TransactionTableProps{
  transactions: Transaction[];
}

function TransactionTable({transactions}: TransactionTableProps) {

  const columns = [
    {
      name: 'Fondo',
      selector: (row: Transaction) => row.fund._id,
      cell: (row: Transaction) => <span className="text-gray-800">{row.fund.name}</span>,
    },
    {
      name: 'Tipo',
      selector: (row: Transaction) => row.type,
      cell: (row: Transaction) => (
        <span className="text-gray-600 capitalize">{row.type}</span>
      ),
    },
    {
      name: 'Fecha',
      selector: (row: Transaction) => row.date,
      sortable: true,
      cell: (row: Transaction) => (
        <span className="text-gray-600">{new Date(row.date).toLocaleDateString()}</span>
      ),
    },
    {
      name: 'Balance',
      selector: (row: Transaction) => row.amount,
      cell: (row: Transaction) => (
        <span className="text-gray-600">${row.amount.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <h1 className="text-blue-500 text-xl font-semibold p-4">Historial de Transacciones</h1>
      <DataTable
        columns={columns}
        data={transactions}
        pagination 
        paginationPerPage={5} 
        paginationRowsPerPageOptions={[5, 10, 15, 20]} 
        highlightOnHover
        striped
        responsive
        fixedHeader
        persistTableHead={true}
        noDataComponent={<div className="text-center text-gray-500 py-4">No hay datos disponibles</div>}
        customStyles={{
          header: {
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#4A5568',
            },
          },
          headRow: {
            style: {
              backgroundColor: '#EDF2F7',
            },
          },
          cells: {
            style: {
              padding: '8px 16px',
            },
          },
        }}
      />
    </div>
  );
}

export default TransactionTable;
