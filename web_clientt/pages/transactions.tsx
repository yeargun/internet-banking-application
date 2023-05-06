import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllTransactionsMutation } from "features/transaction/transactionApiSlice";

function Accounts() {
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
  }, [dispatch]);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <h1>All transactions</h1>
      {allTransactions && <pre>{JSON.stringify(allTransactions)}</pre>}
    </>
  );
}

export default Accounts;
