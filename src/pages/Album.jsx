import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const fetchMusics = await getMusics(id);
    this.setState({ musics: fetchMusics });
  }

  render() {
    const { musics, isLoading } = this.state;
    if (isLoading === true) {
      return (<Loading />);
    }
    return (
      <div data-testid="page-album">
        <Header />
        {musics.map((music, index) => (
          index === 0
            ? (
              <div key={ index }>
                <h1 data-testid="artist-name">{ music.artistName }</h1>
                <h1 data-testid="album-name">{ music.collectionName }</h1>
              </div>
            ) : (
              <section key={ index }>
                <MusicCard
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                />
              </section>
            )
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
