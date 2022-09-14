/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  collectionGroup,
  query,
  where,
} from "firebase/firestore";

export default function UpdateInvoice() {
  let { invoiceId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const invoiceRef = query(
    collectionGroup(db, "invoices"),
    where("invoiceId", "==", invoiceId)
  );
  const invoice = invoices[0] || {};
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const [price, setPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [companies, setCompanies] = useState([]);
  const [isPaid, setIsPaid] = useState(false)
  const companiesRef = collection(db, "companies");

  let companyId = companyName.split(" ").join("").toLowerCase();
  let path = `companies/${companyId}/invoices`;

  const updateInvoice = async (event) => {
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
      isPaid,
    });
    navigate("/");
  };

  const handlePaid = () => {
    setIsPaid(isPaid => !isPaid)
  }

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCompanies();
  }, []);

  useEffect(() => {
    const getInvoice = async () => {
      const docSnaps = await getDocs(invoiceRef);
      setInvoices(docSnaps.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoice();
  }, []);

  useEffect(() => {
    setInvoiceLink(invoice.invoiceLink)
    setPrice(invoice.price)
    setPickUpDate(invoice.pickUpDate)
    setDropOffDate(invoice.dropOffDate)
    setIsPaid(invoice.isPaid)
  }, [invoice])

  console.log('paid', isPaid)
  return (
    <div>
      <p>Invoice Id: {invoice.invoiceId}</p>
      <p>Company Name: {invoice.companyName}</p>

      <p>Confirm company name:</p>
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
        defaultValue={invoice.invoiceLink}
        placeholder="Invoice Link"
        onChange={(event) => {
          setInvoiceLink(event.target.value);
        }}
      />

      <input
        defaultValue={invoice.price}
        placeholder="Price"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />

      <input
        defaultValue={invoice.pickUpDate}
        placeholder="Pick Up Date"
        onChange={(event) => {
          setPickUpDate(event.target.value);
        }}
      />

      <input
        defaultValue={invoice.dropOffDate}
        placeholder="Drop Off Date"
        onChange={(event) => {
          setDropOffDate(event.target.value);
        }}
      />

      <button onClick={handlePaid}>Paid</button>

      <button onClick={updateInvoice}>Update Invoice</button>
    </div>
  );
}
