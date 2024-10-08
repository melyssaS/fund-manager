import React from 'react';
import { useFund } from '../../context/fundContext';
import { Fund } from '../../models/models';

interface CancelFundProps{
  onClose: () => void;
}

function CancelFund({onClose}:CancelFundProps) {
  const {funds,  balance, openFunds, cancelFund } = useFund();
  const [selectedFund, setSelectedFund] = React.useState<Fund| null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fundId = event.target.value;
    const fund = funds.find((f) => f._id === fundId) || null;
    setSelectedFund(fund);

    if (fund) {
      setMessage(`Puedes cancelar tu suscripción al fondo ${fund.name}`);
    } else {
      setMessage(null);
    }
  };

  const handleCancel = () => {
    if (selectedFund) {
      onClose()
      cancelFund(selectedFund);
      setMessage(`Suscripción cancelada al fondo ${selectedFund.name}`);
      setSelectedFund(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <button onClick={onClose} className="flex justify-end text-gray-500 hover:text-gray-700">
            ✕
          </button>
        <h2 className="text-xl font-semibold mb-4">Cancelar Suscripción</h2>
        <p className="mb-4 text-gray-600">Saldo Disponible: <span className="font-bold text-gray-800">${balance.toLocaleString()}</span></p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Selecciona un Fondo Suscrito:</label>
          <select
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            onChange={handleSelectChange}
            value={selectedFund ? selectedFund._id : ''}
          >
            <option value="" disabled>Selecciona un fondo</option>
            {openFunds.length > 0 ? (
              openFunds.map((openFund) => (
                <option key={openFund.fund._id} value={openFund.fund._id}>
                  {openFund.fund.name} - Monto Devuelto: ${openFund.amountInvested.toLocaleString()}
                </option>
              ))
            ) : (
              <option value="" disabled>No hay fondos suscritos</option>
            )}
          </select>
        </div>

        {selectedFund && (
          <p className="text-sm text-green-500 mb-4">
            {message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
            disabled={!selectedFund}
          >
            Cancelar Suscripción
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelFund;
