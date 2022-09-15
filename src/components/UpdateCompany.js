/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function UpdateCompany() {
  let { companyId } = useParams();
  const navigate = useNavigate()
  const [company, setCompany] = useState({});
  const companyRef = doc(db, "companies", companyId);

  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const updateCompany = async (id, contact, email, phone) => {
    const newFields = { contact: newContact, email: newEmail, phone: newPhone };
    await updateDoc(companyRef, newFields);
    navigate(`/company/${companyId}`)
  };

  useEffect(() => {
    const getCompany = async () => {
      const docSnap = await getDoc(companyRef);
      setCompany(docSnap.data());
    };
    getCompany();
  }, []);

  useEffect(() => {
    setNewContact(company.contact);
    setNewEmail(company.email);
    setNewPhone(company.phone);
  }, [company]);

  return (
    <div className="form-main">
      <div className="form-container">
        <h1>Update {company.name}</h1>
        <div className="form-input-container">
          <label className="form-label-custom">Contact</label>
          <input
            className="form-input-custom"
            name="contact"
            defaultValue={company.contact}
            onChange={(event) => {
              event.preventDefault();
              setNewContact(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Email</label>
          <input
            className="form-input-custom"
            name="email"
            defaultValue={company.email}
            onChange={(event) => {
              event.preventDefault();
              setNewEmail(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container">
          <label className="form-label-custom">Phone number</label>
          <input
            className="form-input-custom"
            name="phone"
            defaultValue={company.phone}
            onChange={(event) => {
              event.preventDefault();
              setNewPhone(event.target.value);
            }}
          />
        </div>

        <div className="form-input-container form-btn-container">
          <button
            onClick={() => {
              updateCompany(company.id);
            }}
            className="form-save-btn"
          >
            Save Changes
          </button>
          <a href={`/company/${company.companyId}`} className="form-cancel">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
