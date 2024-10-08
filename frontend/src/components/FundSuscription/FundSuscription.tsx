import React from 'react';
import { useFund } from '../../context/fundContext';

interface SubscribeFundProps {
  onClose: () => void;
}

function SubscribeFund({ onClose }: SubscribeFundProps) {
  const { availableFunds, balance, subscribeToFund } = useFund();
  const [selectedFundId, setSelectedFundId] = React.useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = React.useState<number | 0>(0);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedFund = availableFunds.find((fund) => fund._id === selectedFundId);

    if (!selectedFund) {
      setMessage("Por favor selecciona un fondo.");
      return;
    }

    if (typeof investmentAmount !== 'number' || investmentAmount < selectedFund.minAmount) {
      setMessage(`El monto mínimo de inversión para ${selectedFund.name} es $${selectedFund.minAmount.toLocaleString()}`);
      return;
    }

    if (balance - investmentAmount < 0) {
      setMessage(`No tienes saldo suficiente. Saldo disponible: $${balance.toLocaleString()}`);
      return;
    }

      subscribeToFund(selectedFund, investmentAmount );
      setMessage(`Suscripción exitosa al fondo ${selectedFund.name}`);
      onClose(); 
      setSelectedFundId(null);
      setInvestmentAmount(0);
  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <button onClick={onClose} className="flex justify-end text-gray-500 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-semibold mb-4">Suscribirse a un Fondo</h2>
        <p className="mb-4 text-gray-600">Saldo Disponible: <span className="font-bold text-gray-800">${balance.toLocaleString()}</span></p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Selecciona un Fondo:</label>
            <select
              value={selectedFundId ?? ''}
              onChange={(e) => setSelectedFundId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Selecciona un fondo</option>
              {availableFunds.map((fund, index) => (
                <option key={index} value={fund._id}>
                  {fund.name} - Monto Mínimo: ${fund.minAmount.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Monto a Invertir:</label>
            <input
              type="number"
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Ingresa el monto a invertir"
            />
          </div>

          {message && (
            <p className="text-sm text-red-500 mb-4">{message}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Suscribirse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscribeFund;
