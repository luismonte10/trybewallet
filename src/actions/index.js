// Coloque aqui suas actions
import fetchAPI from '../service';

export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export function loginAction(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function walletFormAction(payload) {
  return {
    type: WALLET,
    payload,
  };
}

export function getCurrency(data) {
  return {
    type: GET_CURRENCIES,
    payload: data,
  };
}

export function fetchCurrencyAction() {
  return async (dispatch) => {
    try {
      const data = await fetchAPI();
      return dispatch(getCurrency(data));
    } catch (error) {
      console.log(error);
    }
  };
}
