import React from "react";
import {
  Card,
  Button,
  Table,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaEye, FaPaperPlane } from "react-icons/fa";

const Invoice = () => {
  const stats = [
    { title: "Outstanding AR", value: "$72,250", icon: "💵" },
    { title: "Overdue Bills", value: "8", icon: "⚠" },
    { title: "Pending Bills", value: "15", icon: "🧾" },
    { title: "Cash on Hand", value: "$158,750", icon: "💰" },
    { title: "Monthly Revenue", value: "$420,000", icon: "📈" },
    { title: "Monthly Expenses", value: "$185,000", icon: "📉" },
  ];

  const invoices = [
    {
      vendor: "Johnson Supplies",
      bill: "Building Materials",
      project: "PROJ-2024-089",
      amount: "$25,000",
      dueDate: "01/02/2024",
      status: "Pending Approval",
      statusType: "warning",
    },
    {
      vendor: "Smith Traders",
      bill: "Wood Panels",
      project: "PROJ-2024-090",
      amount: "$18,500",
      dueDate: "05/02/2024",
      status: "Due Soon",
      statusType: "danger",
    },
    {
      vendor: "Williams Hardware",
      bill: "Plumbing Fixtures",
      project: "PROJ-2024-091",
      amount: "$25,000",
      dueDate: "10/02/2024",
      status: "Approval",
      statusType: "success",
    },
    {
      vendor: "Davis Electricals",
      bill: "Wiring & Lights",
      project: "PROJ-2024-092",
      amount: "$22,750",
      dueDate: "15/02/2024",
      status: "overDue",
      statusType: "danger",
    },
  ];

  return (
    <div
      className="container-fluid py-4 px-3"
      style={{ backgroundColor: "#f7f8fc", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <div
          className="px-3 py-2 rounded"
          style={{ backgroundColor: "#ffeec1", color: "#a66a00" }}
        >
          <strong>🔒 Vendor Billing Dashboard</strong>
        </div>
      </div>

      {/* Top Stats */}
      <div className="row g-3 mb-4">
        {stats.map((item, i) => (
          <div className="col-6 col-md-4 col-lg-2" key={i}>
            <Card className="shadow-sm border-0 text-center h-100">
              <Card.Body>
                <div style={{ fontSize: "1.8rem" }}>{item.icon}</div>
                <div className="fw-semibold mt-2">{item.title}</div>
                <div className="fw-bold fs-5 mt-1">{item.value}</div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Accounts Payable Management */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <div
            className="d-flex justify-content-end align-items-center"
            style={{ gap: "10px", flexWrap: "nowrap" }}
          >
            <InputGroup style={{ width: "250px" }}>
              <FormControl
                placeholder="Search Bills..."
                aria-label="Search Bills"
              />
              <Button variant="outline-secondary" id="button-search">
                <FaSearch />
              </Button>
            </InputGroup>

            <Button
              variant="warning"
              className="fw-semibold text-dark d-flex align-items-center"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => alert("Create Bill Clicked!")}
            >
              <FaPlus className="me-2" /> Create Bill
            </Button>
          </div>

          <div className="table-responsive mt-3">
            <Table hover>
              <thead className="table-light">
                <tr>
                  <th>Vendor</th>
                  <th>Bill</th>
                  <th>Project</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{inv.vendor}</td>
                    <td>{inv.bill}</td>
                    <td>{inv.project}</td>
                    <td>{inv.amount}</td>
                    <td>{inv.dueDate}</td>
                    <td>
                      <Badge bg={inv.statusType}>{inv.status}</Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                      >
                        <FaEye />
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <FaPaperPlane />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Default Bill Section */}
     
      {/* AI Insights */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3">AI Insights & Recommendations</h6>

          <div className="d-flex flex-wrap gap-3">
            {/* CARD 1 */}
            <Card
              className="border-danger flex-fill d-flex align-items-center justify-content-between px-3"
              style={{
                minWidth: "250px",
                height: "50px",
                backgroundColor: "#fff5f5",
              }}
            >
              <div className="d-flex align-items-center gap-2 h-100">
                <Badge bg="danger" className="d-flex align-items-center">
                  HIGH
                </Badge>
                <span className="fw-bold text-danger d-flex align-items-center">
                  Quality Risk
                </span>
              </div>
            </Card>

            {/* CARD 2 */}
            <Card
              className="border-success flex-fill d-flex align-items-center justify-content-between px-3"
              style={{
                minWidth: "250px",
                height: "50px",
                backgroundColor: "#f2fff2",
              }}
            >
              <div className="d-flex align-items-center gap-2 h-100">
                <Badge bg="success" className="d-flex align-items-center">
                  MEDIUM
                </Badge>
                <span className="fw-bold text-success d-flex align-items-center">
                  Deposits
                </span>
              </div>
            </Card>

            {/* CARD 3 */}
            <Card
              className="border-primary flex-fill d-flex align-items-center justify-content-between px-3"
              style={{
                minWidth: "250px",
                height: "50px",
                backgroundColor: "#f0f7ff",
              }}
            >
              <div className="d-flex align-items-center gap-2 h-100">
                <Badge bg="primary" className="d-flex align-items-center">
                  NEW
                </Badge>
                <span className="fw-bold text-primary d-flex align-items-center">
                  Documents
                </span>
              </div>
            </Card>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Invoice;