/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";

export default function SingleCompany() {
  let { companyName } = useParams();
  const [companies, setCompanies] = useState([]);
  const companiesRef = query(
    collectionGroup(db, "companies"),
    where("companyId", "==", companyName)
  );

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
            <p>{company.name}</p>
          </div>
        );
      })}
    </div>
  );
}
