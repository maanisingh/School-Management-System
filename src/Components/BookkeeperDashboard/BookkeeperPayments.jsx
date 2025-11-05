import React from "react";
import { FiDownload, FiPlus, FiEye, FiFileText, FiMoreHorizontal } from "react-icons/fi";

const payments = [
  {
    type: "Invoice Payment",
    client: "Johnson Family",
    date: "30/01/2024",
    amount: "$15,000",
    method: "Bank Transfer",
    ref: "TXN-789654",
  },
  {
    type: "BILL Payment",
    client: "Elite Cabinetry",
    date: "29/01/2024",
    amount: "$28,500",
    method: "ACH",
    ref: "ACH-455789",
  },
  {
    type: "Invoice Payment",
    client: "Brown Estate",
    date: "28/01/2024",
    amount: "$8,500",
    method: "Check",
    ref: "CHK-1234",
  },
];

export default function Payments() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerBadge}>Bookkeeper Dashboard</span>
      </div>

      {/* Summary Cards */}
      <div style={styles.cardsContainer}>
        <SummaryCard title="Outstanding AR" value="$72,250" icon="💲" />
        <SummaryCard title="Overdue Invoices" value="8" icon="⚠" />
        <SummaryCard title="Pending Bills" value="15" icon="📄" />
        <SummaryCard title="Cash on Hand" value="$158,750" icon="💰" />
        <SummaryCard title="Monthly Revenue" value="$420,000" icon="📈" trend="up" />
        <SummaryCard title="Monthly Expenses" value="$185,000" icon="📉" trend="down" />
      </div>

      {/* Payment Tracking */}
      <div style={styles.paymentTracking}>
        <div style={styles.paymentHeader}>
          <h2 style={{ margin: 0 }}>Payment Tracking</h2>
          <div>
            <button style={styles.exportButton} onClick={() => alert("Export clicked")}>
              <FiDownload style={{ marginRight: 6 }} />
              Export
            </button>
            <button style={styles.createButton} onClick={() => alert("Create Invoice clicked")}>
              <FiPlus style={{ marginRight: 6 }} />
              Create Invoice
            </button>
          </div>
        </div>

        {payments.map((p, i) => (
          <div key={i} style={styles.paymentCard}>
            <div style={styles.paymentInfo}>
              <p style={styles.paymentType}>{p.type}</p>
              <p style={styles.paymentClient}>{p.client}</p>
              <p style={styles.paymentDate}>{p.date}</p>
              <p style={styles.paymentRef}>Ref: {p.ref}</p>
            </div>
            <div style={styles.paymentAmountSection}>
              <p style={styles.paymentAmount}>{p.amount}</p>
              <p style={styles.paymentMethod}>{p.method}</p>
              <div style={styles.icons}>
                <FiEye title="View" style={styles.icon} />
                <FiFileText title="Details" style={styles.icon} />
                <FiMoreHorizontal title="More" style={styles.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights & Recommendations */}
      <div style={styles.insightsContainer}>
        <h3 style={{ marginBottom: 16 }}>AI Insights & Recommendations</h3>
        <div style={styles.insightsGrid}>
          <InsightCard
            type="high"
            title="Quality Risk"
            detail="Weather conditions may impact concrete"
            action="View Details"
          />
          <InsightCard
            type="medium"
            title="Deposits"
            detail="$245k in client deposits expected"
            action="Process"
          />
          <InsightCard
            type="new"
            title="Documents"
            detail="3 permit applications require review"
            action="Review"
          />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, trend }) {
  const trendSymbol = trend === "up" ? "↑" : trend === "down" ? "↓" : "";
  const trendColor = trend === "up" ? "#16a34a" : trend === "down" ? "#dc2626" : "transparent";

  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryIcon}>{icon}</div>
      <p style={styles.summaryTitle}>{title}</p>
      <p style={styles.summaryValue}>
        {value} {trend && <span style={{ color: trendColor, fontWeight: "bold" }}>{trendSymbol}</span>}
      </p>
    </div>
  );
}

function InsightCard({ type, title, detail, action }) {
  const borderColors = {
    high: "#dc2626",
    medium: "#16a34a",
    new: "#2563eb",
  };
  const textColors = {
    high: "#b91c1c",
    medium: "#15803d",
    new: "#1d4ed8",
  };

  return (
    <div style={{ ...styles.insightCard, borderColor: borderColors[type], color: textColors[type] }}>
      <p style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</p>
      <p style={{ marginBottom: 12 }}>{detail}</p>
      <button style={{ ...styles.insightButton, color: textColors[type] }}>{action}</button>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    padding: 20,
  },
  header: {
    backgroundColor: "#fff7ed",
    padding: 10,
    borderRadius: 8,
    marginBottom: 24,
    display: "inline-block",
  },
  headerBadge: {
    backgroundColor: "#f97316",
    color: "white",
    fontWeight: "600",
    padding: "6px 12px",
    borderRadius: 6,
    fontSize: 14,
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 32,
  },
  summaryCard: {
    flex: "1 1 calc(16% - 16px)",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 1px 4px rgb(0 0 0 / 0.1)",
    minWidth: 140,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  summaryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "600",
  },
  paymentTracking: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: 32,
  },
  paymentHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
    alignItems: "center",
  },
  exportButton: {
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    color: "#374151",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    marginRight: 10,
  },
  createButton: {
    backgroundColor: "#fbbf24",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    color: "white",
  },
  paymentCard: {
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0",
    flexWrap: "wrap",
  },
  paymentInfo: {
    flex: "1 1 60%",
  },
  paymentType: {
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  paymentClient: {
    margin: "0 0 4px 0",
  },
  paymentDate: {
    margin: "0 0 4px 0",
    color: "#6b7280",
    fontSize: 12,
  },
  paymentRef: {
    margin: 0,
    fontStyle: "italic",
    color: "#9ca3af",
    fontSize: 12,
  },
  paymentAmountSection: {
    flex: "1 1 30%",
    textAlign: "right",
  },
  paymentAmount: {
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  paymentMethod: {
    margin: "0 0 8px 0",
    color: "#6b7280",
    fontSize: 12,
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    color: "#6b7280",
  },
  icon: {
    cursor: "pointer",
    fontSize: 18,
  },
  insightsContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  insightsGrid: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  insightCard: {
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 12,
    padding: 16,
    flex: "1 1 30%",
    minWidth: 240,
  },
  insightButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
    padding: 0,
  },
};