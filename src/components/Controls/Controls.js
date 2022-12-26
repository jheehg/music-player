import React from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import PlayArrow from '@mui/icons-material/PlayArrow';
import SkipNext from '@mui/icons-material/SkipNext';
import QueueMusic from '@mui/icons-material/QueueMusic';
import Shuffle from '@mui/icons-material/Shuffle';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import './Controls.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  skipPrevious,
  skipNext,
  repeatAll,
  repeatOne,
  shuffle,
} from '../../store/MusicPlayReducer';

const Controls = ({
  setShowingList,
  showMusicList,
  setShowMusicList,
  resetDuration,
  play,
  pause,
  setVolume,
}) => {
  const playing = useSelector((state) => state.playing);
  const dispatch = useDispatch();
  const repeat = useSelector((state) => state.repeat);

  const onClickPlay = () => {
    play();
  };
  const onClickPause = () => {
    pause();
  };
  const onSliderChange = (e) => {
    setVolume(e.target.value);
  };
  const onSkipPrevious = () => {
    dispatch(skipPrevious());
    resetDuration();
  };
  const onSkipNext = () => {
    dispatch(skipNext());
    resetDuration();
  };
  const onShowPlayList = () => {
    setShowingList();
  };
  // setShowMusicList,
  const repeatIcon = (status) => {
    switch (status) {
      case 'ALL':
        return (
          <RepeatIcon
            sx={{ fontSize: 27, cursor: 'pointer' }}
            onClick={() => dispatch(shuffle())}
          />
        );
      case 'SHUFFLE':
        return (
          <Shuffle
            sx={{ fontSize: 27, cursor: 'pointer' }}
            onClick={() => dispatch(repeatOne())}
          />
        );
      case 'ONE':
        return (
          <RepeatOneIcon
            sx={{ fontSize: 27, cursor: 'pointer' }}
            onClick={() => dispatch(repeatAll())}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ marginBottom: '25px' }}
    >
      <Grid item xs={1.5}>
        <QueueMusic
          sx={{ fontSize: 27, cursor: 'pointer' }}
          onClick={onShowPlayList}
        />
      </Grid>
      <Grid item xs={1.5}>
        {repeatIcon(repeat)}
      </Grid>
      <Grid item xs={1.5}>
        <SkipPrevious
          sx={{ fontSize: 27, cursor: 'pointer' }}
          onClick={onSkipPrevious}
        />
      </Grid>
      <Grid item xs={1.5}>
        {playing ? (
          <PauseIcon
            sx={{ fontSize: 27, cursor: 'pointer' }}
            onClick={onClickPause}
          />
        ) : (
          <PlayArrow
            sx={{ fontSize: 27, cursor: 'pointer' }}
            onClick={onClickPlay}
          />
        )}
      </Grid>
      <Grid item xs={1.5}>
        <SkipNext
          sx={{ fontSize: 27, cursor: 'pointer' }}
          onClick={onSkipNext}
        />
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex' }}>
        <VolumeUp
          sx={{ fontSize: 27, cursor: 'pointer', marginRight: '6px' }}
        />
        <Slider
          size="small"
          defaultValue={0.2}
          onChange={onSliderChange}
          aria-label="Small"
          aria-labelledby="input-slider"
          color="primary"
          sx={{ width: '50px' }}
          min={0}
          step={0.05}
          max={1}
        />
      </Grid>
    </Grid>
  );
};

export default Controls;
