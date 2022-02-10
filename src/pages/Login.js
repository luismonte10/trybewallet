import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../actions';

const PASSWORD_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;
    if (email.includes('@')
    && email.includes('.com')
    && password.length >= PASSWORD_LENGTH
    ) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleButton = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { submitUserInfo } = this.props;
    submitUserInfo(email);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const {
      email,
      password,
      isButtonDisabled,
      shouldRedirect,
    } = this.state;
    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <form>
          <label htmlFor="emailInput">
            Email:
            <input
              type="email"
              name="email"
              id="emailInput"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="passwordInput">
            Senha:
            <input
              type="text"
              name="password"
              id="passwordInput"
              data-testid="password-input"
              value={ password }
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
