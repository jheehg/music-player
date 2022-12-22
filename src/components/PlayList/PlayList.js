import Close from '@mui/icons-material/Close';
import QueueMusic from '@mui/icons-material/QueueMusic';
import classNames from 'classnames';
import React, { useState, forwardRef } from 'react';
import PlayListItem from './PlayListItem';
import './PlayList.scss';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const PlayList = ({ showMusicList, setShowMusicList, onDropItem, onClickItem }, ref) => {
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0);
  
  const onDragStart = (index) => {
    console.log('onDragStart', index);
    setStartIndex(index);
  };

  const onDrop = (dropIndex) => {
    console.log(dropIndex)
    onDropItem(dropIndex);
    const dragItem = playList[startIndex];
    const list = [...playList];
    list.splice(startIndex, 1);
    const newListData = startIndex < dropIndex ? 
      [...list.slice(0, dropIndex - 1), dragItem, ...list.slice(dropIndex - 1)] 
      : [...list.slice(0, dropIndex), dragItem, ...list.slice(dropIndex)];
    
    dispatch(newListData);
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
            onClick={setShowMusicList}
          />
        }
        sx={{ paddingBottom: 0 }}
      ></CardHeader>
      <CardContent sx={{width: '100%', height: '290px', overflow: 'auto'}}>
        <MenuList dense>
          {playList.map((item, index) => (
            <MenuItem key={index}>
              <PlayListItem 
                key={index} 
                item={item} 
                index={index} 
                draggable={true}
                onDragItem={onDrop}
                onDragStart={() => onDragStart(index)}
                onClickItem={onClickItem}
            />
            </MenuItem>
          ))}
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default forwardRef(PlayList);
