import React from 'react';
import { CheckIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid'
import TransactionTable from '../components/TransactionHistory/TransactionTable';
import OpenFundTable from '../components/FundSuscription/OpenFundTable';
import Card from '../components/common/Card';
import { useFund } from '../context/fundContext';
import Header from '../components/common/Header';


function Dashboard() {
  const {balance, investment, transactions, openFunds} = useFund();
  return (
<div className="App ">
<Header/>
<div className="p-4 h-screen">
  <div className="grid grid-rows-[auto,1fr] grid-cols-3 gap-4 h-full">
    <div className="col-span-2 border-r p-4">
      <OpenFundTable openFunds={openFunds} />
    </div>
    <div className="space-y-4">
      <div className="p-4">
        <Card 
          title="Disponible" 
          value={balance} 
          backgroundClassname="bg-gradient-to-r from-blue-500 to-blue-600 mb-4" 
          icon={<CheckIcon/>} 
        />

        <Card 
          title="Invertidos" 
          value={investment} 
          backgroundClassname="bg-gradient-to-r from-blue-500 to-blue-600 " 
          icon={<ArrowTrendingUpIcon/>} 
        />
      </div>
    </div>
    <div className="col-span-3 border-t border-gray-300 p-4">
      <TransactionTable transactions={transactions} />
    </div>
  </div>
  </div>
</div>
  );
}

export default Dashboard;
