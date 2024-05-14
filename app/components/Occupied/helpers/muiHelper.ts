
import { makeStyles } from '@mui/styles';

 // Conditional Rendering of UI Modals for Light and Dark Mode
//  StyleProps

export const useStylesDark = makeStyles(theme => ({
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
    color: '#fafdf9',
    whiteSpace: 'nowrap',
    backgroundColor: '#262837',
    borderRadius: 3,
    border: '0',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fafdf9',
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
    color: '#fafdf9',
  },
}));

export const useStylesLight = makeStyles(theme => ({
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
    color: '#E3E3F0',
    whiteSpace: 'nowrap',
    backgroundColor: '#F7F8F8',
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