import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Fund, OpenFund, Transaction } from '../models/models';
import { getBalance } from '../services/BalanceService';
import { getFunds } from '../services/FundServices';
import { cancel, getTransactions, subscribe } from '../services/TransactionServices';
import { getOpenFunds } from '../services/OpenFundServices';



interface FundContextType {
  funds: Fund[];
  openFunds: OpenFund[];
  availableFunds: Fund[];
  investment: number;
  balance: number;
  transactions: Transaction[];
  subscribeToFund: (fund: Fund, amount: number) => Promise<string | void>;
  cancelFund: (fund: Fund) => Promise<void>;
  setNotification: React.Dispatch<React.SetStateAction<'email' | 'sms' | null>>;
}

const FundContext = createContext<FundContextType | undefined>(undefined);

interface FundProviderProps {
  children: ReactNode;
}

export const FundProvider: React.FC<FundProviderProps> = ({ children }) => {
  const [funds, setFunds] = useState<Fund[]>([]);

  const [openFunds, setOpenFunds] = useState<OpenFund[]>([]);
  const [balance, setBalance] = useState<number>(0); 
  const [transactions, setTransactions] = useState<Transaction[]>([]); 
  const [notification, setNotification] = useState<'email' | 'sms' | null>(null);
  
  const availableFunds = funds.filter((fund:Fund) => !openFunds.some((openFund: OpenFund)=> openFund.fund._id === fund._id ))
  const investment = openFunds.reduce((acc: number, curr: OpenFund)=> acc+curr.amountInvested,0);

  const subscribeToFund = async (fund: Fund, amount: number): Promise<string | void> => {

    const response = await subscribe(fund._id, amount);
    const {transaction, balance, openFund} = response.data
    setBalance(balance);
    setTransactions([...transactions, transaction]);
    setOpenFunds([...openFunds, openFund]);
  };

  const cancelFund = async (fund: Fund): Promise<void> => {
    const response = await cancel(fund._id);
    const {transaction, balance, openFunds} = response.data

    setBalance(balance);
    setTransactions([...transactions, transaction]);
    setOpenFunds(openFunds);
  };

  const sendNotification = (message: string): void => {
    if (notification === 'email') {
      console.log(`Sending email: ${message}`);
    } else if (notification === 'sms') {
      console.log(`Sending SMS: ${message}`);
    }
  };

  const fetchInitialData = async () => {
    try {
      const [balanceData, fundsData, transactionData, openFundData] = await Promise.all([getBalance(), getFunds(),getTransactions(),getOpenFunds()]);
      setBalance(balanceData.data);
      setFunds(fundsData.data);
      setTransactions(transactionData.data);
      setOpenFunds(openFundData.data);
    } catch (error) {
      console.error("Error fetching initial data", error);
    }
  };


  React.useEffect(()=> {
    fetchInitialData();
  },[])


  return (
    <FundContext.Provider value={{ funds, openFunds,availableFunds, balance, investment, transactions, subscribeToFund, cancelFund, setNotification }}>
      {children}
    </FundContext.Provider>
  );
};


export const useFund = (): FundContextType => {
  const context = useContext(FundContext);
  if (!context) {
    throw new Error('useFund must be used within a FundProvider');
  }
  return context;
};
