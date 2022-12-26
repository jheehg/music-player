import { Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import classNames from 'classnames';
import React, { useRef } from 'react';

const PlayListItem = ({ item, index, draggable, onDrop, onDragStart }) => {
  const playListItemRef = useRef(null);

  const onDragEnd = () => {
    playListItemRef.current.classList.remove('dragstart');
  };
  const onDragEnter = () => {
    playListItemRef.current.classList.add('dragover');
  };
  const onDragLeave = () => {
    playListItemRef.current.classList.remove('dragover');
  };
  const onDragStartItem = () => {
    playListItemRef.current.classList.add('dragstart');
    onDragStart(index);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <ListItemText
      ref={playListItemRef}
      className={classNames('item')}
      draggable={draggable}
      onDrop={() => onDrop(index)}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs={10} sx={{ textAlign: 'left' }}>
          <Typography
            sx={{
              fontSize: '0.9rem',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.7rem',
            }}
          >
            {item.artist}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <span className={classNames('audio-duration')}>00:00</span>
        </Grid>
      </Grid>
    </ListItemText>
  );
};

export default PlayListItem;
