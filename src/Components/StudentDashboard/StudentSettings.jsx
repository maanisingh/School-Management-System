import React, { useState } from "react";
import { Form, Button, Alert, Dropdown } from "react-bootstrap";

const StudentSettings = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Ayanda Khanna",
    studentId: "STU-2025-015",
    email: "ayanda@example.com",
    phone: "+91 98765 43210",
    classGrade: "Grade 10 – A",
    rollNo: "12",
    dateOfBirth: "15 May 2008",
    gender: "Female",
    address: "Bhopal, MP",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("english");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [profileImage, setProfileImage] = useState(
    "https://picsum.photos/seed/student123/150/150.jpg"
  );

  // Show alert
  const showAlertMessage = (msg, variant = "success") => {
    setAlertMessage(msg);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setTempProfileData({ ...profileData });
      setIsEditing(false);
      showAlertMessage("Changes discarded", "info");
    } else {
      setTempProfileData({ ...profileData });
      setIsEditing(true);
    }
  };

  const handleSaveChanges = () => {
    setProfileData({ ...tempProfileData });
    setIsEditing(false);
    showAlertMessage("Profile updated successfully", "success");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData({ ...tempProfileData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const randomId = Math.floor(Math.random() * 1000);
      setProfileImage(`https://picsum.photos/seed/student${randomId}/150/150.jpg`);
      showAlertMessage("Profile image updated", "success");
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Alert */}
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          {alertMessage}
        </Alert>
      )}

      <h1 className="mb-4">⚙️ Settings</h1>

      {/* Profile Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3 flex-wrap">
          <img
            src={profileImage}
            alt="Profile"
            className="me-3 mb-2"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
          {isEditing && (
            <label
              htmlFor="profileUpload"
              className="btn btn-primary mb-2"
              style={{ cursor: "pointer" }}
            >
              📷 Upload
            </label>
          )}
          <input
            type="file"
            id="profileUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={isEditing ? tempProfileData.fullName : profileData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={isEditing ? tempProfileData.email : profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={isEditing ? tempProfileData.phone : profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={isEditing ? tempProfileData.address : profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <div className="d-flex flex-wrap gap-2">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={handleEditToggle}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={handleEditToggle}>
                Edit Profile
              </Button>
            )}
          </div>
        </Form>
      </div>

      {/* Account Settings Section */}
      <div className="mb-5">
        <h4 className="mb-3">Account Settings</h4>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <Button size="sm" onClick={() => showAlertMessage("Password change form would open")}>
            Change Password
          </Button>
          <Button size="sm" onClick={() => showAlertMessage("Contact info update form would open")}>
            Update Contact
          </Button>
        </div>

        <Form.Check
          type="switch"
          label="Enable Notifications"
          checked={notificationsEnabled}
          onChange={(e) => {
            setNotificationsEnabled(e.target.checked);
            showAlertMessage(
              e.target.checked ? "🔔 Notifications enabled" : "🔕 Notifications disabled",
              "info"
            );
          }}
          className="mb-3"
        />

        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary" size="sm">
            {language === "english" ? "🇬🇧 English" : "🇮🇳 हिंदी"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setLanguage("english")}>🇬🇧 English</Dropdown.Item>
            <Dropdown.Item onClick={() => setLanguage("hindi")}>🇮🇳 हिंदी</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Logout */}
      <div>
        <Button variant="danger" onClick={() => showAlertMessage("Logging out...", "info")}>
          🚪 Logout
        </Button>
      </div>
    </div>
  );
};

export default StudentSettings;
