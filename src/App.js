import './App.scss';
import Controls from './components/Controls/Controls';
import PlayList from './components/PlayList/PlayList';
import SongDetail from './components/SongDetail/SongDetail';
import ProgressArea from './components/ProgressArea/ProgressArea';
import React, { useRef, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function App() {
  const audioRef = useRef();
  const playListRef = useRef();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if(!showList) {
      playListRef.current.style.display = 'none';
    } else {
      playListRef.current.style.display = 'block';
    }
  }, [showList]);

  const onPlay = () => {
    audioRef.current.play();
  };
  const onPause = () => {
    audioRef.current.pause();
  };
  const setVolume = (vol) => {
    audioRef.current.volume(vol);
  };

  const showMusicList = () => {};
  const setShowMusicList = () => {
    setShowList(!showList);
  };
  const resetDuration = () => {};

  return (
    <Container fixed>
      <Box
        sx={{
          border: '1px solid #000',
          borderRadius: '10px',
          width: '400px',
          height: '435px',
          textAlign: 'center',
          margin: '100px auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <SongDetail />
        <PlayList
          ref={playListRef}
          showMusicList={showMusicList}
          setShowMusicList={setShowMusicList}
        />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPause}
          showMusicList={showMusicList}
          setShowMusicList={setShowMusicList}
          resetDuration={resetDuration}
          setVolume={setVolume}
        />
      </Box>
    </Container>
  );
}

export default App;
