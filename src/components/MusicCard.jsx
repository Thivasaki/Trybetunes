import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favSongs: [],
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ favSongs });
    this.setState({ isLoading: false });
  }

  handleFavorites = ({ target }, music) => {
    this.setState({ isLoading: true }, async () => {
      if (target.checked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      const favSongs = await getFavoriteSongs();
      this.setState({ favSongs });
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { previewUrl, trackName, trackId, music } = this.props;
    const { isLoading, favSongs } = this.state;

    if (isLoading === true) {
      return (<Loading />);
    }
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => this.handleFavorites(event, music) }
            checked={ favSongs.some((favSong) => favSong.trackName === trackName) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape.isRequired,
};
export default MusicCard;
