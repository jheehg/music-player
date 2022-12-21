import { Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import classNames from 'classnames';
import React from 'react';

const PlayListItem = ({ item, index }) => {
  return (
    <ListItemText className={classNames('row')} draggable={true}>
      <Grid container justifyContent="space-between">
        <Grid item xs={10} sx={{ textAlign: 'left' }}>
          <Typography sx={{ fontSize: '1rem' }}>{item.name}</Typography>
          <Typography sx={{ fontSize: '0.8rem' }}>{item.artist}</Typography>
        </Grid>
        <Grid item xs={2}>
          <span className={classNames('audio-duration')}>00:00</span>
        </Grid>
      </Grid>
    </ListItemText>
  );
};

export default PlayListItem;
