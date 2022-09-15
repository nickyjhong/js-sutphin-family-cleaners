import React from "react";
import AllCompanies from "./AllCompanies";
import AllInvoices from "./AllInvoices";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-company">
        <AllCompanies />
      </div>
      <div className="home-invoice">
        <AllInvoices />
      </div>
    </div>
  );
}
