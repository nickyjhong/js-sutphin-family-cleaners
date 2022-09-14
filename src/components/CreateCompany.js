import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";

export default function CreateCompany() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const createCompany = async () => {
    let docId = name.split(' ').join('').toLowerCase()
    await setDoc(doc(db, 'companies', docId), {
      name,
      companyId: docId,
      contact,
      email,
      phone,
    });
    navigate(`/company/${docId}`);
  };

  return (
    <div>
      <input
        placeholder="Company Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <input
        placeholder="Contact Name"
        onChange={(event) => {
          setContact(event.target.value);
        }}
      />

      <input
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <input
        placeholder="Phone"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
      <button onClick={createCompany}>Add Company</button>
    </div>
  );
}
