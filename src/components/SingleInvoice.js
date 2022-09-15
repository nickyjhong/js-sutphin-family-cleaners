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
      const docSnap = await getDoc(invoiceRef);
      setInvoice(docSnap.data());
    };
    getInvoice();
  }, []);

  return (
    <div className="s-invoice-container">
      <h2 className="s-invoice-heading">Invoice # {invoice.invoiceId}</h2>

      {invoice.isPaid ? (
        <p className="form-status s-invoice-status">
          Status: <span className="form-span-paid">PAID</span>
        </p>
      ) : (
        <p className="form-status s-invoice-status">
          Status: <span className="form-span-unpaid">UNPAID</span>
        </p>
      )}

      <div className="s-invoice-row">
        <div className="s-invoice-price">
          <p>
            <span className="s-invoice-span">Price:</span> ${invoice.price}
          </p>
          <a href={`/invoice/${invoice.invoiceLC}/update`}>
            <button className="s-invoice-update-btn">Update invoice</button>
          </a>
        </div>

        <div className="s-invoice-dates">
          <p>
            <span className="s-invoice-span">Pick up date: </span>
            {invoice.pickUpDate}
          </p>
          <p>
            <span className="s-invoice-span">Drop off date: </span>
            {invoice.dropOffDate}
          </p>
        </div>
      </div>
      <div className="s-invoice-pdf">
        <iframe src={invoice.pdf} title={invoice.invoiceId} width="700" height="900" allow="autoplay"></iframe>
      </div>
    </div>
  );
}
