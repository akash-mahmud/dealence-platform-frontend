import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

import ClearIcon from "@material-ui/icons/Clear";
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router-dom';
import { axiosRequest } from '../http/axiosRequest';
import { endpoint } from '../config/endpoints';
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({
  setcredit,
  credit,
  investmentCallback,
  setBalance,
  balance,
  openSelect2,
  setopenSelect2,
  invest,
  setInvest,
  plan,

  setPlan,
  openSelect,
  setopenSelect,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  useEffect(() => {
    const getData = async () => {
      const res = await axiosRequest.get(
        endpoint.account.getbalance
      );

      setcredit(res.data.credit);
    };
    getData();
  }, []);



  const auth = useAuth();

  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [openChange, setOpenChange] = useState(false);

  const selectClose2 = () => {
    setopenSelect2(false);
  };
  const handleClickOpen = () => {
    setopenSelect2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [accept, setaccept] = useState(false);

  const selectClose = () => {
    setopenSelect(false);
  };

  const handleClickChange = () => {
    setPlan(invest.plan);
    // setOpenChange(true);
    setopenSelect(true);
  };

  const handleCloseChange = () => {
    setOpenChange(false);
  };


  const submitHandle = async () => {
    const res = await axiosRequest.post(
      endpoint.investment.reinvest,
      { plan, amount },

    );

    if (res.data.message === "success") {
      setOpen(false);
      toast.success(`${t("Your_plan")} ${t("Plan_actived")}`);
      investmentCallback();
    } else {
      toast.error(`${t("Something")} ${t("Error")}`);
    }

    const getData = async () => {

      const investData = await axiosRequest.get(
        endpoint.investment.get
      );

      setInvest(investData.data);
      //This line can also work. But it is  not actual solution and it also refresh the page

      // window.location.reload();

      const balance = async () => {
        const res = await axiosRequest.get(
          endpoint.account.getbalance
        );

        setBalance(res.data.balance);
      };
      balance();
    };
    getData();
    //  window.location.reload();
  };

  const submitChange = async () => {
    // setopenSelect(true);
    const res = await axiosRequest.post(
      endpoint.investment.reinvest,
      { plan, amount },

    );

    if (res.status === 200) {
      setOpenChange(false);
      investmentCallback();
      // toast.success('Correctly Incremented', 'Success');
    } else {
      // toast.error('Something went wrong', 'Error');
    }

    const getData = async () => {
      const investData = await axiosRequest.get(
        endpoint.investment.get
      );

      setInvest(investData.data);

      const balance = async () => {
        const res = await axiosRequest.get(
          endpoint.account.getbalance
        );

        setBalance(res.data.balance);
      };
      balance();
    };
    getData();
    //  window.location.reload();
  };

  const [planSelected, setplanSelected] = useState();
  useEffect(() => {
    const getData = async () => {
      const investData = await axiosRequest.get(
        endpoint.investment.get
      );

      setInvest(investData.data);

    };
    getData();
  }, []);

  return (
    <>
      <Title>{t("Available_Credit")}</Title>
      <Typography component="p" variant="h4">
        &euro;{credit}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {t("data_on")} {new Date(Date.now()).toDateString()}
      </Typography>

      {
        invest === "" && (
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Re-invest{/* {t("Increment")} */}
          </Button>
        )
      }
      {invest && (
        <Button variant="contained" color="primary" onClick={handleClickChange}>
          Re-invest{/* {t("Increment")} */}
        </Button>
      )}

      {/* dialogues */}

      {/* Invest Dialog*/}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {" "}
          {t("Insert_an_ammount")}{" "}
          <ClearIcon
            onClick={handleClose}
            className="closeIcon"
            style={{
              /* float: right; */ width: "40px",
              /* height: 18px; */
              position: "absolute",
              top: "17px",
              right: "10px",
              height: "27px",
              color: "#0041C1",
            }}
          />
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              <div style={{ marginTop: "25px", marginBottom: "25px" }}>
                <TextField
                  style={{
                    "margin-bottom": "7px",
                    "min-width": " 230px",
                    marginLeft: "3.2%",
                    width: " 85%",
                  }}
                  type="number"
                  id="outlined-basic"
                  label={t("Amount")}
                  variant="outlined"
                  name="balance"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p
                  style={{
                    marginLeft: "3.5%",
                    textTransform: "capitalize",
                    marginTop: "7px",
                  }}
                >
                  {/* {t("Available")} */} Available credits
                  : ???{credit}
                </p>
                <p
                  style={{
                    marginLeft: "3.5%",
                  }}
                >
                  {t("The_amount_must")}
                </p>
                <div
                  style={{
                    marginLeft: "4px",
                    marginTop: "7px",
                  }}
                >
                  <Checkbox
                    color="primary"
                    checked={accept}
                    onChange={(e) => setaccept(e.target.checked)}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />{" "}
                  {t("I_agree_to_the")}{" "}
                  <span className="mytrm">
                    <Link
                      href="https://www.dealence.com/termini-e-condizioni/"
                      target="_blank"
                    >
                      {t("tr")}
                    </Link>{" "}
                  </span>{" "}
                </div>
                {/* <Button
                  style={{
                    display: 'block', 
                  }}
                  type="submit"
                  onClick={submitChange}
                  variant="contained"
                  color="primary"
                >
                  Increment
                </Button> */}
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={submitHandle}
            // variant="contained"
            color="primary"
            disabled={
              !amount ||
              !accept ||
              credit < 500 ||
              amount < 500 ||
              amount % 500 !== 0
            }
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Increment Dialog*/}

      <Dialog
        open={openChange}
        onClose={handleCloseChange}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {t("Insert_an_ammount")}{" "}
          <ClearIcon
            onClick={handleCloseChange}
            className="closeIcon"
            style={{
              /* float: right; */ width: "40px",
              /* height: 18px; */
              position: "absolute",
              top: "17px",
              right: "10px",
              height: "27px",
              color: "#0041C1",
            }}
          />
        </DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              <div style={{ marginTop: "25px", marginBottom: "25px" }}>
                <TextField
                  style={{
                    "margin-bottom": "7px",
                    "min-width": " 230px",
                    marginLeft: "3.2%",
                    width: " 85%",
                  }}
                  type="number"
                  id="outlined-basic"
                  label={t("Amount")}
                  variant="outlined"
                  name="balance"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p
                  style={{
                    marginLeft: "3.5%",
                    textTransform: "capitalize",
                    marginTop: "7px",
                  }}
                >
                  {/* {t("Available")} */}
                  Available credits: ???{credit}
                </p>
                <p
                  style={{
                    marginLeft: "3.5%",
                    marginTop: "7px",
                  }}
                >
                  {t("The_amount_must")}
                </p>
                <div
                  style={{
                    marginLeft: "4px",
                  }}
                >
                  <Checkbox
                    color="primary"
                    checked={accept}
                    onChange={(e) => setaccept(e.target.checked)}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />{" "}
                  {t("I_agree_to_the")}{" "}
                  <span className="mytrm">
                    <Link
                      href="https://www.dealence.com/termini-e-condizioni/"
                      target="_blank"
                    >
                      {t("tr")}
                    </Link>{" "}
                  </span>{" "}
                </div>
                {/* <Button
                  style={{
                    display: 'block', 
                  }}
                  type="submit"
                  onClick={submitChange}
                  variant="contained"
                  color="primary"
                >
                  Increment
                </Button> */}
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submitChange}
            color="primary"
            disabled={
              !amount ||
              !accept ||
              credit < 500 ||
              amount < 500 ||
              amount % 500 !== 0
            }
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Increment Dialog*/}
      <Dialog
        // style={{
        //   minHeight:''
        // }}
        className={classes.dbs}
        open={openSelect}
        onClose={selectClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {t("Chooser_your_plan")}
          <ClearIcon
            onClick={selectClose}
            className="closeIcon"
            style={{
              /* float: right; */ width: "40px",
              /* height: 18px; */
              position: "absolute",
              top: "17px",
              right: "10px",
              height: "27px",
              color: "#0041C1",
            }}
          />
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main">
              <div style={{ marginTop: "31px", marginBottom: "31px" }}>
                <div
                  style={{
                    borderRadius: "7px",
                    padding: "10px 15px",
                    boxShadow: "0px 0px 13px 0px rgb(82 63 105 / 15%)",
                  }}
                >
                  <div
                    // className="iconData"
                    style={{
                      display: "inline-block",
                      verticalAlign: "text-bottom",
                      marginTop: "18px",
                    }}
                  >
                    {/* <CalendarTodayIcon /> */}
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        padding: "12px 8px",
                        borderRadius: "50px",
                        color: "rgb(0, 65, 193)",
                      }}
                    >
                      <span>7.2%</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                        "font-size": "17px",
                      }}
                      className="plnTitle"
                    >
                      {t("Bimonthly")}
                    </div>
                    <div
                      style={{
                        marginBottom: "10px",
                      }}
                      className="plnText"
                    >
                      {t("Receive_the")}
                    </div>
                  </div>
                  <div className="selectbtnMy">
                    <Button
                      onClick={() => {
                        setPlan("BIMONTHLY");
                        setplanSelected("BIMONTHLY");
                      }}
                      className="sle"
                      style={{
                        marginBottom: "4px",
                        marginTop: "15px",
                        backgroundColor: `${planSelected === "BIMONTHLY" ? " #1274E7" : ""
                          }`,
                        color: `${planSelected === "BIMONTHLY" ? " #fff" : "#1274E7"
                          }`,
                        border: "1px solid rgba(0, 65, 193, 0.5)",
                      }}
                      variant="outlined"
                    >
                      {t("Select")}
                    </Button>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "7px",
                    padding: "10px 15px",
                    boxShadow: "0px 0px 13px 0px rgb(82 63 105 / 15%)",
                    marginTop: "21px",
                  }}
                >
                  <div
                    // className="iconData"
                    style={{
                      display: "inline-block",
                      verticalAlign: "text-bottom",
                      marginTop: "18px",
                    }}
                  >
                    {/* <CalendarTodayIcon /> */}
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        padding: "12px 8px",
                        borderRadius: "50px",
                        color: "rgb(0, 65, 193)",
                      }}
                    >
                      <span>30%</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                        "font-size": "17px",
                      }}
                      className="plnTitle"
                    >
                      {t("Semiannual")}
                    </div>
                    <div
                      style={{
                        marginBottom: "10px",
                      }}
                      className="plnText"
                    >
                      {t("Receive_the_every")}
                    </div>
                  </div>
                  <div className="selectbtnMy">
                    <Button
                      className="sle"
                      onClick={() => {
                        setPlan("SEMIANNUAL");
                        setplanSelected("SEMIANNUAL");
                      }}
                      style={{
                        marginBottom: "4px",
                        marginTop: "15px",
                        backgroundColor: `${planSelected === "SEMIANNUAL" ? " #1274E7" : ""
                          }`,
                        color: `${planSelected === "SEMIANNUAL" ? " #fff" : "#1274E7"
                          }`,
                        border: "1px solid rgba(0, 65, 193, 0.5)",
                      }}
                      variant="outlined"
                    >
                      {t("Select")}
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setopenSelect(false);
              setOpenChange(true);
            }}
            disabled={!plan ? true : false}
            color="primary"
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Increment Dialog 2*/}
      <Dialog
        // style={{
        //   minHeight:''
        // }}
        className={classes.dbs}
        open={openSelect2}
        onClose={selectClose2}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {t("Chooser_your_plan")}
          <ClearIcon
            onClick={selectClose2}
            className="closeIcon"
            style={{
              /* float: right; */ width: "40px",
              /* height: 18px; */
              position: "absolute",
              top: "17px",
              right: "10px",
              height: "27px",
              color: "#0041C1",
            }}
          />
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main">
              <div style={{ marginTop: "31px", marginBottom: "31px" }}>
                <div
                  style={{
                    borderRadius: "7px",
                    padding: "10px 15px",
                    boxShadow: "0px 0px 13px 0px rgb(82 63 105 / 15%)",
                  }}
                >
                  <div
                    // className="iconData"
                    style={{
                      display: "inline-block",
                      verticalAlign: "text-bottom",
                      marginTop: "18px",
                    }}
                  >
                    {/* <CalendarTodayIcon /> */}
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        padding: "12px 8px",
                        borderRadius: "50px",
                        color: "rgb(0, 65, 193)",
                      }}
                    >
                      <span>7.2%</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                        "font-size": "17px",
                      }}
                      className="plnTitle"
                    >
                      {t("Bimonthly")}
                    </div>
                    <div
                      style={{
                        marginBottom: "10px",
                      }}
                      className="plnText"
                    >
                      {t("Receive_the")}
                    </div>
                  </div>
                  <div className="selectbtnMy">
                    <Button
                      onClick={() => {
                        setPlan("BIMONTHLY");
                        setplanSelected("BIMONTHLY");
                      }}
                      className="sle"
                      style={{
                        marginBottom: "4px",
                        marginTop: "15px",
                        backgroundColor: `${planSelected === "BIMONTHLY" ? " #1274E7" : ""
                          }`,
                        color: `${planSelected === "BIMONTHLY" ? " #fff" : "#1274E7"
                          }`,
                        border: "1px solid rgba(0, 65, 193, 0.5)",
                      }}
                      variant="outlined"
                    >
                      {t("Select")}
                    </Button>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "7px",
                    padding: "10px 15px",
                    boxShadow: "0px 0px 13px 0px rgb(82 63 105 / 15%)",
                    marginTop: "21px",
                  }}
                >
                  <div
                    // className="iconData"
                    style={{
                      display: "inline-block",
                      verticalAlign: "text-bottom",
                      marginTop: "18px",
                    }}
                  >
                    {/* <CalendarTodayIcon /> */}
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        padding: "12px 8px",
                        borderRadius: "50px",
                        color: "rgb(0, 65, 193)",
                      }}
                    >
                      <span>30%</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                        "font-size": "17px",
                      }}
                      className="plnTitle"
                    >
                      {t("Semiannual")}
                    </div>
                    <div
                      style={{
                        marginBottom: "10px",
                      }}
                      className="plnText"
                    >
                      {t("Receive_the_every")}
                    </div>
                  </div>
                  <div className="selectbtnMy">
                    <Button
                      className="sle"
                      onClick={() => {
                        setPlan("SEMIANNUAL");
                        setplanSelected("SEMIANNUAL");
                      }}
                      style={{
                        marginBottom: "4px",
                        marginTop: "15px",
                        backgroundColor: `${planSelected === "SEMIANNUAL" ? " #1274E7" : ""
                          }`,
                        color: `${planSelected === "SEMIANNUAL" ? " #fff" : "#1274E7"
                          }`,
                        border: "1px solid rgba(0, 65, 193, 0.5)",
                      }}
                      variant="outlined"
                    >
                      {t("Select")}
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setopenSelect2(false);
              setOpen(true);
            }}
            disabled={!plan ? true : false}
            color="primary"
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
