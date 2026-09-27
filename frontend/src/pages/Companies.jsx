import Navbar from "../components/Navbar";
import { useState } from "react";

function Companies() {

    const companies = [
        {
            name: "TCS",
            logo: "T",
            category: "IT Services",
            description: "Prepare for TCS placement opportunities and recruitment rounds.",
            colorClass: "company-tcs"
        },
        {
            name: "Infosys",
            logo: "I",
            category: "IT Services",
            description: "Explore Infosys eligibility, preparation and interview topics.",
            colorClass: "company-infosys"
        },
        {
            name: "Accenture",
            logo: "A",
            category: "Technology & Consulting",
            description: "Prepare for Accenture aptitude, technical and coding rounds.",
            colorClass: "company-accenture"
        },
        {
            name: "Cognizant",
            logo: "C",
            category: "IT Services",
            description: "Build your preparation roadmap for Cognizant recruitment.",
            colorClass: "company-cognizant"
        },
        {
            name: "Wipro",
            logo: "W",
            category: "IT Services",
            description: "Get ready for Wipro aptitude, technical and interview rounds.",
            colorClass: "company-wipro"
        },
        {
            name: "Deloitte",
            logo: "D",
            category: "Consulting & Technology",
            description: "Prepare for Deloitte placement and technical opportunities.",
            colorClass: "company-deloitte"
        }
    ];

    const [search, setSearch] = useState("");

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="companies-page">

                {/* Header */}

                <div className="companies-header">

                    <div>
                        <span className="companies-badge">
                            CAREER EXPLORATION
                        </span>

                        <h1>Target Companies</h1>

                        <p>
                            Explore companies and build your preparation
                            roadmap for placement season.
                        </p>
                    </div>

                    <div className="company-count">
                        <strong>{companies.length}</strong>
                        <span>Companies</span>
                    </div>

                </div>

                {/* Search */}

                <div className="company-search-section">

                    <div className="company-search">

                        <span>🔎</span>

                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                    </div>

                </div>

                {/* Company Grid */}

                {filteredCompanies.length > 0 ? (

                    <div className="companies-grid">

                        {filteredCompanies.map((company) => (

                            <div
                                key={company.name}
                                className="modern-company-card"
                            >

                                <div className="company-card-top">

                                    <div
                                        className={`company-logo ${company.colorClass}`}
                                    >
                                        {company.logo}
                                    </div>

                                    <span className="company-category">
                                        {company.category}
                                    </span>

                                </div>

                                <h2>{company.name}</h2>

                                <p>
                                    {company.description}
                                </p>

                                <div className="company-card-bottom">

                                    <span>
                                        🎯 Placement Preparation
                                    </span>

                                    <button
                                        onClick={() =>
                                            window.location.href =
                                            `/company-preparation?company=${encodeURIComponent(
                                                company.name
                                            )}`
                                        }
                                    >
                                        Explore →
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="no-companies">

                        <div>🔍</div>

                        <h2>No company found</h2>

                        <p>
                            Try searching with a different company name.
                        </p>

                    </div>

                )}

            </div>
        </>
    );
}

export default Companies;