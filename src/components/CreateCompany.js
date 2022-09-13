import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function CreateCompany() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const companiesRef = collection(db, "companies");

  const createCompany = async () => {
    await addDoc(companiesRef, {
      name,
      contact,
      email,
      phone,
    });
    navigate("/");
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
