/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function UpdateCompany() {
  let { companyId } = useParams();
  const [company, setCompany] = useState({});
  const companyRef = doc(db, "companies", companyId);

  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const updateCompany = async (id, contact, email, phone) => {
    const userDoc = doc(db, "companies", companyId);
    const newFields = { contact: newContact, email: newEmail, phone: newPhone };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getCompany = async () => {
      const docSnap = await getDoc(companyRef);
      setCompany(docSnap.data());
    };
    getCompany();
  }, []);

  useEffect(() => {
    setNewContact(company.contact)
    setNewEmail(company.email)
    setNewPhone(company.phone)
  },[company])

  return (
    <div>
      <input
        name="contact"
        defaultValue={company.contact}
        onChange={(event) => {
          event.preventDefault();
          setNewContact(event.target.value);
        }}
      />

      <input
        name="email"
        defaultValue={company.email}
        onChange={(event) => {
          event.preventDefault();
          setNewEmail(event.target.value);
        }}
      />

      <input
        name="phone"
        defaultValue={company.phone}
        onChange={(event) => {
          event.preventDefault();
          setNewPhone(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateCompany(company.id);
        }}
      >
        Update Company
      </button>
    </div>
  );
}
