import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

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
      <div>
        <form>
          <label htmlFor="email-Input">
            Email:
            <input
              type="email"
              name="emailInput"
              id="email-Input"
              data-testid="email-input"
              value={ emailInput }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password-Input">
            Senha:
            <input
              type="text"
              name="passwordInput"
              id="password-Input"
              data-testid="password-input"
              value={ passwordInput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ this.handleButton }
          >
            Entrar
          </button>
        </form>
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
