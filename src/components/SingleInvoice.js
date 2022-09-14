/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";

export default function SingleInvoice() {

  let { invoiceLC } = useParams();
  const [invoice, setInvoice] = useState({});
  const invoiceRef = doc(db, "invoices", invoiceLC);

  useEffect(() => {
    const getInvoice = async () => {
      const docSnap = await getDoc(invoiceRef)
      setInvoice(docSnap.data())
    }
    getInvoice()
  }, [])



  return (
    <div>
      <p>{invoice.invoiceId}</p>
    </div>
  );
}
