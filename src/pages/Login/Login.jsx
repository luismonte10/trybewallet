import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../../actions';
import './Login.css';

const PASSWORD_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      isButtonDisabled: true,
      shouldRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.handleButtonValidation());
  }

  handleButtonValidation = () => {
    const { emailInput, passwordInput } = this.state;
    if (emailInput.includes('@')
    && emailInput.includes('.com')
    && passwordInput.length >= PASSWORD_LENGTH
    ) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleButton = (event) => {
    event.preventDefault();
    const { emailInput } = this.state;
    const { submitUserInfo } = this.props;
    submitUserInfo(emailInput);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const {
      emailInput,
      passwordInput,
      isButtonDisabled,
      shouldRedirect,
    } = this.state;
    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <div className="login">
        <div className="login__container">
          <h1 className="login__title">Trybe Wallet</h1>
          <form className="login__form">
            <input
              className="login__input"
              type="email"
              placeholder="e-mail"
              name="emailInput"
              data-testid="email-input"
              value={ emailInput }
              onChange={ this.handleChange }
            />
            <span className="login__input-border" />
            <input
              className="login__input"
              type="text"
              placeholder="senha"
              name="passwordInput"
              data-testid="password-input"
              value={ passwordInput }
              onChange={ this.handleChange }
            />
            <span className="login__input-border" />
            <button
              className="login__submit"
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ this.handleButton }
            >
              Entrar
            </button>
            <a className="login__reset" href="a">Esquesi a senha</a>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitUserInfo: (userEmail) => dispatch(loginAction(userEmail)),
});

Login.propTypes = {
  submitUserInfo: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
