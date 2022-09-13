/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";

export default function SingleInvoice() {
  let { invoiceId } = useParams();
  const [invoice, setInvoice] = useState([]);
  const invoiceRef = query(
    collectionGroup(db, "invoices"),
    where("invoiceId", "==", invoiceId)
  );

  useEffect(() => {
    const getInvoice = async () => {
      const data = await getDocs(invoiceRef);
      setInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoice();
  }, []);

  return (
    <div>
      {invoice.map((inv) => {
        return (
          <div key={inv.id}>
            <p>{inv.invoiceId}</p>
          </div>
        );
      })}
    </div>
  );
}
