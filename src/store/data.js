const createData = (id, name, artist, img, alt, src) => {
  return { id, name, artist, img, alt, src };
};

export const playList = [
  createData('1', 'name 1', 'artist 1', '', 'alt 1', ''),
  createData('2', 'name 2', 'artist 2', '', 'alt 2', ''),
  createData('3', 'name 3', 'artist 3', '', 'alt 3', ''),
  createData('4', 'name 4', 'artist 4', '', 'alt 4', ''),
  createData('5', 'name 5', 'artist 5', '', 'alt 5', ''),
  createData('6', 'name 6', 'artist 6', '', 'alt 6', ''),
];
