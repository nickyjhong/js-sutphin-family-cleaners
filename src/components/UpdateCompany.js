/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function SingleCompany() {
  let { companyId } = useParams();

  const companiesRef = query(
    collectionGroup(db, "companies"),
    where("companyId", "==", companyId)
  );

  const [companies, setCompanies] = useState([]);
  let company = companies[0] || {}

  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const updateCompany = async (id, contact, email, phone) => {
    const userDoc = doc(db, "companies", companyId);
    const newFields = { contact: newContact, email: newEmail, phone: newPhone };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCompanies();
    setNewContact(company.contact)
    setNewEmail(company.email)
    setNewPhone(company.phone)
  }, []);

  console.log('company', company)
  console.log('companyContact', company.contact)
  console.log('companyEmail', company.email)
  console.log('companyPhone', company.phone)
  console.log('contact', newContact)
  console.log('email', newEmail)
  console.log('phone', newPhone)

  return (
    <div>
      {companies.map((company) => {
        return (
          <div key={company.id}>
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
      })}
    </div>
  );
}
