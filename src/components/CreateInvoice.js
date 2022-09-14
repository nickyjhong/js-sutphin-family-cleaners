/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [price, setPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const [companies, setCompanies] = useState([]);
  const companiesRef = collection(db, "companies");
  let companyId = companyName.split(" ").join("").toLowerCase();
  let path = `companies/${companyId}/invoices`;

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCompanies();
  }, []);

  const createInvoice = async (event) => {
    event.preventDefault();
    const docRef = doc(db, path, invoiceId);
    await setDoc(docRef, {
      companyName,
      companyId,
      invoiceId,
      invoiceLink,
      price,
      pickUpDate,
      dropOffDate,
      isPaid: false,
    });
    navigate("/");
  };
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
          setInvoiceLink(event.target.value);
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
  );
}
