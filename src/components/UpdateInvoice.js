/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
    <div>
      {paid ? <p>Status: PAID</p> : <p>Status: UNPAID</p>}

      <input
        name="Company Name"
        defaultValue={invoice.companyName}
        onChange={(event) => {
          event.preventDefault();
          setNewCompanyName(event.target.value);
        }}
      />

      <input
        name="link"
        defaultValue={invoice.link}
        onChange={(event) => {
          event.preventDefault();
          setNewLink(event.target.value);
        }}
      />

      <input
        name="price"
        defaultValue={invoice.price}
        onChange={(event) => {
          event.preventDefault();
          setNewPrice(event.target.value);
        }}
      />

      <input
        name="pickUpDate"
        defaultValue={invoice.pickUpDate}
        onChange={(event) => {
          event.preventDefault();
          setNewPickUpDate(event.target.value);
        }}
      />

      <input
        name="dropOffDate"
        defaultValue={invoice.dropOffDate}
        onChange={(event) => {
          event.preventDefault();
          setNewDropOffDate(event.target.value);
        }}
      />

      {paid ? (
        <button onClick={handlePaid}>Already paid!</button>
      ) : (
        <button onClick={handlePaid}>Pay</button>
      )}

      <button
        onClick={() => {
          updateInvoice(invoice.id);
        }}
      >
        Save Changes
      </button>
    </div>
  );
}
