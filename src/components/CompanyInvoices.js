/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";  

export default function CompanyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const invoicesRef = query(collectionGroup(db, 'invoices'), where('companyName', '==', 'sixt'))

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(invoicesRef);
      setInvoices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getInvoices();
  }, [])

  return (
    <div>
      {invoices.map((invoice => {
        return (
          <div key={invoice.id}>
            <p>{invoice.invoiceId}</p>
          </div>
        )
      }))}
    </div>
  )
}
