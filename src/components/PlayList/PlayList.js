import Close from '@mui/icons-material/Close';
import QueueMusic from '@mui/icons-material/QueueMusic';
import classNames from 'classnames';
import React from 'react';
import PlayListItem from './PlayListItem';
import './PlayList.scss';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const PlayList = ({ showMusicList, setShowMusicList }) => {
  const playList = useSelector((state) => state.playList);
  return (
    <Card className={classNames('play-list')}>
      <CardHeader
        title={
          <Stack direction="row">
            <QueueMusic />
            <Typography>Play List</Typography>
          </Stack>
        }
        action={
          <Close
            sx={{
              fontSize: 22,
              cursor: 'pointer',
              position: 'absolute',
              right: '20px',
            }}
            onClick={setShowMusicList}
          />
        }
        sx={{ paddingBottom: 0 }}
      ></CardHeader>
      <CardContent>
        <MenuList dense>
          {playList.map((item, index) => (
            <MenuItem key={index}>
              <PlayListItem key={index} item={item} index={index} />
            </MenuItem>
            // <Divider />
          ))}
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default PlayList;
