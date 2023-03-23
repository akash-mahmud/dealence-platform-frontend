import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dateFormat from 'dateformat';
import Title from './Title';
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,

  TextField,
  Typography,

  Checkbox,
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

import DialogActions from '@material-ui/core/DialogActions';

import { useAuth } from '../hooks/use-auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { endpoint } from '../config/endpoints';
import { axiosRequest } from '../http/axiosRequest';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: 'block',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  balanceContext: {
    flex: 1,
  },
  [theme.breakpoints.down('xs')]: {
    dbs: {
      maxHeight: '84%',
    },
  },
}));

export default function Investment({
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

  const auth = useAuth();

  const [amount, setAmount] = useState('');
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

  const classes = useStyles();
  const submitHandle = async () => {

    const res = await axiosRequest.post(
     endpoint.investment.create,
      { plan, amount },

    );

    if (res.data === 'success') {
      setOpen(false);
      toast.success(t('Your_plan')+ t('Plan_actived'));
      investmentCallback();
    } else {
      toast.error(t('Something')+ t('Error'));
    }

    const getData = async () => {
      const investData = await axiosRequest.get(
        endpoint.investment.get,
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
        window.location.reload();
  };

  const submitChange = async () => {
    // setopenSelect(true);
    const res = await axiosRequest.put(
      endpoint.investment.update,
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
        endpoint.investment.get,
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
        window.location.reload();
  };

  const [planSelected, setplanSelected] = useState();
  useEffect(() => {
    const getData = async () => {
      const investData = await axiosRequest.get(
        endpoint.investment.get,
      );

      setInvest(investData.data);
    };
    getData();
  }, []);

  return (
    <>







      
      <Title>{t('Portfolio_Balance')}</Title>
      <Typography component="p" variant="h4">
        &euro;{invest ? invest.principal : 0}
      </Typography>
      <Typography color="textSecondary" className={classes.balanceContext}>
        {invest
          ? t('Since') + dateFormat(invest.updatedAt, 'mmmm dS, yyyy')
          : t('data_on') + new Date(Date.now()).toDateString()}
      </Typography>

 
    </>
  );
}
