import React, { useState } from 'react'
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function CreateCompany() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const companiesCollectionRef = collection(db, "companies");

  const createCompany = async () => {
    await addDoc(companiesCollectionRef, {name: newName, email: newEmail, phone: newPhone})
  };

  return (
    <div>
      <input
        placeholder="Name"
        onChange={(event) => {
          setNewName(event.target.value);
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
  )
}
