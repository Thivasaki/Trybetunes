import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      disable: true,
    };
  }

  Validation = () => {
    const { name } = this.state;
    const numb = 2;
    const nameValidation = name.length < numb;
    this.setState({ disable: nameValidation });
  }

  handleValue = (event) => {
    this.setState({ name: event.target.value }, this.Validation);
  }

  render() {
    const { disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Nome do Artísta"
            data-testid="search-artist-input"
            onChange={ this.handleValue }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
