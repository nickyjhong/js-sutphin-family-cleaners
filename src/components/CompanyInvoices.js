/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs, orderBy } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

export default function CompanyInvoices() {
  let { companyId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const invoicesRef = query(
    collectionGroup(db, "invoices"),
    where("companyId", "==", companyId),
    orderBy("pickUpDate", "desc")
  );

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(invoicesRef);
      setInvoices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoices();
  }, []);

  return (
    <div>
      {invoices ? (
        invoices.map((invoice) => {
        return (
          <div
            key={invoice.id}
            className={
              invoice.isPaid
                ? "invoice-paid c-invoice-container"
                : "invoice-unpaid c-invoice-container"
            }
          >
            <div className="invoice-top-row">
              <p className="invoice-id">Invoice: {invoice.invoiceId}</p>
              <div className="invoice-btns">
                <a href={`/invoice/${invoice.invoiceLC}`}>
                  <FontAwesomeIcon icon={faEye} className="invoice-icon" />
                </a>
                <a href={invoice.link}>
                  <FontAwesomeIcon icon={faFilePdf} className="invoice-icon" />
                </a>
                <a href={`/invoice/${invoice.invoiceLC}/update`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="invoice-icon"
                  />
                </a>
              </div>
            </div>
            <div className="invoice-bottom-row">
              {invoice.isPaid ? (
                <p className="invoice-status invoice-status-paid">
                  Status: <span className="invoice-status-span">Paid</span>
                </p>
              ) : (
                <p className="invoice-status invoice-status-unpaid">
                  Status: <span className="invoice-status-span">Unpaid</span>
                </p>
              )}
              <p className="invoice-price">Price: ${invoice.price}</p>
            </div>
          </div>
        )})
      ) : (
        <div>
          No invoices
        </div>
      )}
    </div>
  );
}
