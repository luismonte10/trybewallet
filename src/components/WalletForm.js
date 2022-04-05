import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletFormAction, fetchCurrencyAction } from '../actions';
import fetchAPI from '../service';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleButton = async (event) => {
    event.preventDefault();

    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { submitExpensesInfo } = this.props;
    const exchangeRates = await fetchAPI();

    submitExpensesInfo({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });

    this.setState({ id: id + 1, value: '', description: '' });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <form>

        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies && Object.keys(currencies)
              .filter((currenciesName) => currenciesName !== 'USDT')
              .map((currencyName) => (
                <option
                  key={ currencyName }
                  value={ currencyName }
                  data-testid={ currencyName }
                >
                  { currencyName }
                </option>
              ))}
          </select>
        </label>

        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            name="method"
            id="method-input"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          <textarea
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencyAction()),
  submitExpensesInfo: (expensesInfos) => dispatch(walletFormAction(expensesInfos)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  submitExpensesInfo: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
