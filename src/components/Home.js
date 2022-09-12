import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [companies, setCompanies] = useState([]);
  const companiesCollectionRef = collection(db, "companies");

  const createCompany = async () => {
    await addDoc(companiesCollectionRef, {name: newName, email: newEmail, phone: newPhone})
  };

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesCollectionRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCompanies();
  }, []);

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
      {companies.map((company) => {
        return (
          <div key={company.id}>
            <h1>{company.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

// {process.env.REACT_APP_FIREBASE_API_KEY}
