import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";

export default function AddCompany() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addCompany = async () => {
    let docId = name.split(" ").join("").toLowerCase();
    await setDoc(doc(db, "companies", docId), {
      name,
      companyId: docId,
      contact,
      email,
      phone,
    });
    navigate(`/company/${docId}`);
  };

  return (
    <div className="form-main">
      <div className="form-container">
        <h1>Add Company</h1>
        <div className="form-input-container">
          <label className="form-label-custom">Company name</label>
          <input
            className="form-input-custom"
            placeholder="Company Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Company name</label>
          <input
            className="form-input-custom"
            placeholder="Contact Name"
            onChange={(event) => {
              setContact(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Company name</label>
          <input
            className="form-input-custom"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Company name</label>
          <input
            className="form-input-custom"
            placeholder="Phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container form-btn-container">
          <button onClick={addCompany} className="form-add-btn">
            Add Company
          </button>
          <a href={`/`} className="form-cancel">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
