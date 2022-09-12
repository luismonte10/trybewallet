import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    let totalValue = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      totalValue += Number(value) * Number(exchangeRates[currency].ask);
    });

    return (
      <header className="header-container">
        <h1>MyWallet</h1>
        <span data-testid="total-field">{`Total: ${totalValue.toFixed(2)} BRL`}</span>
        <span data-testid="email-field">{`Email: ${email}`}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
