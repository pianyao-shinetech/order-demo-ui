import './App.css';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import {
  Button,
  Container,
  CssBaseline,
  InputAdornment,
  Slide,
  SlideProps,
  TextField,
  alpha,
} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import PaymentIcon from '@mui/icons-material/Payment';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import ProductList from './ProductList';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -13,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

function HideOnScroll(props: SlideProps) {

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

const fabStyle = {
  position: 'fixed',
  bottom: 32,
  right: 32,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [cartItems, setCartItems] = React.useState([""]);
  const [search, setSearch] = React.useState<string>('');

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'secondary' as 'secondary',
      sx: fabStyle as SxProps,
      icon: <ShoppingCartIcon />,
      badgeVisible: true,
      label: 'Go to Shopping Cart',
      targetTab: 1,
    },
    {
      color: 'inherit' as 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
      icon: <ShoppingCartCheckoutIcon />,
      badgeVisible: true,
      label: 'Checkout',
      targetTab: 2,
    },
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <PaymentIcon />,
      badgeVisible: false,
      label: 'Go Shopping',
      targetTab: 2,
    },
  ];

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            position: 'relative',
            minHeight: 600,
          }}
        >
          <HideOnScroll>
            <AppBar position="sticky" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="action tabs example"
              >
                <Tab label="Products" {...a11yProps(0)}/>
                <Tab label="Shopping Cart" {...a11yProps(1)} />
                <Tab label="Orders" {...a11yProps(2)} />
              </Tabs>
                <TextField
                    fullWidth
                    value={search}
                    InputProps={{
                        'aria-label': 'search',
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                    placeholder="Search..."
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: 55,
                        display: value == 0 ? 'block' : 'none',
                        backgroundColor: alpha('#FFFFFF', 0.85),
                        margin: '0 auto',
                    }}
                />
            </AppBar>
          </HideOnScroll>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <ProductList search={search}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Cart Items...
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Orders...
            </TabPanel>
          </SwipeableViews>
          {fabs.map((fab, index) => (
            <Zoom
              key={fab.color}
              in={value === index}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
              }}
              unmountOnExit
            >
              <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
              <StyledBadge 
                badgeContent={cartItems.length} 
                color="warning" 
                invisible={cartItems.length === 0 || !fab.badgeVisible}
                onClick={e=>setValue(fab.targetTab)}
              >
                {fab.icon}
                {/* <Button startIcon = {fab.icon} /> */}
              </StyledBadge>
              </Fab>
            </Zoom>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default App;
