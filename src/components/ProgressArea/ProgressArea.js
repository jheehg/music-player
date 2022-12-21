import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playMusic, stopMusic } from '../../store/MusicPlayReducer';
import './ProgressArea.scss';

const ProgressArea = (prop, ref) => {
  const audio = useRef();
  const progressInnerBar = useRef();
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.playList);
  const currentIndex = useSelector((state) => state.currentIndex);
  const playing = useSelector((state) => state.playing);
  const repeat = useSelector((state) => state.repeat);
  const [track, setTrack] = useState();
  const [ingTime, setIngTime] = useState('00:00');
  const [fullTime, setFullTime] = useState('00:00');

  useEffect(() => {
    setTrack(playList[currentIndex]);
    setIngTime(getTimeAsString(0));
    progressInnerBar.current.style.width = '0%';
  }, [currentIndex, playList]);

  const onLoadedMetadata = () => {
    if (audio.current.duration)
      setFullTime(getTimeAsString(audio.current.duration));
    if (playing) audio.current.play();
  };

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    volume: (vol) => {
      audio.current.volume = vol;
    },
  }));
  const onPlay = () => {
    dispatch(playMusic());
  };
  const onPause = () => {
    dispatch(stopMusic());
  };

  const onTimeUpdate = (e) => {
    // when event is not ready, readyState returns 0.
    if (e.target.readyState === 0) return 0;

    const { currentTime, duration } = e.target;
    progressInnerBar.current.style.width = (currentTime / duration) * 100 + '%';

    setIngTime(getTimeAsString(currentTime));

    if (currentTime === duration) onPlayNextTrack();
  };

  const onPlayNextTrack = () => {
    console.log(repeat);
    let nextIndex = currentIndex;
    if (repeat === 'SHUFFLE') {
      nextIndex = Math.ceil(Math.random() * playList.length - 1);
    } else if (repeat === 'ALL') {
      nextIndex = currentIndex < playList.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex;
    }
    setTrack(playList[nextIndex]);
    audio.current.currentTime = 0;
  };

  const onClickProgress = (e) => {
    const {
      offsetLeft,
      clientWidth: progressWidth,
      offsetParent: { offsetLeft: offsetParentLeft },
    } = e.currentTarget;

    const playingAt = e.clientX - (offsetLeft + offsetParentLeft);
    const playingAtShowingPer = (playingAt / progressWidth) * 100;
    progressInnerBar.current.style.width = playingAtShowingPer + '%';
    audio.current.currentTime =
      (playingAtShowingPer / 100) * audio.current.duration;
    audio.current.play();
  };

  const getTimeAsString = (time) => {
    const min = String(parseInt(time / 60)).padStart(2, '0');
    const sec = String(parseInt(time % 60)).padStart(2, '0');

    return `${min}:${sec}`;
  };

  return (
    <div className="progress-area" onClick={onClickProgress}>
      <div className="progress-bar">
        <div className="progress-inner-bar" ref={progressInnerBar}></div>
        <audio
          ref={audio}
          src={track?.src}
          type="audio/mpeg"
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
        />
      </div>
      <div className="music-timer">
        <span>{ingTime}</span>
        <span>{fullTime}</span>
      </div>
    </div>
  );
};

export default forwardRef(ProgressArea);
