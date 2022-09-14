/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";

export default function SingleInvoice() {
  let { invoiceId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const invoiceRef = query(
    collectionGroup(db, "invoices"),
    where("invoiceId", "==", invoiceId)
  );

  useEffect(() => {
    const getInvoice = async () => {
      const docSnaps = await getDocs(invoiceRef)
      setInvoices(docSnaps.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
    }
    getInvoice()
  }, [])

  const invoice = invoices[0] || {} 

  return (
    <div>
      <p>{invoice.invoiceId}</p>
    </div>
  );
}
