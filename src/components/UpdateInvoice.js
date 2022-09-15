/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useHistory } from "react-router";
import { db } from "../firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function UpdateInvoice() {
  let { invoiceLC } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({});
  const invoiceRef = doc(db, "invoices", invoiceLC);

  const [newCompanyName, setNewCompanyName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPickUpDate, setNewPickUpDate] = useState("");
  const [newDropOffDate, setNewDropOffDate] = useState("");
  const [newIsPaid, setNewIsPaid] = useState(invoice.isPaid);
  const [paid, setPaid] = useState(newIsPaid);

  const handlePaid = async () => {
    setNewIsPaid((newIsPaid) => !newIsPaid);
    setPaid(newIsPaid);
    updatePaid(invoice.id);
  };

  const updatePaid = async (id, isPaid) => {
    const update = { isPaid: newIsPaid };
    await updateDoc(invoiceRef, update);
  };

  const updateInvoice = async (
    id,
    companyName,
    link,
    price,
    pickUpDate,
    dropOffDate,
    isPaid
  ) => {
    const newFields = {
      companyName: newCompanyName,
      link: newLink,
      price: newPrice,
      pickUpDate: newPickUpDate,
      dropOffDate: newDropOffDate,
      isPaid: newIsPaid,
    };
    await updateDoc(invoiceRef, newFields);
    navigate(`/invoice/${invoiceLC}`);
  };

  useEffect(() => {
    const getInvoice = async () => {
      const docSnap = await getDoc(invoiceRef);
      setInvoice(docSnap.data());
    };
    getInvoice();
  }, []);

  useEffect(() => {
    setNewCompanyName(invoice.companyName);
    setNewPrice(invoice.price);
    setNewPickUpDate(invoice.pickUpDate);
    setNewDropOffDate(invoice.dropOffDate);
    setNewIsPaid(invoice.isPaid);
  }, [invoice]);

  return (
    <div className="form-main">
      <div className="form-container">
      <h1>Update {invoice.invoiceId}</h1>
        {paid ? 
          <p className="form-status">Status: <span className="form-span-paid">PAID</span></p>
        : 
          <p className="form-status">Status: <span className="form-span-unpaid">UNPAID</span></p>
        }
        <div className="form-input-container">
          <label className="form-label-custom">Company name</label>
          <input
            className="form-input-custom"
            name="Company Name"
            defaultValue={invoice.companyName}
            onChange={(event) => {
              event.preventDefault();
              setNewCompanyName(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Invoice link</label>
          <input
            className="form-input-custom"
            name="link"
            defaultValue={invoice.link}
            onChange={(event) => {
              event.preventDefault();
              setNewLink(event.target.value);
            }}
          />
        </div>
        <div className="form-input-container">
          <label className="form-label-custom">Price</label>
          <input
            className="form-input-custom"
            name="price"
            defaultValue={invoice.price}
            onChange={(event) => {
              event.preventDefault();
              setNewPrice(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Pick up date</label>
          <input
            type="date"
            className="form-input-custom form-date"
            name="pickUpDate"
            defaultValue={invoice.pickUpDate}
            onChange={(event) => {
              event.preventDefault();
              setNewPickUpDate(event.target.value);
            }}
          />
        </div>
        <div className="form-input-container">
          <label className="form-label-custom">Drop off date</label>
          <input
            type="date"
            className="form-input-custom form-date"
            name="dropOffDate"
            defaultValue={invoice.dropOffDate}
            onChange={(event) => {
              event.preventDefault();
              setNewDropOffDate(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container form-btn-container">
          {paid ? (
            <button onClick={handlePaid} className="form-not-paid-btn">Not paid</button>
          ) : (
            <button onClick={handlePaid} className="form-paid-btn">Paid</button>
          )}
          <button
            onClick={() => {
              updateInvoice(invoice.id);
            }}
            className="form-save-btn"
          >
            Save Changes
          </button>
          <a href={`/invoice/${invoice.invoiceLC}`} className="form-cancel">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
