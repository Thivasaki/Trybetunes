import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  handleValue = async (event, music) => {
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({ isLoading: false });
    this.setState({ isChecked: true });
  }

  render() {
    const { previewUrl, trackName, trackId, music } = this.props;
    const { isLoading, isChecked } = this.state;

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
            onChange={ (event) => this.handleValue(event, music) }
            checked={ isChecked }
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
