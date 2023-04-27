import { Box } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import { Link } from 'react-router-dom';

export const Head2 = withStyles(Box, { root: { fontSize: '1.4em', fontWeight: 400, margin: '1.2em 0 1em 0' } });
export const NavLink = withStyles(Link, { root: { color: 'white', textDecoration: 'none' } });
