import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contract from "./pages/Contract";
import ButtonAppBar from './components/ButtonAppBar';
import PrivateRoute from './PrivateRoute';
import { ProvideAuth, useAuth } from './hooks/use-auth';


import './App.css'
import { createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import Settings from './pages/Settings';
import ReferFriend from './pages/ReferFriend';
import Verification from './pages/Verification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Investments from './pages/Investments';

import { useEffect, useState } from 'react';
import { api } from './config/api';
import { axiosRequest } from './http/axiosRequest';
import { endpoint } from './config/endpoints';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0041C1',
      dark: '#072968',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(',')
  }
});

function App() {

  const auth = useAuth()

  
  const classes = useStyles();

  const [balance, setBalance] = useState(0);
  const [credit, setcredit] = useState(0);
  const [interest, setInterest] = useState(0.0);
  const [payouts, setPayouts] = useState({
    day: '',
    month: '',
    week: '',
    year: '',
  });

  const getPayouts = async () => {

    const res = await axiosRequest.get(
      endpoint.account.getbalance,
      {
        withCredentials: true,
      }
    );

    // setBalance(res.data.balance);
    // setcredit(res.data.credit);
    // setPayouts(res.data.payouts);
    // setInterest(res.data.interestEarned);
  };

  const { contract } = useSelector((state) => state.global)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosRequest.post(
        endpoint.contract.loadAvailableCredit, { contract: contract ? contract : auth?.user?.contracts?.split(',')[0] }
      );

      setcredit(data);

    };
    getData();
  }, [contract]);
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <ButtonAppBar
       
              contract={contract}
              getPayouts={getPayouts}
              setBalance={setBalance}
              setcredit={setcredit}
              setPayouts={setPayouts}
              setInterest={setInterest}
              balance={balance}
              credit={credit}
              interest={interest}
              payouts={payouts}
            />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/forgot_password">
                <ForgotPassword />
              </Route>

              <Route path="/reset">
                <ResetPassword />
              </Route>

              <PrivateRoute path="/verification">
                <Verification />
              </PrivateRoute>

              <PrivateRoute path="/activities">
                <Investments />
              </PrivateRoute>

              <PrivateRoute path="/account">
                <Settings />
              </PrivateRoute>

              <PrivateRoute path="/referral">
                <ReferFriend />
              </PrivateRoute>

              <PrivateRoute path="/">
                <Dashboard
                  getPayouts={getPayouts}
                  setBalance={setBalance}
                  setcredit={setcredit}
                  setPayouts={setPayouts}
                  setInterest={setInterest}
                  balance={balance}
                  credit={credit}
                  interest={interest}
                  payouts={payouts}
                />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>

      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;
