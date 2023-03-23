import { Button,DialogActions, Container, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
export default function WithdrawModal({
  classes,
  withdrawModel,
  withdrawHandleClose,
  withdrawEmail,
  setwithdrawEmail,
  withdrawAmount,
  setwithdrawAmount,
  ibanwithdraw,
  credit,
  buttonSelected,
  cryptowithdraw,
  depositAmmount,
  creditData,
  withdrawWithMethod,
}) {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        className={classes.strpdlgibn}
        open={withdrawModel}
        onClose={withdrawHandleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {t("Withdraw")}
          <ClearIcon
            onClick={withdrawHandleClose}
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
                className="eban"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              >
                <div
                  className={clsx(classes.withdraw, "ibnImgwithdrawPopup")}
                  style={{}}
                >
                  <img
                    className={clsx(classes.mywth)}
                    alt=""
                    src={"./image/Withdraw.png"}
                  />
                </div>
                <form
                  style={
                    {
                      // marginTop: '100px',
                    }
                  }

                  // onSubmit={handleSubmit}
                >
                  <label>{t("Your_Email")} </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={withdrawEmail}
                    onChange={(e) => setwithdrawEmail(e.target.value)}
                  />
                  <label>{t("Ammount")}: </label>
                  <input
                    style={{
                      marginBottom: "0",
                    }}
                    type="number"
                    name="ammount"
                    value={withdrawAmount}
                    onChange={(e) => {
                      if (e.target.value) {
                        if (parseFloat(e.target.value) < creditData) {
                          setwithdrawAmount(e.target.value)
                        }
                      } else {
                        setwithdrawAmount(undefined)
                      }
                    
                     
                    }}
                  />
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#aeacac",
                      marginTop: "2px",
                    }}
                  >
                    {t("Available_ammount")} €{credit}
                  </p>
                </form>
                <p style={{ margin: "30px 0 9px 0" }}>
                  {t("Select_your_payment")}
                </p>
                <div
                  style={{
                    marginBottom: "35px",
                  }}
                >
                  <Button
                    onClick={ibanwithdraw}
                    color="primary"
                    variant={"outlined"}
                    style={{
                      margin: " 0 15px 0 0",
                      color: buttonSelected === "ebanWithdraw" ? "#fff" : "",
                      backgroundColor:
                        buttonSelected === "ebanWithdraw" ? "#1274E7" : "",
                    }}
                    // disabled={
                    //   !withdrawEmail ||
                    //   // !withdrawAmount ||
                    //   !creditData ||

                    //   withdrawAmount > creditData

                    // }
                  >
                    Iban
                  </Button>

              
                </div>
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={
              !withdrawEmail ||
              !withdrawAmount
           
        
          
            }
            onClick={withdrawWithMethod}
            color="primary"
          >
            {t("Withdraw")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
