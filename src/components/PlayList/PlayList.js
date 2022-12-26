import React, { useState, forwardRef } from 'react';
import QueueMusic from '@mui/icons-material/QueueMusic';
import classNames from 'classnames';
import PlayListItem from './PlayListItem';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Close from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import './PlayList.scss';

const PlayList = (
  { showMusicList: playList, setShowMusicList, setShowingList },
  ref
) => {
  const [startIndex, setStartIndex] = useState(0);

  const onDrop = (dropIndex) => {
    console.log('onDrop', dropIndex);

    const dragItem = playList[startIndex];
    const list = [...playList];
    list.splice(startIndex, 1);
    const newListData =
      startIndex < dropIndex
        ? [
            ...list.slice(0, dropIndex - 1),
            dragItem,
            ...list.slice(dropIndex - 1),
          ]
        : [...list.slice(0, dropIndex), dragItem, ...list.slice(dropIndex)];

    setShowMusicList(newListData);
  };

  const onDragStart = (index) => {
    console.log('onDragStart', index);
    setStartIndex(index);
  };

  return (
    <Card className={classNames('play-list')} ref={ref}>
      <CardHeader
        title={
          <Stack direction="row">
            <QueueMusic />
            <Typography>PLAY LIST</Typography>
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
            onClick={setShowingList}
          />
        }
        sx={{ paddingBottom: 0 }}
      ></CardHeader>
      <CardContent sx={{ width: '100%', height: '290px', overflow: 'auto' }}>
        <MenuList dense>
          {playList?.map((item, index) => (
            <MenuItem key={index}>
              <PlayListItem
                key={index}
                item={item}
                index={index}
                draggable={true}
                onDrop={onDrop}
                onDragStart={onDragStart}
              />
            </MenuItem>
          ))}
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default forwardRef(PlayList);
