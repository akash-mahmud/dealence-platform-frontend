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
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
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
  const auth = useAuth()
  const { t } = useTranslation();
  const { contract } = useSelector((state) => state.global)
  const classes = useStyles();
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosRequest.post(
        endpoint.contract.loadAvailableCredit, { contract: contract ? contract : auth?.user?.contracts?.split(',')[0] }
      );

      setcredit(data);

    };
    getData();
  }, [contract]);






  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [openChange, setOpenChange] = useState(false);


  const handleClickOpen = () => {
    setopenSelect2(true);
  };





  const handleClickChange = () => {
    setPlan(invest.plan);
    // setOpenChange(true);
    setopenSelect(true);
  };
  const [depositLoading, setdepositLoading] = useState(false)
  let [depositAmmount, setdepositAmmount] = useState();
  const [depositRequestSuccess, setDepositRequestSuccess] = useState(false)
  let [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDepositRequestSuccess(false)
    setdepositLoading(false)

  };


  const handeslDepost = async () => {
    setdepositLoading(true)
    try {
      const { data } = await axiosRequest.post(endpoint.investment.reinvest, {
        amount: depositAmmount,
        contract
      })
      if (data === 'success') {
        setDepositRequestSuccess(true)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setdepositLoading(false)
  };

  const handleClickOpenDialog = () => {
    if (!auth?.user?.isActive) {
      toast.error(
        t('Verify_your_account_before') +
        t('Unverified_account')
      );

      return;
    }

    setOpenDialog(true);
  };
  return (
    <>
      <Title>{t("Available_Credit")}</Title>
      <Typography component="p" variant="h4">
        &euro;{credit?.credit? credit?.credit : 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {t("data_on")} {new Date(Date.now()).toDateString()}
      </Typography>

      {
        invest === "" && (
          <Button variant="contained" color="primary" onClick={() => handleClickOpenDialog()}>
            Re-invest{/* {t("Increment")} */}
          </Button>
        )
      }
      {invest && (
        <Button variant="contained" color="primary" onClick={() => handleClickOpenDialog()}>
          Re-invest{/* {t("Increment")} */}
        </Button>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {
            depositLoading ? 'Processing' : depositRequestSuccess ? "success" : t('Enter_the_amount')
          }


          {
            depositLoading ? <Skeleton /> : <ClearIcon
              onClick={handleCloseDialog}
              className="closeIcon"
              style={{
              /* float: right; */ width: '40px',
                /* height: 18px; */
                position: 'absolute',
                top: '17px',
                right: '10px',
                height: '27px',
                color: '#0041C1',
              }}
            />
          }

        </DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              {
                !depositRequestSuccess ? <> {
                  depositLoading ? <Skeleton /> : <TextField
                    type="number"
                    id="outlined-basic"
                    label={t('Enter_the')}
                    variant="outlined"
                    onChange={(e) => {
                      setdepositAmmount(e.target.value)
                    }}
                    value={depositAmmount}
                    name="balance"
                    style={{
                      marginTop: '30px',
                    }}
                  />
                }

                  <p
                    style={{
                      fontSize: '13px',
                      marginTop: '8px',
                    }}
                  >
                    {
                      depositLoading ? <Skeleton /> : <>
                        {/* <span
                          style={{
                            color: '#0041C1',
                          }}
                        >
                          *
                        </span> */}
                        {t("Available_ammount")} €{credit?.credit}
                      </>
                    }

                  </p>

                </> : <>
                  <div>
                    <p>“Gentile Cliente, la sua richiesta è stata presa in carico.
                      La ringraziamo,
                      Il Team di Dealence”</p>
                  </div>
                </>
              }




            </Container>

          </DialogContentText>
        </DialogContent>
        {
          !depositRequestSuccess && <DialogActions>
            {

              depositLoading ? <Skeleton /> : <Button
                onClick={handeslDepost}
                color="primary"
                disabled={depositLoading || !depositAmmount || depositAmmount> credit?.credit}
              >
                {t('Deposit_Now')}
              </Button>

            }

          </DialogActions>
        }

      </Dialog>
    </>
  );
}
