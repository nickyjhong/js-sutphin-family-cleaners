/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collectionGroup, query, getDocs } from "firebase/firestore";

export default function AllInvoices() {
  const [invoices, setInvoices] = useState([]);
  const invoicesRef = query(collectionGroup(db, "invoices"));

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(invoicesRef);
      setInvoices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoices();
  }, []);

  return (
    <div>
      {invoices.map((invoice) => {
        return (
          <div key={invoice.id}>
            <Link to={`/invoice/${invoice.invoiceId}`}>
              {invoice.invoiceId}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
