import React from 'react';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="form-expenses-container">
          <WalletForm />
          <ExpensesList />
        </div>
      </div>
    );
  }
}

export default Wallet;
