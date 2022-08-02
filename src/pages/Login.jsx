import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      disable: true,
      isLoading: false,
    };
  }

  Validation = () => {
    const { name } = this.state;
    const numb = 3;
    const nameValidation = name.length < numb;
    this.setState({ disable: nameValidation });
  }

  handleValue = (event) => {
    this.setState({ name: event.target.value }, this.Validation);
  }

  handleSubmit = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    history.push('/search');
  }

  render() {
    const { disable, isLoading } = this.state;
    if (isLoading === true) {
      return (<Loading />);
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome de Usuário
            <input
              type="text"
              data-testid="login-name-input"
              id="name"
              onChange={ this.handleValue }
            />
          </label>

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disable }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
