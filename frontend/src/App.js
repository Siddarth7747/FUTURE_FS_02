
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [page, setPage] = useState("dashboard");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  useEffect(() => {
    fetchLeads();
  }, []);

  // FETCH LEADS
  const fetchLeads = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch("http://localhost:5000/leads");

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();

      setLeads(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  // ADD LEAD
  const addLead = async (leadData) => {

    try {

      const response = await fetch(
        "http://localhost:5000/addLead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leadData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add lead");
      }

fetchLeads();

setSuccess("Lead added successfully!");

setTimeout(() => {
  setSuccess("");
}, 3000);

setPage("dashboard");


    } catch (err) {

      setError(err.message);

    }

  };

  // DELETE LEAD
  const deleteLead = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `http://localhost:5000/deleteLead/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      fetchLeads();

    } catch (err) {

      setError(err.message);

    }

  };

  // STATS
  const totalLeads = leads.length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  return (

    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div>

          <h1>Mini CRM</h1>

          <p className="sidebar-text">
            Smart Client Lead Management System
          </p>

        </div>

        <div className="sidebar-buttons">

          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={page === "add" ? "active" : ""}
            onClick={() => setPage("add")}
          >
            Add Lead
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* HERO HEADER */}
        <div className="hero-section">

          <div>

            <h1 className="main-heading">
              Client Lead Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Track, manage and convert business leads professionally
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={fetchLeads}
          >
            Refresh
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}

{success && (
  <div className="success-message">
    {success}
  </div>
)}

        {/* DASHBOARD */}
        {page === "dashboard" && (

          <>

            {/* STATS CARDS */}
            <div className="top-cards">

              <div className="card">

                <h2>{totalLeads}</h2>

                <p>Total Leads</p>

              </div>

              <div className="card">

                <h2>{contactedLeads}</h2>

                <p>Contacted</p>

              </div>

              <div className="card">

                <h2>{convertedLeads}</h2>

                <p>Converted</p>

              </div>

            </div>

            {/* LOADING */}
            {loading ? (

              <div className="loader-box">
                Loading leads...
              </div>

            ) : leads.length === 0 ? (

              <div className="empty-box">
                No leads found.
              </div>

            ) : (

              <div className="lead-grid">

                {leads.map((lead) => (

                  <div className="lead-card" key={lead.id}>

                    {/* TOP */}
                    <div className="lead-header">

                      <h3>{lead.name}</h3>

                      <span
                        className={`status-badge ${lead.status}`}
                      >
                        {lead.status}
                      </span>

                    </div>

                    {/* DETAILS */}
                    <div className="lead-details">

                      <div className="detail-box">

                        <h4>Email</h4>

                        <p>{lead.email}</p>

                      </div>

                      <div className="detail-box">

                        <h4>Lead Source</h4>

                        <p>{lead.source}</p>

                      </div>

                      <div className="detail-box">

                        <h4>Follow-up Notes</h4>

                        <p>{lead.notes}</p>

                      </div>

                    </div>

                    {/* DELETE BUTTON */}
                    <button
                      className="delete-btn"
                      onClick={() => deleteLead(lead.id)}
                    >
                      Delete Lead
                    </button>

                  </div>

                ))}

              </div>

            )}

          </>

        )}

        {/* ADD LEAD PAGE */}
        {page === "add" && (
          <AddLeadForm addLead={addLead} />
        )}

      </div>

    </div>

  );

}

// ADD LEAD FORM
function AddLeadForm({ addLead }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    status: "New",
    notes: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    addLead(formData);

    setFormData({
      name: "",
      email: "",
      source: "",
      status: "New",
      notes: "",
    });

  };

  return (

    <div className="premium-form-wrapper">

      <div className="premium-form-card">

        <div className="form-top">

          <h2>Add New Lead</h2>

          <p>
            Manage your clients professionally with premium CRM experience
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="premium-form"
        >

          <div className="input-group">

            <label>Client Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter client name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Lead Source</label>

            <input
              type="text"
              name="source"
              placeholder="Instagram / Website / Referral"
              value={formData.source}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Lead Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>

          </div>

          <div className="input-group">

            <label>Follow-up Notes</label>

            <textarea
              name="notes"
              placeholder="Write notes about this lead..."
              value={formData.notes}
              onChange={handleChange}
              rows="5"
            ></textarea>

          </div>

          <button
            type="submit"
            className="premium-btn"
          >
            Save Lead
          </button>

        </form>

      </div>

    </div>

  );

}

export default App;

