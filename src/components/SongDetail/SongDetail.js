import React from 'react';
import './SongDetail.scss';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const SongDetail = () => {
  const playing = useSelector((state) => state.playing);
  const currentIndex = useSelector((state) => state.currentIndex);
  const playList = useSelector((state) => state.playList);
  return (
    <Stack>
      <Box sx={{ padding: '8px 0' }}>
        <Typography align="center" variant="overline">
          {playing ? 'Now Playing' : 'Pause'}
        </Typography>
      </Box>
      <Box className="img-area">
        <img
          src={playList[currentIndex].img}
          alt={playList[currentIndex].alt}
        />
      </Box>
      <Typography sx={{ fontSize: '1rem' }}>
        {playList[currentIndex].name}
      </Typography>
      <Typography sx={{ fontSize: '0.7rem' }}>
        {playList[currentIndex].artist}
      </Typography>
    </Stack>
  );
};

export default SongDetail;
