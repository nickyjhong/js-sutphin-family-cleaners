/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

export default function AddInvoice() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [companies, setCompanies] = useState([]);
  const companiesRef = collection(db, "companies");

  const addInvoice = async () => {
    let docId = invoiceId.toLowerCase();
    await setDoc(doc(db, "invoices", docId), {
      companyName,
      companyId: companyName.split(" ").join("").toLowerCase(),
      invoiceId,
      link,
      pdf: `${link}/preview`,
      invoiceLC: invoiceId.toLowerCase(),
      price: Number(price),
      pickUpDate,
      dropOffDate,
      isPaid: false,
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
    <div className="form-main">
      <div className="form-container">
        <h1>Add Invoice</h1>
          <form>
        <div className="form-input-container">

          <label className="form-label-custom">Company name</label>
          <select
            className="form-input-custom"
            name="company"
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
          >
            <option value="Companies" />
            {companies.map((company) => {
              return (
                <option
                  key={company.id}
                  value={company.name}
                  className="form-select"
                >
                  {company.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Invoice number</label>
          <input
            required
            className="form-input-custom"
            placeholder="Invoice #"
            onChange={(event) => {
              setInvoiceId(event.target.value);
            }}
          />
        </div>
        <div className="form-input-container">
          <label className="form-label-custom">Invoice link</label>
          <input
            required
            className="form-input-custom"
            placeholder="Invoice Link"
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Price</label>
          <input
            required
            type="number"
            className="form-input-custom"
            placeholder="Price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div className="form-input-container">
          <label className="form-label-custom">Pick up date</label>
          <input
            required
            type="date"
            className="form-input-custom form-date"
            placeholder="Pick Up Date"
            onChange={(event) => {
              setPickUpDate(event.target.value);
            }}
          />
        </div>
        <div className="form-input-container">
          <label className="form-label-custom">Drop off date</label>
          <input
            required
            type="date"
            className="form-input-custom form-date"
            placeholder="Drop Off Date"
            onChange={(event) => {
              setDropOffDate(event.target.value);
            }}
          />
        </div>
        <div className="form-input-container form-btn-container">
          <button onClick={addInvoice} className="form-add-btn">
            Add Invoice
          </button>
          <a href={`/`} className="form-cancel">
            Cancel
          </a>
        </div>
          </form>
      </div>
    </div>
  );
}
