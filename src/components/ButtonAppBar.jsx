import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import ApplicationAppbar from './App/menu/ApplicationAppbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import DialogActions from '@material-ui/core/DialogActions';
import ClearIcon from '@material-ui/icons/Clear';

import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,

  TextField,

} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useAuth } from '../hooks/use-auth';
import { useHistory } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import logo from '../logo.png';

import MenuIcon from '@material-ui/icons/Menu';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { toast } from 'react-toastify';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Person from '@material-ui/icons/Person';
import AppsIcon from '@material-ui/icons/Apps';
import PeopleIcon from '@material-ui/icons/People';
import ArrowDownwardOutlined from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import Settings from '@material-ui/icons/Settings';
import Notifications from '@material-ui/icons/Notifications';
import PieChart from '@material-ui/icons/PieChart';
import RssFeed from '@material-ui/icons/RssFeed';
import LiveHelp from '@material-ui/icons/LiveHelp';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import LanguageIcon from '@material-ui/icons/Language';
import StripeCard from './StripeCard';
import EbanMethod from './EbanMethod';
import { useTranslation } from 'react-i18next';
import { axiosRequest } from '../http/axiosRequest';
import { endpoint } from '../config/endpoints';
import WithdrawModal from './App/withdraw/WithdrawModal';
import Crypto from './App/withdraw/Crypto';
import Iban from './App/withdraw/Iban';
import AppDrawer from './App/menu/AppDrawer';

// import {useTranslation} from "react-i18next";
const drawerWidth = 240;
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


