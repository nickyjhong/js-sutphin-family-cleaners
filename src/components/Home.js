/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const companiesRef = collection(db, "companies");

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCompanies();
  }, []);

  return (
    <div>
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

