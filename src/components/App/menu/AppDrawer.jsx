import React from 'react'
import clsx from 'clsx'
import { useAuth } from "../../../hooks/use-auth";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {

  IconButton,

  List,
  ListItem,
  ListItemText,
  ListItemIcon, Drawer
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Person from "@material-ui/icons/Person";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import Settings from "@material-ui/icons/Settings";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PieChart from "@material-ui/icons/PieChart";
import RssFeed from "@material-ui/icons/RssFeed";
import LiveHelp from "@material-ui/icons/LiveHelp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LanguageSelect from "../../LanguageSelect.jsx";
import logo from "../../..//logo.png";
export default function AppDrawer({
  drawerProps,
  classes,
  openDrawer,
  isSmallScreen,
  handleDrawerClose,
  balance,
  currentRouteName,
  handleClickOpenDialog,
  withdrawHandleOpen,
  liveMessage,
}) {
  const auth = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      {auth.user && (
        <Drawer
          {...drawerProps}
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !(openDrawer || !isSmallScreen) && classes.drawerPaperClose
            ),
          }}
          open={openDrawer || !isSmallScreen}
        >
          <div className={classes.drawerLogoContainer}>
            <img
              onClick={() => history.push("/")}
              src={logo}
              className={classes.drawerLogo}
            />
          </div>

          <div className={classes.toolbarIcon}>
            <IconButton
              onClick={handleDrawerClose}
              className={classes.closeDrawerChevron}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List>
            <ListItem
              button
              // onClick={() => history.push('/')}
              // onClick={handleMenu}
              className={clsx(classes.drawerListItem, classes.usr)}
            >
              <ListItemIcon
                className={clsx(
                  classes.drawerListItemIcon
                  // currentRouteName == 'Dashboard' &&
                  //   classes.drawerListItemIconActive
                )}
              >
                <Person />
              </ListItemIcon>
              <ListItemText
                style={
                  {
                    // color: '#556B7F',
                  }
                }
                primary={`${auth.user.first_name} ${auth.user.last_name}`}
                className={classes.drawerListItemText}
                secondary={
                  <>
                    <p
                      style={{
                        color: "#0041C1",
                        fontSize: "12px",
                      }}
                    >
                      {`${t("Available")}: €${balance} `}
                    </p>
                  </>
                }
              />
            </ListItem>
            {!auth.user.isActive && !auth.user.isDocumentUploaded && (
              <ListItem
                button
                onClick={() => history.push("/verification")}
                className={classes.drawerListItem}
              >
                <ListItemIcon
                  className={clsx(
                    classes.drawerListItemIcon,
                    currentRouteName == "Verification" &&
                      classes.drawerListItemIconActive
                  )}
                >
                  <VerifiedUserIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("Verify_Account")}
                  secondary={
                    <>
                      <p
                        style={{
                          color: "#0041C1",
                        }}
                      >
                        {t("Start_here")}
                      </p>
                    </>
                  }
                />
              </ListItem>
            )}
            {/* <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
              className={classes.userButton}
            >
              <Person className={classes.profileIcon} />
            </IconButton> */}

            <ListItem
              button
              onClick={() => history.push("/")}
              className={classes.drawerListItem}
            >
              <ListItemIcon
                className={clsx(
                  classes.drawerListItemIcon,
                  currentRouteName == "Dashboard" &&
                    classes.drawerListItemIconActive
                )}
              >
                <AppsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                className={classes.drawerListItemText}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => handleClickOpenDialog()}
              className={clsx(
                classes.mobileDrawerItems,
                classes.drawerListItem
              )}
            >
              <ListItemIcon className={classes.drawerListItemIcon}>
                <ArrowDownwardOutlined />
              </ListItemIcon>
              <ListItemText primary={t("Deposit")} />
            </ListItem>
            <ListItem
              button
              onClick={() => withdrawHandleOpen()}
              className={clsx(
                classes.mobileDrawerItems,
                classes.drawerListItem
              )}
            >
              <ListItemIcon className={classes.drawerListItemIcon}>
                <ArrowUpwardOutlined />
              </ListItemIcon>
              <ListItemText primary={t("Withdraw")} />
            </ListItem>

            <ListItem
              button
              onClick={() => history.push("/activities")}
              className={clsx(classes.drawerListItem)}
            >
              <ListItemIcon
                className={clsx(
                  classes.drawerListItemIcon,
                  currentRouteName == "Our Activities" &&
                    classes.drawerListItemIconActive
                )}
              >
                <PieChart />
              </ListItemIcon>
              <ListItemText primary={t("Investments")} />
            </ListItem>

            <ListItem
              button
              onClick={() => history.push("/account")}
              className={clsx(classes.drawerListItem)}
            >
              <ListItemIcon
                className={clsx(
                  classes.drawerListItemIcon,
                  currentRouteName == "Settings" &&
                    classes.drawerListItemIconActive
                )}
              >
                <Settings />
              </ListItemIcon>
              <ListItemText primary={t("Settings")} />
            </ListItem>

            <ListItem
              onClick={() =>
                window.open("https://www.dealence.com/blog", "_blank")
              }
              button
              className={clsx(classes.drawerListItem)}
            >
              <ListItemIcon className={clsx(classes.drawerListItemIcon)}>
                <RssFeed />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItem>
            <ListItem
              button
              // onClick={() => history.push('/referral')}
              className={classes.drawerListItem}
            >
              <ListItemIcon
                className={clsx(
                  classes.drawerListItemIcon
                  // currentRouteName == 'Refer a Friend' &&
                  //   classes.drawerListItemIconActive
                )}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Refer_a_Friend")}
                secondary={
                  <>
                    <p
                      style={{
                        color: "#0041C1",
                      }}
                    >
                      {t("Coming_Soon")}
                    </p>
                  </>
                }
              />
            </ListItem>

            <ListItem button className={clsx(classes.drawerListItem)}>
              <ListItemIcon className={clsx(classes.drawerListItemIcon)}>
                <LiveHelp />
              </ListItemIcon>
              <ListItemText
                onClick={liveMessage}
                primary={t("Live_Chat_Support")}
              />
            </ListItem>
            <ListItem
              button
              // onClick={() => history.push('/')}
              // onClick={handleMenu}
              onClick={() => auth.signout(() => history.push("/"))}
              className={clsx(classes.drawerListItem, classes.usr)}
            >
              <ListItemIcon
                className={clsx(
                  classes.drawerListItemIcon
                  // currentRouteName == 'Dashboard' &&
                  //   classes.drawerListItemIconActive
                )}
              >
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                style={{
                  color: "#556B7F",
                }}
                primary={t("Logout")}
                className={classes.drawerListItemText}
              />
            </ListItem>
            <ListItem
              style={{ marginLeft: "12px" }}
              button
              className={clsx(classes.drawerListItem)}
            >
              <LanguageSelect />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
}
