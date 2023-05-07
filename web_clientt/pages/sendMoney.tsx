import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllAccountsMutation } from "features/account/accountApiSlice";
import JSONPretty from "react-json-pretty";
import { useSendMoneyMutation } from "features/transaction/transactionApiSlice";
import styles from "../styles/SendMoney.module.css";

const findAccountByIBAN = (accounts, IBAN) => {
  return accounts.find((account) => account.IBAN === IBAN);
};

function SendMoney() {
  const [getAllAccounts, { isLoading }] = useGetAllAccountsMutation();
  const [sendMoney, { isLoadingMoneyTransfer }] = useSendMoneyMutation();
  const [selectedIBAN, setSelectedIBAN] = useState();
  const [selectedAccount, setSelectedAccount] = useState();
  const [toIBAN, setToIBAN] = useState();
  const [amount, setAmount] = useState();

  const [allAccounts, setAllAccounts] = useState();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    async function fetchAllAccounts() {
      try {
        const res = await getAllAccounts().unwrap();
        debugger;
        setAllAccounts(res);
      } catch (err) {}
    }
    fetchAllAccounts();
  }, [dispatch]);

  const formatIBAN = (input) => {
    console.log("@@ ", input.value);
    // Remove all spaces from the input value
    let value = input.value.replace(/\s/g, "");

    // Add a space after every 4 characters
    value = value.replace(/(.{4})/g, "$1 ");

    setToIBAN(value);

    // Update the input value with the formatted text
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMoney({
        fromIBAN: selectedIBAN,
        toIBAN,
        amount,
      }).unwrap();
      fetchAllAccounts();
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400 || err.data) {
        setErrMsg(err.data);
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const handleIbanSelection = (IBAN) => {
    setSelectedIBAN((prevIBAN) => IBAN);
    setSelectedAccount(findAccountByIBAN(allAccounts, IBAN));
  };

  const setAmountHandle = (amount) => {
    console.log("checkif amount is higher than the balance");
    setAmount(amount);
  };

  const selectedAccountDetails = (
    <div className={styles.selectedAccount}>
      <h2>Selected account details</h2>
      <h5>IBAN: {selectedAccount?.IBAN || ""}</h5>
      <h5>Balance: {selectedAccount?.balance || ""}</h5>
      <h5>Currency: {selectedAccount?.currency_id || ""}</h5>
    </div>
  );

  const fromAccountDropdown = (
    <div>
      <label for="selectedIban">Select account to send money from: </label>
      <select
        className={styles.input}
        id="selectedIban"
        name="selected-iban"
        value={selectedIBAN}
        onChange={(e) => handleIbanSelection(e.target.value)}
      >
        <option value="" selected disabled>
          ...
        </option>
        {allAccounts?.map((account, ind) => (
          <option key={`ee${ind}`} value={account.IBAN}>
            {account.IBAN}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <h1>Transfer money</h1>
      {selectedAccountDetails}

      <form className={styles.form} action="" onSubmit={handleSubmit}>
        {fromAccountDropdown}
        <div>
          <label for="IBAN">To IBAN: </label>
          <input
            id="IBAN"
            onInput={formatIBAN}
            className={styles.input}
            type="text"
            value={toIBAN}
            maxLength={24}
            onChange={(e) => setToIBAN(e.target.value)}
          />
        </div>
        <div>
          <label for="amount">Amount: </label>
          <input
            id="amount"
            className={styles.input}
            type="number"
            value={amount}
            min={0}
            onChange={(e) => setAmountHandle(e.target.value)}
          />
        </div>

        <button className={styles.formButton}>Send Money</button>
      </form>
    </>
  );
}

export default SendMoney;
