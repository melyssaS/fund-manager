import DataTable from 'react-data-table-component';
import { OpenFund } from '../../models/models';

interface OpenFundTableProps{
  openFunds: OpenFund[];
}

function OpenFundTable({openFunds}: OpenFundTableProps) {

  const columns = [
    {
      name: 'Fondo',
      selector: (row: OpenFund) => row.fund.name,
      sortable: true,
      cell: (row: OpenFund) => <span className="text-gray-800">{row.fund.name}</span>,
    },
    {
      name: 'Inversión',
      selector: (row: OpenFund) => row.amountInvested,
      sortable: true,
      cell: (row: OpenFund) => (
        <span className="text-gray-600">${row.amountInvested.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <h1 className="text-blue-500 text-xl font-semibold p-4">Fondos Abiertos</h1>
      <DataTable
        columns={columns}
        data={openFunds}
        pagination 
        paginationPerPage={5} 
        paginationRowsPerPageOptions={[5, 10, 15, 20]} 
        defaultSortFieldId="name"
        highlightOnHover
        striped
        responsive
        fixedHeader
        persistTableHead={true}
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

export default OpenFundTable;
