/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collectionGroup, query, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function AllCompanies() {
  const [companies, setCompanies] = useState([]);
  const companiesRef = query(collectionGroup(db, "companies"));

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(companiesRef);
      setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoices();
  }, []);

  return (
    <div className="companies-container">
      <h2 className="company-heading-center">Companies</h2>
      {companies.map((company) => {
        return (
          <div key={company.id} className="company-container">
            <div>
            <h3 className="company-name">{company.name}</h3>
            </div>
            <div className="company-btns">
              <a href={`/company/${company.companyId}`}>
                <FontAwesomeIcon icon={faEye} className="company-icon" />
              </a>
              <a href={`/company/${company.companyId}/update`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="company-icon"
                />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
