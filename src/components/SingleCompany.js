/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import CompanyInvoices from "./CompanyInvoices";

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
    <div className="s-company-container">
      <h2 className="s-company-heading">{company.name}</h2>
      <div className="s-company-columns">
        <div>
          <div className="s-company-contact-container">
            <div className="s-company-contact-heading">
              <h4 className="s-company-contact-info">Company Info:</h4>
            </div>
            <div className="s-company-contact-details">
              <p>
                <span className="s-company-span">Name: </span>
                {company.name}
              </p>
              <p>
                <span className="s-company-span">Address: </span>
                {company.address}
              </p>
              <div className="s-company-btn-container">
                <a href={`/company/${company.companyId}/update`}>
                  <button className="s-company-update-btn">
                    Update company
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="s-company-contact-container">
            <div className="s-company-contact-heading">
              <h4 className="s-company-contact-info">Contact Info:</h4>
            </div>
            <div className="s-company-contact-details">
              <p>
                <span className="s-company-span">Name: </span>
                {company.contact}
              </p>
              <p>
                <span className="s-company-span">Email: </span>
                {company.email}
              </p>
              <p>
                <span className="s-company-span">Phone: </span>
                {company.phone}
              </p>
              <div className="s-company-btn-container">
                <a href={`/company/${company.companyId}/update`}>
                  <button className="s-company-update-btn">
                    Update contact
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="s-company-invoices">
          <CompanyInvoices />
        </div>
      </div>
    </div>
  );
}
