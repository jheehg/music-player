import { playList } from './data';

const initialState = {
  playList,
  currentMusicId: playList[0].id,
  currentIndex: 0,
  playing: false,
  repeat: 'ALL', // one or suffle or all
};

const PLAY_MUSIC = 'musicPlayer/PLAY_MUSIC';
const STOP_MUSIC = 'musicPlayer/STOP_MUSIC';
const SKIP_PREVIOUS = 'musicPlayer/SKIP_PREVIOUS';
const SKIP_NEXT = 'musicPlayer/SKIP_NEXT';
const SHUFFLE = 'musicPlayer/SHUFFLE';
const REPEAT_ONE = 'musicPlayer/REPEAT_ONE';
const REPEAT_ALL = 'musicPlayer/REPEAT_ALL';

export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const skipPrevious = () => ({ type: SKIP_PREVIOUS });
export const skipNext = () => ({ type: SKIP_NEXT });
export const shuffle = () => ({ type: SHUFFLE });
export const repeatOne = () => ({ type: REPEAT_ONE });
export const repeatAll = () => ({ type: REPEAT_ALL });

export default function musicPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_MUSIC:
      return { ...state, playing: true };
    case STOP_MUSIC:
      return { ...state, playing: false };
    case SKIP_PREVIOUS:
      const prevIndex =
        state.currentIndex > 0
          ? --state.currentIndex
          : state.playList.length - 1;
      return {
        ...state,
        currentIndex: prevIndex,
        currentMusicId: playList[prevIndex].id,
      };
    case SKIP_NEXT:
      const nextIndex =
        state.currentIndex < state.playList.length - 1
          ? ++state.currentIndex
          : 0;
      return {
        ...state,
        currentIndex: nextIndex,
        currentMusicId: playList[nextIndex].id,
      };
    case SHUFFLE:
      return { ...state, repeat: 'SHUFFLE' };
    case REPEAT_ONE:
      return { ...state, repeat: 'ONE' };
    case REPEAT_ALL:
      return { ...state, repeat: 'ALL' };
    default:
      return state;
  }
}
