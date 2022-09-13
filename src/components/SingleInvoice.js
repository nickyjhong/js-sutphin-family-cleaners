/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";  

export default function SingleInvoice() {
  // const [invoice, setInvoice] = useState({});
  // const invoiceRef = query(collectionGroup(db, 'invoices'), where('companyName', '==', 'sixt'))

  // useEffect(() => {
  //   const getInvoice = async () => {
  //     const data = await getDocs(invoiceRef);
  //   }
  //   getInvoice();
  // }, [])

  // console.log('invoice2', invoice)
  return (
    <div>
      {/* {invoice.invoiceId} */} Hello
    </div>
  )
}
