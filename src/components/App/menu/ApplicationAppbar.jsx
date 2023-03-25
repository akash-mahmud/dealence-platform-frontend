import React, { useEffect } from 'react'
import AppBar from "@material-ui/core/AppBar";
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import {
  Button,
  Menu,
  Toolbar,
  Select,
  MenuItem,

  IconButton,
  Typography,
  Container,
  Divider,
  InputLabel,

} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import Notifications from "@material-ui/icons/Notifications";
import { useAuth } from "../../../hooks/use-auth";
import logo from "../../..//logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import { useTranslation } from "react-i18next";
import { setContract } from '../../../store/slicers/global';
export default function ApplicationAppbar({
  isSmallScreen,
  openDrawer,
  classes,
  currentRouteName,
  withdrawHandleOpen,
  handleClickOpenDialog,
  handleNotificationsChange,
  notificationsEnabled,
  handleMenu,
  anchorEl,
  openMenu,
  handleClose,
  handleDrawerOpen,
  balance,
}) {
  const auth = useAuth()
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();
  const {contract} = useSelector((state) => state.global)
  

  return (
    <>
      <AppBar
        elevation={0}
        position="absolute"
        color="inherit"
        // color="white"
        className={clsx(
          classes.appBar,
          auth.user && (openDrawer || !isSmallScreen) && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.routeName}>
            <span
              style={{
                display: `${auth.user ? "" : "none"}`,
              }}
            >
              {currentRouteName}
            </span>

            <div
              className={classes.hdlogo}
              style={{
                width: "0%",
                margin: " 9px auto",
              }}
            >
              <div
                style={{
                  marginLeft: "79%",
                }}
              >
                <img
                  style={{
                    height: "55px",
                    verticalAlign: "middle",
                    margin: " 10px 0",
                  }}
                  alt=""
                  onClick={() =>
                    window.open("https://www.dealence.com", "_blank")
                  }
                  src={logo}
                  // className={classes.logo}
                />
              </div>
            </div>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <img
              onClick={() => history.push("/")}
              src={logo}
              className={classes.logo}
            />
          </Typography>
         
          {auth.user && (
            <>
            
              <InputLabel id="select_contract" style={{
               marginRight:'5px'
             }}>Contract:</InputLabel>
            <div>
             
              <div className={classes.menuButton && classes.appBarLeftButtons}>
           
                  <Select onChange={(e) => {
                    dispatch(setContract(e.target.value))
                  }} value={contract ? contract : auth?.user?.contracts?.split(',')[0]} style={{
                    marginRight: '5px'
                }}>
                    {
                      auth.user?.contracts?.split(',').map((contract) => <MenuItem value={contract}>
                        {contract}</MenuItem>)
               }
                  
                </Select>
                <Button
                  variant="contained"
                  // color="primary"
                  style={{
                    backgroundColor: "#1274E7",
                    color: "#fff",
                    borderRadius: "4px",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => handleClickOpenDialog()}
                  className={classes.depositAppBarButton}
                >
                  {t("Deposit")}
                </Button>
                <Button
                  style={{
                    // rgba(102, 170, 255, 0.15)
                    backgroundColor: "rgba(102, 170, 255, 0.15)",
                    color: "#1274E7",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  variant="outlined"
                  // color="primary"
                  onClick={() => withdrawHandleOpen()}
                >
                  {t("Withdraw")}
                </Button>
                <IconButton
                  aria-label="email notifications bell"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleNotificationsChange}
                  className={classes.notificationsBellButton}
                >
                  <Notifications
                    className={clsx(
                      classes.notificationsBellIcon,
                      notificationsEnabled &&
                        classes.notificationsBellIconEnabled
                    )}
                  />
                </IconButton>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                  className={classes.userButton}
                >
                  <Person className={classes.profileIcon} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openMenu}
                  onClose={handleClose}
                  classes={{
                    list: classes.popupMenuList,
                  }}
                  className={classes.popupMenu}
                >
                  {/* border-radius: 4px; 
                  background-color: #1274E7; */}
                  <Container className={classes.popupMenuHeader}>
                    <Typography
                      variant="h6"
                      align="left"
                      className={classes.userPopupName}
                    >
                      {auth.user.first_name} {auth.user.last_name}
                    </Typography>
                    <Typography>{auth.user.email}</Typography>
                  
                  </Container>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      // handleClose()
                      // setAnchorEl(null);
                      auth.signout(() => {
                        handleClose();
                        history.push("/");
                      });
                    }}
                    className={classes.popupMenuItem}
                  >
                    {t("Logout")}
                  </MenuItem>
                </Menu>
              </div>
              
              {auth.user && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    classes.mobileMenuButton,
                    "mymenumbl"
                  )}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
