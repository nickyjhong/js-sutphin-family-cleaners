/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [isPaid, setIsPaid] = useState(false)
  const [companies, setCompanies] = useState([]);
  const companiesRef = collection(db, "companies");

  const createInvoice = async () => {
    let docId = invoiceId.toLowerCase()
    await setDoc(doc(db, 'invoices', docId), {
      companyName,
      companyId: companyName.split(' ').join('').toLowerCase(),
      invoiceId,
      link,
      invoiceLC: invoiceId.toLowerCase(),
      price: Number(price),
      pickUpDate,
      dropOffDate,
      isPaid
    });
    navigate("/");
  };

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCompanies();
  }, []);


  return (
    <div>
      <select
        name="company"
        onChange={(event) => {
          setCompanyName(event.target.value);
        }}
      >
        <option value="Companies" />
        {companies.map((company) => {
          return (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          );
        })}
      </select>
      
      <input
        placeholder="Invoice #"
        onChange={(event) => {
          setInvoiceId(event.target.value);
        }}
      />

      <input
        placeholder="Invoice Link"
        onChange={(event) => {
          setLink(event.target.value);
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
      <button onClick={createInvoice}>Create Invoice</button>
    </div>
  );
}
