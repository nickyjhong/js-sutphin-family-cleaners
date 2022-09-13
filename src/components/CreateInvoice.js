import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { addDoc, doc, collection, collectionGroup, query, where } from "firebase/firestore";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  // const [items, setItems] = useState([]);
  const [price, setPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  // const invoicesCollectionRef = collection(db, 'companies').doc(companyName).collection('invoices').doc('invoiceId')
  const invoicesCollectionRef = query(collectionGroup(db, 'invoices'), where('companyName', '==', companyName))

  const createInvoice = async () => {
    await addDoc(invoicesCollectionRef, {
      companyName,
      invoiceId,
      // items,
      price,
      pickUpDate,
      dropOffDate,
      isPaid
    })
    navigate(`invoice/${invoiceId}`)
  }
  return (
    <div>
      <input
        placeholder="Company Name"
        onChange={(event) => {
          setCompanyName(event.target.value);
        }}
      />

      <input
        placeholder="Invoice #"
        onChange={(event) => {
          setInvoiceId(event.target.value);
        }}
      />

      {/* <input
        placeholder="Items"
        onChange={(event) => {
          setItems(event.target.value);
        }}
      /> */}

      <input
        placeholder="Price"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />

      <input
        placeholder="Pick Up Date"
        onChange={(event) => {
          setPickUpDate(event.target.value);
        }}
      />

      <input
        placeholder="Drop Off Date"
        onChange={(event) => {
          setDropOffDate(event.target.value);
        }}
      />

      <button onClick={createInvoice}>Add Invoice</button>
    </div>
  )
}
