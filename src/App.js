import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/context'

import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Profile from './Pages/Profile/Profile'

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: "1.5rem"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: "5rem",

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  postCard: {
    margin: 'auto'
  },
  shortcut: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: "none"
    },
  }


}));


function App() {
  const classes = useStyles();
  const context = useContext(AuthContext);

  const [open, setOpen] = useState(false)



  useEffect(() => {
    const checkLoggedIn = async () => {
      let tokenval = localStorage.getItem("jwtToken");
      console.log(tokenval)
      if (tokenval === null) {
        localStorage.setItem('jwtToken', '');
        tokenval = '';
      }
      if (tokenval && tokenval !== '')
        context.login(tokenval)

    };
    checkLoggedIn();
  }, []);
  return (
    <Container>

      <div className={classes.root}>
        <Router>
          <AuthProvider>
            <div className={clsx(classes.content, { [classes.contentShift]: open })}>
              <Route exact path="/" component={Login} />

              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />

            </div>
          </AuthProvider>
        </Router>

      </div>
    </Container>



  );
}

export default App;