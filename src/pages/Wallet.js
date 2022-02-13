import React from 'react';
import ExpensesList from '../components/ExpensesList';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <ExpensesList />
      </>
    );
  }
}

export default Wallet;
