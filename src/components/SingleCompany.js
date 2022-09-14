/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";

export default function SingleCompany() {
  let { companyId } = useParams();
  const [company, setCompany] = useState({});
  const companyRef = doc(db, "companies", companyId);

  useEffect(() => {
    const getCompany = async () => {
      const docSnap = await getDoc(companyRef);
      setCompany(docSnap.data());
    };
    getCompany();
  });

  return (
    <div>
      <p>{company.name}</p>
      <p>{company.contact}</p>
      <p>{company.phone}</p>
      <p>{company.email}</p>
    </div>
  );
}
