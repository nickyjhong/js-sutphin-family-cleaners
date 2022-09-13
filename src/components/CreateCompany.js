import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function CreateCompany() {
  const navigate = useNavigate();
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const companiesRef = collection(db, "companies");

  const createCompany = async () => {
    await addDoc(companiesRef, {
      name: newCompanyName,
      contact: newContact,
      email: newEmail,
      phone: newPhone,
    });
    navigate("/");
  };

  return (
    <div>
      <input
        placeholder="Company Name"
        onChange={(event) => {
          setNewCompanyName(event.target.value);
        }}
      />

      <input
        placeholder="Contact Name"
        onChange={(event) => {
          setNewContact(event.target.value);
        }}
      />

      <input
        placeholder="Email"
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
      />

      <input
        placeholder="Phone"
        onChange={(event) => {
          setNewPhone(event.target.value);
        }}
      />
      <button onClick={createCompany}>Add Company</button>
    </div>
  );
}
