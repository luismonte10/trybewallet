import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    let totalValue = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      totalValue += value * exchangeRates[currency].ask;
    });

    return (
      <div>
        <span data-testid="email-field">{`Email: ${email} `}</span>
        <span data-testid="total-field">{ totalValue.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
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
