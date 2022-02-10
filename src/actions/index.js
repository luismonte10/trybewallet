// Coloque aqui suas actions
function loginAction(payload) {
  return {
    type: 'LOGIN',
    payload,
  };
}

export default loginAction;
