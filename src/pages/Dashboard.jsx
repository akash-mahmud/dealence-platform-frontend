import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import Balance from "../components/Balance";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Transactions from "../components/Transactions";
import Chart from "../components/Chart";

import Investment from "../components/Investment";
import SwipeableTextMobileStepper from "../components/MyCarousel";
import Interest from "../components/Interest";
import InvestmentList from "../components/InvestmentsList";
import MyCausoulSecond from "../components/MyCausoulSecond";
import { endpoint } from "../config/endpoints";
import { axiosRequest } from "../http/axiosRequest";
import TotalPaidChart from "../components/TotalPaidChart";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    overflowX: 'hidden'
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  investmentsTable: {
    height: 326,
    [theme.breakpoints.down('sm')]: {
      height: 448,
    }
  },
  fixedHeight: {
    height: 240,
  },
  secondStepper: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  dashboardContainerCard: {
    padding: theme.spacing(4),
    backgroundColor: "rgba(253, 253, 253)"
  }
}));

const Dashboard = ({ getPayouts, setBalance,
  setcredit,
  setPayouts,
  setInterest,
  balance,
  credit,
  interest,
  payouts }) => {
  const classes = useStyles();
  // const [balance, setBalance] = useState(0);
  // const [credit, setcredit] = useState(0);

  const [transactions, setTransactions] = useState(0);

  const [increments, setIncrements] = useState(0);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [active, setActive] = useState(false);



  // Investments list data
  const [pagesCount, setPagesCount] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleInvestmentPageChanged = (event, value) => {
    setIncrements(pages[value - 1]);
    setCurrentPage(value - 1);
  };



  const getIncrements = async () => {
    const res = await axiosRequest.get(
      endpoint.investment.list
    );

    setPages(res.data.paginatedIncrements);
    setPagesCount(res.data.paginatedIncrements.length);
    setIncrements(res.data.paginatedIncrements[currentPage]);

  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosRequest.get(endpoint.user.me);
      if (res.data) {
        setActive(res.data.isActive);
      }
    };

    getUser();
    getPayouts();
    getIncrements();
  }, []);

  const investmentCallback = () => {
    getPayouts();
    getIncrements();
  };
  const [openSelect, setopenSelect] = useState(false);
  const [openReinvesSelect, setopenReinvesSelect] = useState(false);
  const [openReinvesSelect2, setopenReinvesSelect2] = useState(false);
  const [plan, setPlan] = useState('');
  const [invest, setInvest] = useState(null);
  const [openSelect2, setopenSelect2] = useState(false);
  const handleClickOpen = () => {


    if (invest === '') {
      setopenSelect2(true);
    }

    if (invest) {
      setPlan(invest.plan);
      // setOpenChange(true);
      setopenSelect(true);
    }
  };
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.dashboardContainerCard}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <SwipeableTextMobileStepper handleClickOpen={handleClickOpen} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className={classes.secondStepper}
            >
              <MyCausoulSecond />
            </Grid>

          
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Investment
                  setopenSelect2={setopenSelect2}
                  openSelect2={openSelect2}
                  setInvest={setInvest}
                  invest={invest}
                  setopenSelect={setopenSelect}
                  openSelect={openSelect}
                  setPlan={setPlan}
                  plan={plan}
                  // dataClicked={myChildData}
                  investmentCallback={investmentCallback}
                  setBalance={setBalance}
                  balance={balance}
                />
              </Paper>
            </Grid>





            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Balance
                  balance={balance}
                  setBalance={setBalance}
                  credit={credit}
                  setcredit={setcredit}
                  setopenSelect2={setopenReinvesSelect2}
                  openSelect2={openReinvesSelect2}
                  setInvest={setInvest}
                  invest={invest}
                  setopenSelect={setopenReinvesSelect}
                  openSelect={openReinvesSelect}
                  setPlan={setPlan}
                  plan={plan}
                  // dataClicked={myChildData}
                  investmentCallback={investmentCallback}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
              <Paper className={fixedHeightPaper}>
                <Transactions
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <Chart />
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <TotalPaidChart />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={clsx(classes.paper, classes.investmentsTable)}>
                <InvestmentList
                  increments={increments}
                  pagesCount={pagesCount}
                  handleInvestmentPageChanged={handleInvestmentPageChanged}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Copyright />
    </main>
  );
};

export default Dashboard;