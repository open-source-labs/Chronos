
import { makeStyles } from '@mui/styles';
import { AliasesCSSProperties } from '@mui/system/';

 // Conditional Rendering of UI Modals for Light and Dark Mode
// Theme, StyleProps

export const useStylesDark = makeStyles<AliasesCSSProperties>(theme => ({
  // ALL CARDS
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    height: 280,
    width: 280,
    textAlign: 'center',
    color: '#888888',
    whiteSpace: 'nowrap',
    backgroundColor: 'lightgray',
    borderRadius: 3,
    border: '0',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
      fontWeight: 600,
    },
  },
  iconbutton: {
    boxShadow: 'none',
    color: 'none',
    visibility: 'hidden',
  },
  btnStyle: {
    position: 'absolute',
    top: -10,
    left: -72,
    margin: '0',
    color: '#eeeeee',
    borderRadius: '0',
    backgroundColor: 'none',
    visibility: 'visible',
  },
  icon: {
    width: '75px',
    height: '75px',
    boxShadow: 'none',
  },

  // ALL CARDS: CONTENT
  fontStyles: {
    fontSize: '18px',
    fontFamily: 'Roboto',
    fontWeight: 300,
    color: '#444d56',
  },
}));

export const useStylesLight = makeStyles<AliasesCSSProperties>(theme => ({
  // ALL CARDS
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    height: 280,
    width: 280,
    textAlign: 'center',
    color: '#888888',
    whiteSpace: 'nowrap',
    backgroundColor: 'white',
    borderRadius: 3,
    border: '0',
    boxShadow:
      '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: `#3788fc`,
      color: '#ffffff',
      fontWeight: 600,
    },
  },
  iconbutton: {
    boxShadow: 'none',
    color: 'none',
    visibility: 'hidden',
  },
  btnStyle: {
    position: 'absolute',
    top: -10,
    left: -72,
    margin: '0',
    color: '#eeeeee',
    borderRadius: '0',
    backgroundColor: 'none',
    visibility: 'visible',
  },
  icon: {
    width: '75px',
    height: '75px',
    boxShadow: 'none',
  },
  // ALL CARDS: CONTENT
  fontStyles: {
    fontSize: '18px',
    fontFamily: 'Roboto',
    fontWeight: 300,
    color: '#444d56',
  },
}));