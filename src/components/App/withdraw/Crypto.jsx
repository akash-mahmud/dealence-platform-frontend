import React from 'react'
import { useTranslation } from "react-i18next";
import {
  Button,
  DialogActions,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle, Select, MenuItem
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
export default function Crypto({
  classes,
  withDrawByCryptoDialogue,
  withDrawCryptoModelHandelClode,
  handelCryptoNetChange,
  crypto,
  setcryptoAddress,
  cryptoDataSendToServer,
  withdrawLoading,
  cryptoAddress,
}) {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        className={classes.strpdlgibn}
        open={withDrawByCryptoDialogue}
        onClose={withDrawCryptoModelHandelClode}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          style={{
            margin: "12px",
          }}
          id="scroll-dialog-title"
        >
          <ClearIcon
            onClick={withDrawCryptoModelHandelClode}
            className="closeIcon"
            style={{
              /* float: right; */ width: "40px",
              /* height: 18px; */
              position: "absolute",
              top: "18px",
              right: "10px",
              height: "27px",
              color: "#0041C1",
            }}
          />
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Container component="main" maxWidth="xs">
              <div
                className="wiCr"
                style={{
                  width: "100%%",
                  margin: " 0 auto",
                }}
              >
                <img
                  className={classes.wiCr}
                  alt=""
                  src={"./image/Crypto.png"}
                />
              </div>
              <p style={{ margin: "0px 0 9px 0" }}>
                {t("Select_your")} Crypto:
              </p>
              <Select value={crypto} onChange={handelCryptoNetChange}>
                <MenuItem value="Bitcoin">
                  <img
                    src="./bitcoin-btc-logo.svg"
                    alt=""
                    style={{
                      height: "16px",
                      width: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Bitcoin
                </MenuItem>
                <MenuItem value="Etherium">
                  <img
                    src="./ethereum-eth-logo.svg"
                    alt=""
                    style={{
                      height: "16px",
                      width: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Etherium
                </MenuItem>
                {/* <MenuItem value="Doge coin">Doge coin</MenuItem> */}
                <MenuItem value="Lite coin">
                  <img
                    src="./litecoin-ltc-logo.svg"
                    alt=""
                    style={{
                      height: "16px",
                      width: "16px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  Lite coin
                </MenuItem>
              </Select>
              <div
                className="eban"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              >
                <form
                  style={{ paddingTop: "16px" }}
                  // onSubmit={handleSubmit}
                >
                  <label>{t("Your_wallet_Address")}</label>
                  <div className="elements_withdraw">
                    <input
                      style={{
                        marginBottom: "8px",
                      }}
                      type="text"
                      name="name"
                      onChange={(e) => setcryptoAddress(e.target.value)}
                      required
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      display: `${crypto !== "Etherium" ? "none" : ""}`,
                    }}
                  >
                    {t("eth_text")}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      display: `${crypto !== "Bitcoin" ? "none" : ""}`,
                    }}
                  >
                    {t("btc_text")}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      display: `${crypto !== "Lite coin" ? "none" : ""}`,
                    }}
                  >
                    {t("ltc_text")}
                  </p>
                  <button
                    className="pay-button"
                    style={{
                      fontWeight: "500",
                    }}
                    type="submit"
                    disabled={
                      !crypto || withdrawLoading === true || !cryptoAddress
                    }
                    onClick={cryptoDataSendToServer}
                  >
                    {t("Request_for_withdraw")}
                  </button>
                </form>
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            marginBottom: "32px",
          }}
        >
          {/* <Button onClick={withDrawCryptoModelHandelClode} color="primary">
            {t('Close')}
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

