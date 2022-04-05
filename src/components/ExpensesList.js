import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class ExpensesList extends Component {
  handleDeleteBtn = ({ target }) => {
    const { expenses, submitExpensesNewInfo } = this.props;
    const newExpenses = expenses
      .filter((expense) => Number(expense.id) !== Number(target.value));
    submitExpensesNewInfo(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ `${Number(expense.value).toFixed(2)}` }</td>
              <td>
                {
                  expense.exchangeRates[expense.currency].name
                    .replace('/Real Brasileiro', '')
                }
              </td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                {
                  `${(Number(expense.value) * Number(expense
                    .exchangeRates[expense.currency].ask)).toFixed(2)}`
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  value={ expense.id }
                  data-testid="delete-btn"
                  onClick={ this.handleDeleteBtn }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitExpensesNewInfo: (expensesInfos) => dispatch(deleteExpense(expensesInfos)),
});

const mapStateToProps = (states) => ({
  expenses: states.wallet.expenses,
});

ExpensesList.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
  submitExpensesNewInfo: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
