// src/Components/Dashboard/SingleTaskInformalAnalysisPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaDownload,
  FaChartBar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SingleTaskInformalAnalysisPage = () => {
  const { classId, subjectId, task } = useParams();
  const navigate = useNavigate();

  const storageKey = `fundisa_class_${classId}`;
  const [store, setStore] = useState({
    grade: "",
    section: "",
    learners: [],
  });

  const taskName = decodeURIComponent(task);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved) setStore(saved);
    } catch {}
  }, []);

  // -----------------------------------------------------------------------------------
  // LOAD INFORMAL MARK ENTRIES
  // -----------------------------------------------------------------------------------

  const informalMarksKey = `fundisa_informal_marks_${classId}_${subjectId}_${taskName}`;
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(informalMarksKey));
      if (saved) setMarks(saved);
    } catch {}
  }, []);

  // -----------------------------------------------------------------------------------
  // ANALYSIS
  // -----------------------------------------------------------------------------------

  const totalLearners = store.learners.length;

  const avgMark =
    marks.length > 0
      ? (marks.reduce((a, b) => a + b.mark, 0) / marks.length).toFixed(1)
      : 0;

  const passCount = marks.filter((m) => m.mark >= 50).length;
  const failCount = marks.filter((m) => m.mark < 50).length;

  const levelCounts = {
    Outstanding: marks.filter((m) => m.mark >= 80).length,
    Achieved: marks.filter((m) => m.mark >= 60 && m.mark < 80).length,
    Partial: marks.filter((m) => m.mark >= 40 && m.mark < 60).length,
    NotAchieved: marks.filter((m) => m.mark < 40).length,
  };

  const levelChartData = [
    { name: "Outstanding", value: levelCounts.Outstanding },
    { name: "Achieved", value: levelCounts.Achieved },
    { name: "Partial", value: levelCounts.Partial },
    { name: "Not Achieved", value: levelCounts.NotAchieved },
  ];

  const markRangeData = [
    {
      range: "0-39",
      count: marks.filter((m) => m.mark < 40).length,
    },
    {
      range: "40-59",
      count: marks.filter((m) => m.mark >= 40 && m.mark < 60).length,
    },
    {
      range: "60-79",
      count: marks.filter((m) => m.mark >= 60 && m.mark < 80).length,
    },
    {
      range: "80-100",
      count: marks.filter((m) => m.mark >= 80).length,
    },
  ];

  // -----------------------------------------------------------------------------------
  // EXPORT CSV
  // -----------------------------------------------------------------------------------

  const handleCSVExport = () => {
    let csv =
      "Learner,Mark\n" +
      marks.map((m) => `${m.name},${m.mark}`).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${taskName}_informal_analysis.csv`;
    a.click();
  };

  return (
    <Container
      fluid
      style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#edf2f7" }}
    >
      {/* ---------------------- HEADER -------------------------- */}
      <Row className="mb-3">
        <Col>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="p-0 me-3"
          >
            <FaArrowLeft /> Back
          </Button>

          <h2 style={{ color: "#1e2a38" }}>
            Informal Task Analysis · {taskName}
          </h2>
          <p style={{ color: "#64748b" }}>
            Grade {store.grade}
            {store.section}
          </p>
        </Col>

        <Col xs="auto">
          <Button
            style={{ backgroundColor: "#7e3af2", border: "none" }}
            onClick={handleCSVExport}
          >
            <FaDownload className="me-2" />
            Export CSV
          </Button>
        </Col>
      </Row>

      {/* --------------------- STATS CARDS ----------------------- */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="p-3 text-center">
            <h6>Total Learners</h6>
            <h3>{totalLearners}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="p-3 text-center">
            <h6>Avg Mark</h6>
            <h3>{avgMark}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="p-3 text-center">
            <h6>Pass</h6>
            <h3 style={{ color: "green" }}>{passCount}</h3>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="p-3 text-center">
            <h6>Fail</h6>
            <h3 style={{ color: "red" }}>{failCount}</h3>
          </Card>
        </Col>
      </Row>

      {/* --------------------- LEVELS CHART ----------------------- */}
      <Card className="p-3 mb-4">
        <h5>Performance Levels</h5>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={levelChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#7e3af2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* --------------------- MARK RANGE CHART ------------------- */}
      <Card className="p-3 mb-4">
        <h5>Mark Range Distribution</h5>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={markRangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* --------------------- DETAILED TABLE --------------------- */}
      <Card className="p-3 mb-4">
        <h5>Learner Breakdown</h5>
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Learner</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>{m.mark}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default SingleTaskInformalAnalysisPage;
