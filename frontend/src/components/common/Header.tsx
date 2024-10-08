import React from 'react';
import SubscribeFund from '../FundSuscription/FundSuscription';
import CancelFund from '../FundSuscription/CancelFund';

function Header() {

    const [isFundSubscriptionModalOpen, setIsFundSubscriptionModalOpen] = React.useState(false);
    const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = React.useState(false);
  
    const handleOpenFundSubscription = () => {
      setIsFundSubscriptionModalOpen(true);
    };
  
    const handleOpenCancelSubscription = () => {
      setIsCancelSubscriptionModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsFundSubscriptionModalOpen(false);
        setIsCancelSubscriptionModalOpen(false);
      };

  return (
    <header className=" p-4 flex items-center justify-between">
      <h1 className="text-blue-500 text-xl font-semibold">Gestión de Fondos</h1>
      <div className="space-x-4">
        <button className="bg-blue-500 hover:blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleOpenFundSubscription}>
          Generar Suscripción
        </button>
        <button className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded" onClick={handleOpenCancelSubscription}>
          Cancelar Suscripción
        </button>
      </div>
      {isFundSubscriptionModalOpen && (
   <SubscribeFund onClose={handleCloseModal}/>
      )}

{isCancelSubscriptionModalOpen && (
   <CancelFund onClose={handleCloseModal}/>
      )}
    </header>
  );
}

export default Header;