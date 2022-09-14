/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collectionGroup, query, getDocs } from "firebase/firestore";  

export default function AllCompanies() {
  const [companies, setCompanies] = useState([]);
  const companiesRef = query(collectionGroup(db, 'companies'))

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getInvoices();
  }, [])

  return (
    <div>
      {companies.map((company => {
        return (
          <div key={company.id}>
            <p>{company.name}</p>
          </div>
        )
      }))}
    </div>
  )
}
