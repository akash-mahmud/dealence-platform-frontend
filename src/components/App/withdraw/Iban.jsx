import React from 'react'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";
import {
  Button,
  DialogActions,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
export default function Iban({
  classes,
  withdrawByIbanDialogue,
  withDrawIbanModelHandelClode,
  setwithdrawNameFull,
  setbankName,
  setiban,
  setswift,
  ibanDataSendToServer,

  iban,
  withdrawLoading,
  withdrawEmail,
  bankName,
  swift,
  handelBackButtonWithdraw,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Dialog
        className={classes.strpdlgibn}
        open={withdrawByIbanDialogue}
        onClose={withDrawIbanModelHandelClode}
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
            onClick={withDrawIbanModelHandelClode}
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
              <div
                className="eban"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              >
                <div
                  className={clsx(classes.img, "ibnImgWithdraw")}
                  style={{
                    width: "74%",
                  }}
                >
                  <img alt="" src={"./image/SEPA.png"} />
                </div>
                <form
                  style={
                    {
                      //  paddingTop: '16px'
                    }
                  }
                  // onSubmit={handleSubmit}
                >
                  <div>
                    <label>{t("Full_Name")}</label>
                    <div className="elements_withdraw">
                      <input
                        type="text"
                        name="name"
                        style={{
                          height: "50px",
                        }}
                        onChange={(e) => setwithdrawNameFull(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label>{t("Bank_Name")}</label>
                    <div className="elements_withdraw">
                      <input
                        type="text"
                        name="name"
                        style={{
                          height: "50px",
                        }}
                        onChange={(e) => setbankName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label>IBAN:</label>
                    <div className="elements_withdraw">
                      <input
                        type="text"
                        name="name"
                        style={{
                          height: "50px",
                        }}
                        onChange={(e) => setiban(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label>BIC/Swift:</label>
                    <div className="elements_withdraw">
                      <input
                        type="text"
                        name="name"
                        style={{
                          height: "50px",
                        }}
                        onChange={(e) => setswift(e.target.value)}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("our_bank")}
                  </p>
                  <button
                    style={{
                      fontWeight: "500",
                      // borderRadius: '7px',
                    }}
                    className="pay-button"
                    type="submit"
                    disabled={
                      !iban ||
                      withdrawLoading === true ||
                      !withdrawEmail ||
                      !bankName ||
                      !swift
                    }
                    onClick={ibanDataSendToServer}
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
            marginBottom: "41px",
          }}
        >
          <Button
            onClick={handelBackButtonWithdraw}
            style={{ position: "absolute", left: "0", top: "11px" }}
            color="primary"
          >
            <ArrowBackIcon />
          </Button>
          {/* <Button onClick={withDrawIbanModelHandelClode} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
