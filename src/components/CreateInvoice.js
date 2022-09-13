import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [price, setPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  let companyId = companyName.split(' ').join('').toLowerCase()

  let path = `companies/${companyId}/invoices`

  const createInvoice = async (event) => {
    event.preventDefault()
    const docRef = doc(db, path, invoiceId)
    await setDoc(docRef, {
      companyName,
      invoiceId,
      price,
      pickUpDate,
      dropOffDate,
      isPaid: false
    })
    navigate('/')
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
