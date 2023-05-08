import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllAccountsMutation } from "features/account/accountApiSlice";
import JSONPretty from "react-json-pretty";
import { useSendMoneyMutation } from "features/transaction/transactionApiSlice";
import styles from "../styles/SendMoney.module.css";
import { useRouter } from "next/router";

const findAccountByIBAN = (accounts, IBAN) => {
  return accounts.find((account) => account.IBAN === IBAN);
};

function SendMoney() {
  const [getAllAccounts, { isLoading }] = useGetAllAccountsMutation();
  const [sendMoney, { isLoadingMoneyTransfer }] = useSendMoneyMutation();
  const [selectedIBAN, setSelectedIBAN] = useState();
  const [selectedAccount, setSelectedAccount] = useState();
  const [toIBAN, setToIBAN] = useState();
  const [amount, setAmount] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [allAccounts, setAllAccounts] = useState([]);

  const dispatch = useDispatch();

  async function fetchAllAccounts() {
    try {
      const res = await getAllAccounts().unwrap();
      debugger;
      setAllAccounts((prevState) => res);
    } catch (err) {}
  }

  useLayoutEffect(() => {
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

  const showWithSpaces = (IBAN) => {
    if (!IBAN) return IBAN;
    IBAN = IBAN.replace(/\s/g, "");
    return IBAN.replace(/(.{4})/g, "$1 ");
  };

  const removeSpaces = (toIBAN) => {
    return toIBAN.replace(/\s/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIBAN === removeSpaces(toIBAN)) {
      setErrorMessage("Sender account and reciever account can not be same");
      return;
    }
    try {
      await sendMoney({
        fromIBAN: selectedIBAN,
        toIBAN: removeSpaces(toIBAN),
        amount,
      });
      //   setSelectedIBAN(undefined);
      router.reload();
    } catch (err) {
      if (!err?.originalStatus) {
        console.log("No Server Response");
      } else if (err.originalStatus === 400 || err.data) {
        console.log(err.data);
      } else {
        console.log("Sending money failed");
      }
    }
  };

  const handleIbanSelection = (IBAN) => {
    console.log("handle", IBAN);
    console.log("selectedIban", selectedIBAN);
    setSelectedIBAN((prevIBAN) => IBAN);
    setSelectedAccount(findAccountByIBAN(allAccounts, IBAN));
  };

  const setAmountHandle = (amount) => {
    setAmount(parseInt(amount));
  };

  const selectedAccountDetails = (
    <div className={styles.selectedAccount}>
      <h2>Selected account details</h2>
      <h5>IBAN: {showWithSpaces(selectedAccount?.IBAN) || ""}</h5>
      <h5>Balance: {selectedAccount?.balance}</h5>
      <h5>Currency: {selectedAccount?.symbol || ""}</h5>
    </div>
  );

  const fromAccountDropdown = (
    <div>
      <label htmlFor="selectedIban">Select account to send money from: </label>
      <select
        style={{ padding: "4px" }}
        className={styles.input}
        id="selectedIban"
        name="selected-iban"
        value={selectedIBAN}
        onChange={(e) => handleIbanSelection(e.target.value)}
        defaultValue={""}
      >
        <option style={{ padding: "4px" }} value="" defaultValue={""} disabled>
          ...
        </option>
        {allAccounts?.map((account, ind) => (
          <option
            style={{ padding: "4px" }}
            key={`ee${ind}`}
            value={account.IBAN}
          >
            {showWithSpaces(account.IBAN)}
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
          <label htmlFor="IBAN">To IBAN: </label>
          <input
            style={{ width: "300px", padding: "4px" }}
            id="IBAN"
            onInput={(e) => formatIBAN(e.target)}
            className={styles.input}
            type="text"
            value={toIBAN}
            maxLength={39}
            // onChange={(e) => setToIBAN(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount: </label>
          <input
            style={{ width: "200px", padding: "4px" }}
            disabled={!selectedAccount}
            max={selectedAccount?.balance}
            id="amount"
            className={styles.input}
            type="number"
            value={amount}
            min={0}
            onChange={(e) => setAmountHandle(e.target.value)}
          />
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <button className={styles.formButton}>Send Money</button>
      </form>
    </>
  );
}

export default SendMoney;
