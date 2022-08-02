import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      searchingName: '',
      disable: true,
      isLoading: false,
      finalizedSearch: false,
      searchAlbum: [],
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

  handleSubmit = async (nameArtist, event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const listAlbum = await searchAlbumsAPI(nameArtist);
    this.setState({ searchAlbum: listAlbum });
    this.setState({ searchingName: nameArtist });
    this.setState({ finalizedSearch: true });
    this.setState({ isLoading: false });
    this.setState({ name: '' });
  }

  render() {
    const { disable, isLoading, name, searchAlbum,
      finalizedSearch, searchingName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <Loading />
          : (
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
                onClick={ (event) => this.handleSubmit(name, event) }
              >
                Pesquisar
              </button>
            </form>
          )}
        {finalizedSearch
        && (
          <div>
            <p>
              {`Resultado de álbuns de: ${searchingName}`}
            </p>
            {searchAlbum.map((album, index) => (
              <section key={ album.collectionId }>
                <span>{`Album Name ${index + 1} ${album.artistName} `}</span>
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
                <Link
                  to={ `album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Ouvir
                </Link>
              </section>
            ))}
          </div>
        )}
        {searchAlbum.length === 0
        && (
          <h1>
            Nenhum álbum foi encontrado
          </h1>)}
      </div>
    );
  }
}

export default Search;