export default function ButtonAppBar(props) {
  const auth = useAuth();
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },

    logo: {
      maxWidth: 200,
      maxHeight: 57,
      marginTop: 10,
      flexGrow: 1,
      [theme?.breakpoints?.up('md')]: {
        display: 'none',
      },
    },
    drawerLogo: {
      maxWidth: 150,
      maxHeight: 42,
    },
    menuButton: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    mthmbl: {
      display: 'none',
    },
    moblmethod: {
      marginBottom: '10px',
    },
    appBarLeftButtons: {
      [theme?.breakpoints?.down('sm')]: {
        display: 'none',
      },
    },
    depositAppBarButton: {
      marginRight: theme.spacing(1),
    },
    mobileDrawerItems: {
      [theme?.breakpoints?.up('md')]: {
        display: 'none',
      },
    },
    toolbar: {
      [theme?.breakpoints?.up('md')]: {
        paddingRight: 24, // keep right padding when drawer closed
      },
    },
    toolbarIcon: {
      marginTop: 12,
      marginBottom: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      [theme?.breakpoints?.up('md')]: {
        display: 'none',
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    appBarShift: {
      [theme?.breakpoints?.up('sm')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    drawerPaper: {
      backgroundColor: 'white',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden'
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme?.breakpoints?.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    menuButtonHidden: {
      display: 'none',
    },
    mobileMenuButton: {
      [theme?.breakpoints?.up('md')]: {
        display: 'none',
      },
    },
    closeDrawerChevron: {
      [theme?.breakpoints?.up('md')]: {
        display: 'none',
      },
    },
    drawerLogoContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(3),
      [theme?.breakpoints?.down('sm')]: {
        display: 'none',
      },
    },
    routeName: {
      [theme?.breakpoints?.down('sm')]: {
        display: 'none',
      },
      // display: 'none',
      color: '#556B7F',
    },
    drawerListItem: {
      marginTop: theme.spacing(2),
      [theme?.breakpoints?.down('sm')]: {
        marginTop: theme.spacing(0.5),
      },
    },
    drawerListItemText: {
      fontWeight: 500,
    },
    drawerListItemIcon: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      padding: theme.spacing(1),
      minWidth: '0',
      marginRight: theme.spacing(2),
      borderRadius: '50%',
      color: 'rgba(0, 0, 0, 0.7)',
    },
    drawerListItemIconActive: {
      color: theme.palette.primary.main,
    },
    profileIcon: {
      // backgroundColor: "rgba(0, 0, 0, 0.2)"
      color: 'white',
    },
    userButton: {
      marginLeft: theme.spacing(1),
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    notificationsBellButton: {
      marginLeft: theme.spacing(1),
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    notificationsBellIcon: {
      color: 'rgba(0, 0, 0, 0.2)',
    },
    notificationsBellIconEnabled: {
      color: '#1274E7',
    },
    popupMenuList: {
      paddingBottom: 0,
    },
    popupMenu: {
      marginTop: theme.spacing(6.5),
    },
    userPopupName: {
      color: theme.palette.primary.main,
    },
    popupMenuHeader: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    },
    userPopupBalance: {
      fontWeight: 500,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 4,
      padding: theme.spacing(0.5),
    },
    balanceChip: {
      marginTop: theme.spacing(1),
    },
    popupMenuItem: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    hdlogo: {
      display: `${auth?.user ? 'none' : 'unset'}`,
    },
    payMthods: {
      display: 'unset',
    },
    withdraw: {
      width: '71%',
      margin: ' 0 auto',
    },
    mywth: {
      width: '333px',
      height: '261px',
    },
    img: {
      margin: ' 0 auto',
    },
    wiCr: {
      width: '404px',
      height: '300px',
    },
    usr: {
      display: 'none',
    },
    [theme?.breakpoints?.down('xs')]: {
      usr: {
        display: 'flex',
      },
      img: {
        margin: 'unset',
      },
      wiCr: {
        width: '302px',
        height: '205px',
      },
      strpdlg: {
        maxHeight: '80%',
      },
      strpdlgibn: {
        maxHeight: '90%',
      },
      payMthods: {
        display: 'none',
      },
      mthmbl: {
        display: 'unset',
      },
      withdraw: {
        width: 'unset',
        margin: 'unset',
      },
      mywth: {
        width: '300px',
        height: '230px',
      },
    },
    [theme?.breakpoints?.down('sm')]: {
      hdlogo: {
        display: 'none',
      },
    },

    [theme?.breakpoints?.down('md')]: {

      hdlogo: {
        display: 'none',
      },
    },
  }));
  const { t } = useTranslation();


  const [withDrawByCryptoDialogue, setwithDrawByCryptoDialogue] =
    useState(false);
  const [withdrawByIbanDialogue, setwithdrawByIbanDialogue] = useState(false);
  let [balance, setBalance] = useState(0);
  const [credit, setcredit] = useState(0);


  const classes = useStyles();

  const history = useHistory();


  let [depositAmmount, setdepositAmmount] = useState(500);

  const ammountHandler = async (e) => {


    setdepositAmmount(e.target.value);


    if (e.target.value >= 500) {
      const { data } = await axiosRequest.post(
        endpoint.transaction.crypto,
        {
          amount: e.target.value,
        },

      );

      setCoinbaseCheckoutData(data);
    }

    // setOpenDialog(false);
    // setCryptoDialogue(true);
  };

  let [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  let [openDrawer, setOpenDrawer] = React.useState(window.innerWidth >= 960);


  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleNotificationsChange = () => {
    const newNotificationsStatus = !notificationsEnabled;

    const updateNotificationsStatus = async () => {
      const payload = { notificationsEnabled: newNotificationsStatus };

      try {
        await axiosRequest.put(
          `${process.env.REACT_APP_API_DATA}/user/updateNotificationStatus`,
          payload,
          {
            withCredentials: true,
          }
        );

        setNotificationsEnabled(newNotificationsStatus);

        if (newNotificationsStatus) {

        } else {

        }
      } catch (error) {

      }
    };

    updateNotificationsStatus();
  };
  const requestServerToCrypto = async () => {
    if (depositAmmount >= 500) {
      setbuttonSelected('crypto');
      const { data } = await axiosRequest.post(
        endpoint.transaction.crypto,
        {
          amount: depositAmmount,
        },

      );

      setCoinbaseCheckoutData(data);

      // setOpenDialog(false);
      // setCryptoDialogue(true);
    }
  };

  let [openDialog, setOpenDialog] = useState(false);
  let [buttonSelected, setbuttonSelected] = useState('');
  let [stripeDialogue, setstripeDialogue] = useState(false);
  let [ebanDialogue, setebanDialogue] = useState(false);
  const [withdrawName, setwithdrawName] = useState('');
  const [withdrawEmail, setwithdrawEmail] = useState('');
  const [withdrawAmount, setwithdrawAmount] = useState();
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getData = useCallback(async () => {
    const res = await axiosRequest.get(
      endpoint.account.getbalance
    );

    setBalance(res.data.balance);
    setcredit(res.data.credit);
    // credit;
  }, []);
  useEffect(() => {


    getData();
  }, [getData]);

  let [sdk, setSdk] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosRequest.get(endpoint.user.me, {
        withCredentials: true,
      });

      if (res.data) {
        setNotificationsEnabled(res.data.notificationsEnabled);
      }
    };

    getUser();
  }, []);
  const [creditData, setcreditData] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const res = await axiosRequest.get(
        endpoint.account.getbalance
      );

      setcreditData(res.data.credit);
    };
    getData();
  }, []);
  const approveTrans = (data, actions) => {
    return actions.order.capture().then(function (details) {

      axiosRequest
        .post(
          endpoint.transaction.deposit,
          details,

        )
        .then(function () {
          const balanceAdd = async () => {
            const res = await axiosRequest.get(
              endpoint.account.getbalance
            );

            setBalance(res.data.balance);

            setOpenDialog(false);
          };
          balanceAdd();
        })
        .catch((e) => {
        });
    });
  }
  const [cryptoMessageByNetwork, setcryptoMessageByNetwork] = useState(
    'Minimum withdrawal is €25.00. Your withdrawal will have €8.00 subtracted from your remaining balance to cover the fee required to process the transaction.'
  );

  let [anchorEl, setAnchorEl] = React.useState(null);

  let [coinbaseCheckoutData, setCoinbaseCheckoutData] = useState({});
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAnchorEl(null);
  }, []);

  let [withdrawModel, setWithdrawModel] = useState(false);

  const withdrawHandleOpen = () => {
    if (!auth?.user?.isActive) {
      toast.error(
        t('Verify_your_withdraw') +
        t('Unverified_account')
      );

      return;
    }

    setWithdrawModel(true);
  };

  const withdrawHandleClose = () => {
    setWithdrawModel(false);
    setbuttonSelected(undefined);
    setwithdrawEmail(undefined)
    setwithdrawAmount(undefined)
  };

  // Handles drawer style for mobile and desktop
  const isSmallScreen = useMediaQuery((theme) => theme?.breakpoints?.down('sm'));

  const drawerProps = {
    variant: isSmallScreen ? 'temporary' : 'permanent',
  };

  // Map routes to titles
  const routeMap = {
    '/': 'Dashboard',
    '/verification': 'Verification',
    '/referral': 'Refer a Friend',
    '/account': t('SettingTab'),
    '/activities': t('Our_Investments'),
  };
  const stripeHandleCloseDialog = () => {
    setstripeDialogue(false);
  };
  const stripeEbanHandleCloseDialog = () => {
    setebanDialogue(false);
  };
  const currentRouteName = routeMap[useLocation().pathname];

  const getPayment = async () => {
    // const { data } = await axiosRequest.post(
    //   'http://localhost:4000/transaction/create-payment-intent',
    //   {
    //     amount: depositAmmount,
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );
    // setClientSecret(data.clientSecret);
    setOpenDialog(false);
    setstripeDialogue(true);
  };
  const appearance = {
    theme: 'stripe',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      width: 'auto',
      // See all possible variables below
    },
  };

  const options = {
    appearance,
  };

  const getPaymentEban = async () => {
    setOpenDialog(false);
    setebanDialogue(true);
  };

  const [crypto, setcrypto] = useState('Etherium');
  const [cryptoAddress, setcryptoAddress] = useState('');
  const [iban, setiban] = useState('');
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const sucessWindowHAndel = () => {
    setsuccessWindow(false);
    window.location.reload()
  };

  const requestServerToStripe = () => {
    setbuttonSelected('card');
    // getPayment();
    // setstripeDialogue(true);
  };

  const requestServerToStripeEban = async () => {
    setbuttonSelected('eban');
    // getPaymentEban();
  };
  const cloSeModel = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    requestServerToCrypto();
  }, []);

  const handelBackButton = () => {
    setOpenDialog(true);
    setebanDialogue(false);
    setstripeDialogue(false);
  };

  const handelBackButtonWithdraw = () => {
    setWithdrawModel(true);
    setwithdrawByIbanDialogue(false);
  };
  useEffect(() => {
    setbuttonSelected('');
  }, []);

  const withDrawCryptoModelHandelClode = () => {
    setwithDrawByCryptoDialogue(false);
    setcryptoWithdrawModelSuccesfulText(false);
  };
  const withDrawIbanModelHandelClode = () => {
    setwithdrawByIbanDialogue(false);
  };

  const [withdrawNameFull, setwithdrawNameFull] = useState('');
  const [bankName, setbankName] = useState('');
  const [swift, setswift] = useState();
  const [successWindow, setsuccessWindow] = useState(false);
  const [
    cryptoWithdrawModelSuccesfulText,
    setcryptoWithdrawModelSuccesfulText,
  ] = useState(false);
  const ibanwithdraw = () => {
    setbuttonSelected('ebanWithdraw');
  };

  const cryptowithdraw = () => {
    setbuttonSelected('cryptoWithdraw');
  };

  const withdrawWithMethod = () => {
    if (buttonSelected === 'ebanWithdraw') {
      setWithdrawModel(false);
      setwithdrawByIbanDialogue(true);
    } else if (buttonSelected === 'cryptoWithdraw') {
      setwithDrawByCryptoDialogue(true);
      setWithdrawModel(false);
    } else {
      return;
    }
  };

  const cryptoDataSendToServer = async (e) => {
    setwithdrawLoading(true);
    e.preventDefault();
    const { data } = await axiosRequest.post(
      endpoint.transaction.cryptoWithdraw,
      { withdrawAmount, cryptoAddress, crypto, withdrawName, withdrawEmail },

    );
    if (data === 'success') {
      setcryptoWithdrawModelSuccesfulText(true);
      setwithDrawByCryptoDialogue(false);
      setwithdrawLoading(false);
      setsuccessWindow(true);
      const getData = async () => {
        const res = await axiosRequest.get(
          endpoint.account.getbalance
        );

        setBalance(() => res.data.balance);
      };

      getData();
    }
  };

  const ibanWithdrawSuccess = () => { };
  const ibanDataSendToServer = async (e) => {
    setwithdrawLoading(true);
    e.preventDefault();
    const { data } = await axiosRequest.post(
      endpoint.transaction.withdraw,
      {
        withdrawAmount,
        withdrawNameFull,
        bankName,
        swift,
        withdrawEmail,
        iban,
      },

    );

    if (data === 'success') {
      setwithdrawByIbanDialogue(false);
      setwithdrawLoading(false);
      setsuccessWindow(true);
      // NotificationManager.success(data);

      const getData = async () => {
        const res = await axiosRequest.get(
          endpoint.account.getbalance,

        );

        setBalance(() => res.data.balance);
      };

      getData();
    }
  };

  const handeslDepost = async () => {
    if (buttonSelected === 'card') {
      getPayment();
    } else if (buttonSelected === 'eban') {
      //  setbuttonSelected('eban');
      getPaymentEban();
    } else {
      return;
    }

    // getPayment();
  };

  const liveMessage = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    }
  };

  const handelCryptoNetChange = (e) => {
    setcrypto(e.target.value);
  };
  const [failedCryptoDeposit, setfailedCryptoDeposit] = useState(false)
  const depostByCrypto = async () => {
    const data = await axiosRequest.post(
      endpoint.transaction.cr,
      { depositAmmount },

    );

  }

  const cloSeModelCryptoDeposit = () => {
    setOpenDialog(false);
    setfailedCryptoDeposit(false);
  }
  return (
    <>
      <Dialog
        open={successWindow}
        onClose={sucessWindowHAndel}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          style={{
            margin: '12px',
          }}
          id="scroll-dialog-title"
        >
          <ClearIcon
            onClick={sucessWindowHAndel}
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
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              <div
                style={{
                  width: '34%',
                  margin: '0 auto',
                  marginTop: '152px',
                  height: ` 200px`,
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',

                  top: '32%',
                  left: '6%',
                  right: '8%',
                }}
              >
                <i
                  style={{
                    color: '#1274E7',

                    fontSize: '85px',

                    marginLeft: '41%',
                  }}
                  className="fa-solid fa-circle-check"
                ></i>
                <div>
                  <span
                    style={{
                      display: 'block',
                      marginLeft: '20px',

                      marginTop: '15px',
                      textAlign: 'center',
                      fontSize: '17px',
                      fontWeight: '600',
                    }}
                  >
                    {t('Withdrawal_request_sent_successfully')}
                  </span>
                  <span
                    style={{
                      display: `${cryptoWithdrawModelSuccesfulText === true
                        ? 'none'
                        : 'block'
                        }`,
                      marginLeft: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      marginTop: '7px',
                    }}
                  >
                    {t('your_withdraw_email')}
                  </span>
                  <span
                    style={{
                      display: `${cryptoWithdrawModelSuccesfulText === false
                        ? 'none'
                        : 'block'
                        }`,
                      marginLeft: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      marginTop: '7px',
                    }}
                  >
                    {t('your_withdraw_email_crypto')}
                  </span>
                </div>
              </div>

              {/* </Button> */}
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            marginBottom: '41px',
          }}
        ></DialogActions>
      </Dialog>

      <Dialog
        open={failedCryptoDeposit}
        onClose={cloSeModelCryptoDeposit}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div
          style={{
            height: '663px',
          }}
        >
          <DialogTitle
            style={{
              margin: '12px',
            }}
            id="scroll-dialog-title"
          >
            <ClearIcon
              onClick={cloSeModelCryptoDeposit}
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
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Container component="main" maxWidth="xs">
                <div
                  style={{
                    width: '34%',
                    margin: '0 auto',
                    marginTop: '207px',
                    height: `299px`,
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',

                    top: '36%',
                    left: '6%',
                    right: '8%',
                  }}
                >
                  <i
                    style={{
                      color: '#ccc',

                      fontSize: '85px',

                      marginLeft: '227px',
                    }}
                    className="fa-solid fa-circle-xmark"
                  ></i>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        marginLeft: '20px',

                        marginTop: '15px',
                        textAlign: 'center',
                        fontSize: '17px',
                        fontWeight: '600',
                      }}
                    >
                      {t('Deposit_failed')}
                    </span>
                  </div>
                </div>

                {/* </Button> */}
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </div>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {t('Enter_the_amount')}
          {/* <h1>{t('welcome.title')}</h1> */}
          <ClearIcon
            onClick={cloSeModel}
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
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              <TextField
                type="number"
                id="outlined-basic"
                label={t('Enter_the')}
                variant="outlined"
                onChange={ammountHandler}
                value={depositAmmount}
                name="balance"
                style={{
                  marginTop: '30px',
                }}
              />
              <p
                style={{
                  fontSize: '13px',
                  marginTop: '8px',
                }}
              >
                <span
                  style={{
                    color: '#0041C1',
                  }}
                >
                  *
                </span>
                {t('Minimum_deposit')} €500
              </p>
              <p style={{ margin: '32px 0 9px 0' }}>
                {t('Select_your_payment')}
              </p>
              {/* variant=
              {` ${buttonSelected === 'card' ? 'contained' : 'outlined'}`} */}
              {/* color: #0041C1; */}
              <div
                className={classes.payMthods}
                style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                }}
              >
                <Button
                  onClick={() => requestServerToStripe()}
                  className="paybtns"
                  color="primary"
                  variant={'outlined'}
                  style={{
                    margin: ' 0 15px 0 0',
                    color: buttonSelected === 'card' ? '#fff' : '',

                    backgroundColor: buttonSelected === 'card' ? '#1274E7' : '',
                  }}
                  disabled={depositAmmount < 500 ? true : false}
                >
                  <i class="fa-solid fa-credit-card"></i>
                  {t('card')}
                </Button>
                <Button
                  onClick={() => requestServerToStripeEban()}
                  className="paybtns"
                  color="primary"
                  variant={'outlined'}
                  style={{
                    margin: ' 0 15px 0 0',
                    color: buttonSelected === 'eban' ? '#fff' : '',
                    backgroundColor: buttonSelected === 'eban' ? '#1274E7' : '',
                  }}
                  disabled={depositAmmount < 500 ? true : false}
                >
                  <i class="fa-solid fa-building-columns"></i>
                  Iban
                </Button>
                {/* <Button
                onClick={requestServerToCrypto}
                color="primary"
                variant={'outlined'}
                style={{
                  margin: ' 0 15px 0 0',
                  color: buttonSelected === 'crypto' ? '#fff' : '',
                  backgroundColor: buttonSelected === 'crypto' ? '#0041C1' : '',
                }}
              > */}
                <div
                  onClick={() => requestServerToCrypto()}
                  style={{ display: 'inline-block' }}
                >
                  <fieldset
                    disabled={depositAmmount < 500 ? true : false}
                    style={{ display: 'contents' }}
                  >
                    <CoinbaseCommerceButton
                      // onChargeSuccess={}
                      styled
                      style={{
                        padding: '7px 30px',
                        margin: ' 0 15px 0 0',
                        color: buttonSelected === 'crypto' ? '#fff' : '',
                        backgroundColor:
                          buttonSelected === 'crypto' ? '#1274E7' : '',
                      }}
                      checkoutId={coinbaseCheckoutData.id}
                      onChargeSuccess={(data) => { }}
                      onChargeFailure={(data) => {
                        // setfailedCryptoDeposit(true);
                      }}
                      onPaymentDetected={(data) => {
                        depostByCrypto();
                        // setBalance;
                        const getData = async () => {
                          const res = await axiosRequest.get(
                            endpoint.account.getbalance
                          );

                          props.setBalance(res.data.balance);
                          setcredit(res.data.credit);
                          // credit;
                        };

                        getData();
                        window.location.reload();
                      }}
                      onModalClosed={(data) => {
                        // setfailedCryptoDeposit(true);
                        // {event: 'charge_failed', code: 'CKAE3VJP', buttonId: '9dba92d2-35e7-4b56-96e6-650d76d0e48b'}
                        // is a user close the model  without deposit the money
                      }}
                    >
                      <i class="fa-solid fa-qrcode"></i>
                      Crypto
                    </CoinbaseCommerceButton>
                  </fieldset>
                </div>
              </div>
              <div className={classes.mthmbl}>
                <ul
                  style={{
                    listStyle: 'none',
                  }}
                >
                  <li className={classes.moblmethod}>
                    <Button
                      onClick={requestServerToStripe}
                      className="paybtns"
                      color="primary"
                      variant={'outlined'}
                      style={{
                        margin: ' 0 15px 0 0',
                        color: buttonSelected === 'card' ? '#fff' : '',

                        backgroundColor:
                          buttonSelected === 'card' ? '#1274E7' : '',
                      }}
                      disabled={depositAmmount < 500 ? true : false}
                    >
                      <i class="fa-solid fa-credit-card"></i>
                      {t('card')}
                    </Button>
                  </li>
                  <li className={classes.moblmethod}>
                    <Button
                      onClick={requestServerToStripeEban}
                      className="paybtns"
                      color="primary"
                      variant={'outlined'}
                      style={{
                        margin: ' 0 15px 0 0',
                        color: buttonSelected === 'eban' ? '#fff' : '',
                        backgroundColor:
                          buttonSelected === 'eban' ? '#1274E7' : '',
                      }}
                      disabled={depositAmmount < 500 ? true : false}
                    >
                      <i class="fa-solid fa-building-columns"></i>
                      Iban
                    </Button>
                  </li>
                  <li className={classes.moblmethod}>
                    <div
                      onClick={requestServerToCrypto}
                      style={{ display: 'inline-block' }}
                    >
                      <fieldset
                        disabled={depositAmmount < 500 ? true : false}
                        style={{ display: 'contents' }}
                      >
                        <CoinbaseCommerceButton
                          // onChargeSuccess={}
                          styled
                          style={{
                            padding: '7px 30px',
                            margin: ' 0 15px 0 0',
                            color: buttonSelected === 'crypto' ? '#fff' : '',
                            backgroundColor:
                              buttonSelected === 'crypto' ? '#1274E7' : '',
                          }}
                          checkoutId={coinbaseCheckoutData.id}
                          onChargeSuccess={(data) => { }}
                          onChargeFailure={(data) => {
                            // setfailedCryptoDeposit(true);
                          }}
                          onPaymentDetected={(data) => {
                            depostByCrypto();
                            // setBalance;
                            const getData = async () => {
                              const res = await axiosRequest.get(
                                endpoint.account.getbalance
                              );

                              props.setBalance(res.data.balance);
                              setcredit(res.data.credit);
                              // credit;
                            };

                            getData();
                          }}
                          onModalClosed={(data) => {
                            // setfailedCryptoDeposit(true);
                            // {event: 'charge_failed', code: 'CKAE3VJP', buttonId: '9dba92d2-35e7-4b56-96e6-650d76d0e48b'}
                            // is a user close the model  without deposit the money
                          }}
                        >
                          <i class="fa-solid fa-qrcode"></i>
                          Crypto
                        </CoinbaseCommerceButton>
                      </fieldset>
                    </div>
                  </li>
                </ul>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  marginBottom: '30px',
                  marginTop: '10px',
                }}
              >
                <i class="fa-solid fa-lock"></i>{' '}
                {t('Your_payment_info_is_secure_and_will_never_be_shared')}
              </p>
              {/* </Button> */}
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handeslDepost}
            color="primary"
            disabled={depositAmmount < 500 || !buttonSelected ? true : false}
          >
            {t('Deposit_Now')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className={classes.strpdlgibn}
        open={ebanDialogue}
        onClose={stripeEbanHandleCloseDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          style={{
            marginBottom: '21px',
          }}
          id="scroll-dialog-title"
        >
          <ClearIcon
            onClick={stripeEbanHandleCloseDialog}
            className="closeIcon"
            style={{
              /* float: right; */ width: '40px',
              /* height: 18px; */
              position: 'absolute',
              top: '15px',
              right: '10px',
              height: '27px',
              color: '#0041C1',
            }}
          />
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              <div className="  gateway">
                <Elements balance={depositAmmount} stripe={stripePromise}>
                  <EbanMethod
                    setebanDialogue={setebanDialogue}
                    balance={depositAmmount}
                    setBalance={setBalance}
                    setInvestBalance={props.setBalance}
                  />
                </Elements>
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            marginBottom: '30px',
          }}
        >
          <Button
            onClick={handelBackButton}
            style={{ position: 'absolute', left: '0', top: '11px' }}
            color="primary"
          >
            <ArrowBackIcon />
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className={classes.strpdlg}
        open={stripeDialogue}
        onClose={stripeHandleCloseDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          style={{
            marginBottom: '34px',
          }}
          id="scroll-dialog-title"
        >
          <ClearIcon
            onClick={stripeHandleCloseDialog}
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
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main">
              <div className="  gateway">
                {/* <PayPalButton
                  amount={pay}
                  options={{ currency: 'EUR' }}
                  style={{ 'margin-top': '20px' }}
                  onApprove={approveTrans}
                /> */}

                <Elements styled options={options} stripe={stripePromise}>
                  <StripeCard
                    setBalance={setBalance}
                    setstripeDialogue={setstripeDialogue}
                    balance={depositAmmount}
                    setInvestBalance={props.setBalance}
                  />
                </Elements>
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handelBackButton}
            style={{ position: 'absolute', left: '10px', top: '17px' }}
            color="primary"
          >
            <ArrowBackIcon />
          </Button>
          <Button
            style={{
              marginRight: '5px',
            }}
            onClick={stripeHandleCloseDialog}
            color="primary"
          >
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>

      <WithdrawModal classes={classes}
        withdrawModel={withdrawModel}
        withdrawHandleClose={withdrawHandleClose}
        withdrawEmail={withdrawEmail}
        setwithdrawEmail={setwithdrawEmail}
        withdrawAmount={withdrawAmount}
        setwithdrawAmount={setwithdrawAmount}
        ibanwithdraw={ibanwithdraw}
        credit={props.credit}
        buttonSelected={buttonSelected}
        cryptowithdraw={cryptowithdraw}
        depositAmmount={depositAmmount}
        creditData={creditData}
        withdrawWithMethod={withdrawWithMethod} />

      <Crypto
        classes={classes}
        withDrawByCryptoDialogue={withDrawByCryptoDialogue}
        withDrawCryptoModelHandelClode={withDrawCryptoModelHandelClode}
        handelCryptoNetChange={handelCryptoNetChange}
        crypto={crypto}
        setcryptoAddress={setcryptoAddress}
        cryptoDataSendToServer={cryptoDataSendToServer}
        withdrawLoading={withdrawLoading}
        cryptoAddress={cryptoAddress}
      />

      <Iban classes={classes}
        withdrawByIbanDialogue={withdrawByIbanDialogue}
        withDrawIbanModelHandelClode={withDrawIbanModelHandelClode}
        setwithdrawNameFull={setwithdrawNameFull}
        setbankName={setbankName}
        setiban={setiban}
        setswift={setswift}
        ibanDataSendToServer={ibanDataSendToServer}

        iban={iban}
        withdrawLoading={withdrawLoading}
        withdrawEmail={withdrawEmail}
        bankName={bankName}
        swift={swift}
        handelBackButtonWithdraw={handelBackButtonWithdraw} />
      <ApplicationAppbar
        isSmallScreen={isSmallScreen}
        openDrawer={openDrawer}
        classes={classes}
        currentRouteName={currentRouteName}

        withdrawHandleOpen={withdrawHandleOpen}
        handleClickOpenDialog={handleClickOpenDialog}
        handleNotificationsChange={handleNotificationsChange}
        notificationsEnabled={notificationsEnabled}
        handleMenu={handleMenu}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleClose={handleClose}
        handleDrawerOpen={handleDrawerOpen}
        balance={balance}
      />
      <AppDrawer drawerProps={drawerProps}
        classes={classes}
        openDrawer={openDrawer}
        isSmallScreen={isSmallScreen}
        handleDrawerClose={handleDrawerClose}
        balance={balance}
        currentRouteName={currentRouteName}
        handleClickOpenDialog={handleClickOpenDialog}
        withdrawHandleOpen={withdrawHandleOpen}
        liveMessage={liveMessage} />
    </>
  );
}
