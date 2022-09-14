/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";  

export default function CompanyInvoices() {
  let { companyName } = useParams();
  const [invoices, setInvoices] = useState([]);
  const invoicesRef = query(collectionGroup(db, 'invoices'), where('companyId', '==', companyName))

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
            <Link to={`/invoice/${invoice.invoiceId}`}>
              {invoice.invoiceId}
            </Link>
          </div>
        )
      }))}
    </div>
  )
}
