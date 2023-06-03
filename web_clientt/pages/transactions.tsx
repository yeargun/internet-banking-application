import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllTransactionsMutation } from "features/transaction/transactionApiSlice";
import JSONPretty from "react-json-pretty";

function TransactionHistory() {
  const [getAllTransactions, { isLoading }] = useGetAllTransactionsMutation();
  const [allTransactions, setAllTransactions] = useState();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    async function fetchAllTransactions() {
      try {
        const res = await getAllTransactions().unwrap();
        debugger;
        setAllTransactions(res);
      } catch (err) {}
    }
    fetchAllTransactions();
  }, [dispatch, getAllTransactions]);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <h1>All transactions</h1>
      {allTransactions && (
        <JSONPretty id="json-pretty" data={allTransactions}></JSONPretty>
      )}
    </>
  );
}

export default TransactionHistory;
