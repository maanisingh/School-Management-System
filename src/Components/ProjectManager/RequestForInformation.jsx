import React, { useState } from 'react';
// सुनिश्चित करें कि आपने अपने प्रोजेक्ट में Bootstrap और Bootstrap Icons को जोड़ा है।
// import 'bootstrap/dist/css/bootstrap.min.css'; 

const RequestForInformationBootstrap = () => {
    // यहाँ डेटा को एक array में रखना बेहतर है
    const dashboardData = [
        { text: "Active To-Dos", number: 23, iconClass: "bi-list-task", bgColor: "bg-primary-subtle", textColor: "text-primary" },
        { text: "Pending RFIs", number: 8, iconClass: "bi-file-earmark-text", bgColor: "bg-warning-subtle", textColor: "text-warning" },
        { text: "Today's Task", number: 12, iconClass: "bi-calendar-check", bgColor: "bg-success-subtle", textColor: "text-success" },
        { text: "Completed", number: 45, iconClass: "bi-check-circle", bgColor: "bg-info-subtle", textColor: "text-info" },
        // Custom style for purple (Milestones)
        { text: "Milestones", number: 5, iconClass: "bi-flag", bgColor: "bg-light" , iconColorStyle: { backgroundColor: '#f0e6ff', color: '#8000ff' } },
        // Custom style for light purple/teal (Team Members)
        { text: "Team Members", number: 15, iconClass: "bi-people", bgColor: "bg-light", iconColorStyle: { backgroundColor: '#fbe6ff', color: '#b347ff' } }, 
    ];

    // RFI कार्ड 1 का डेटा
    const rfiItem1 = {
        title: "Kitchen Island Electrical Requirements",
        project: "South Shore Estates - Unit 15",
        submittedBy: "Electrical Contractor",
        description: "Need clarification on electrical requirements for kitchen island outlets and lighting.",
        submittedDate: "10/01/2024",
        responses: 0,
        priority: "Medium",
        status: "Pending Response"
    };

    // RFI कार्ड 2 का डेटा
    const rfiItem2 = {
        title: "Stair Railing Height Specification",
        project: "Lakefront Custom",
        submittedBy: "Finishing Contractor",
        description: "Discrepancy between architectural drawings and building code requirements for railing height.",
        submittedDate: "08/01/2024",
        responses: 2,
        priority: "High",
        status: "In Review"
    };

    // RFI कार्ड 1 के लिए कस्टम स्टाइल
    const mediumPriorityStyle = {
        backgroundColor: '#ffc107', 
        color: '#343a40',
        fontWeight: 'bold'
    };
    const pendingResponseStyle = {
        backgroundColor: '#ffe8c2', 
        color: '#ffc107',
        border: '1px solid #ffc107',
        fontWeight: 'bold'
    };

    // RFI कार्ड 2 के लिए कस्टम स्टाइल
    const highPriorityStyle = {
        backgroundColor: '#ffc107', 
        color: '#343a40',
        fontWeight: 'bold'
    };
    const inReviewStyle = {
        backgroundColor: '#e6f7ff', 
        color: '#007bff', 
        border: '1px solid #007bff',
        fontWeight: 'bold'
    };

    // AI Insights के लिए कस्टम स्टाइल
    const qualityRiskHighBadge = {
        backgroundColor: '#f8d7da', 
        color: '#dc3545', 
        fontWeight: 'bold'
    };
    const depositsMediumBadge = {
        backgroundColor: '#d1e7dd', 
        color: '#28a745', 
        fontWeight: 'bold'
    };
    const documentsNewBadge = {
        backgroundColor: '#e0f7fa', 
        color: '#00bcd4', 
        fontWeight: 'bold'
    };

    // --- फंक्शनैलिटी (Functionality) ---

    const handleCardClick = (text, number) => {
        console.log(`डैशबोर्ड कार्ड क्लिक किया गया: ${text}, संख्या: ${number}`);
        // यहाँ आप किसी विशिष्ट डैशबोर्ड पेज पर नेविगेट करने के लिए logic जोड़ सकते हैं
    };

    const handleSubmitRFI = () => {
        // NOTE: alert() is generally avoided in production React/Canvas apps. 
        // Using console log or a custom modal is preferred.
        console.log('Submit RFI बटन क्लिक किया गया। RFI सबमिट फॉर्म खोलें।');
        // Example: showCustomModal('Submit RFI Form');
    };

    const handleRFIAction = (action, title) => {
        console.log(`RFI पर एक्शन लिया गया: ${action} for "${title}"`);
    };

    const handleInsightAction = (action, text) => {
        console.log(`AI इनसाइट्स एक्शन: ${action} for "${text}"`);
    };
    
    // एक फ़ंक्शन जो RFI कार्ड रेंडर करता है
    const renderRfiCard = (item, priorityStyle, statusStyle) => (
        <div className="card border p-4 rounded-4 mb-3" style={{ backgroundColor: '#ffffff' }}>
            
            {/* Title and Status Badges */}
            <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="fw-bold mb-0">{item.title}</h5>
                <div className="d-flex gap-2">
                    <span className="badge text-uppercase p-2 rounded-2" style={priorityStyle}>
                        {item.priority}
                    </span>
                    <span className="badge text-uppercase p-2 rounded-2" style={statusStyle}>
                        {item.status}
                    </span>
                </div>
            </div>

            {/* Details */}
            <p className="text-muted small mb-1">{item.project}</p>
            <p className="text-muted small mb-3">Submitted by: **{item.submittedBy}**</p>
            
            {/* Description */}
            <p className="fw-semibold mb-4">{item.description}</p>

            {/* Footer - Date, Responses, Actions */}
            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <span className="text-muted small">
                    Submitted: {item.submittedDate} &middot; **{item.responses} responses**
                </span>
                <div className="d-flex gap-2">
                    {/* Respond Button */}
                    <button 
                        className="btn btn-outline-dark d-flex align-items-center py-1 px-3 rounded-2"
                        onClick={() => handleRFIAction('Respond', item.title)}
                    >
                        <i className="bi bi-chat-dots me-2"></i>
                        Respond
                    </button>
                    {/* Options Button */}
                    <button 
                        className="btn btn-outline-dark py-1 px-2 rounded-2"
                        onClick={() => handleRFIAction('Options', item.title)}
                    >
                        <i className="bi bi-three-dots"></i>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid py-4">
            {/* --- 1. Header (Project Management Dropdown) --- */}
            {/* Dropdown is usually a functional element, so adding a console log for demonstration */}
            <div 
                className="d-inline-flex align-items-center p-2 mb-4 rounded cursor-pointer" 
                style={{ backgroundColor: '#fff9e6', border: '1px solid #ffe8b3', cursor: 'pointer' }}
                onClick={() => console.log('Project Management Dropdown क्लिक किया गया')}
            >
                <i className="bi bi-house-door-fill me-2"></i> 
                <span className="fw-bold me-3">Project Management</span>
                <i className="bi bi-chevron-down"></i> 
            </div>

            {/* --- 2. Dashboard Cards --- */}
            <div className="row g-3 mb-5">
                {dashboardData.map((item, index) => (
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div 
                            className="card shadow-sm border-0 p-3 h-100 d-flex flex-column align-items-center text-center hover-scale"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCardClick(item.text, item.number)}
                        >
                            {/* Card Icon (unchanged) */}
                            <div 
                                className={`p-3 mb-3 rounded-circle d-flex align-items-center justify-content-center`} 
                                style={{ 
                                    width: '55px', 
                                    height: '55px', 
                                    ...(item.iconColorStyle || {}), 
                                    backgroundColor: item.iconColorStyle ? item.iconColorStyle.backgroundColor : item.bgColor
                                }}
                            >
                                <i className={`bi fs-4 ${item.iconClass}`} 
                                   style={{ color: item.iconColorStyle ? item.iconColorStyle.color : ''}}
                                ></i>
                            </div>
                            
                            {/* Card Text */}
                            <p className="card-text text-muted mb-1 small">{item.text}</p>
                            
                            {/* Card Number */}
                            <h4 className="card-title fw-bold mb-0">{item.number}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 3. Requests for Information (RFIs) Section (Main Container) --- */}
            <div className="card shadow-lg border-0 p-4 mb-4 rounded-4">
                {/* RFI Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="card-title fw-bold mb-0">Requests for Information (RFIs)</h3>
                    {/* Submit RFI Button */}
                    <button 
                        className="btn btn-warning fw-bold d-flex align-items-center py-2 px-3" 
                        style={{backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#343a40'}}
                        onClick={handleSubmitRFI}
                    >
                        <i className="bi bi-plus fs-5 me-2"></i>
                        Submit RFI
                    </button>
                </div>

                {/* RFI Card 1 */}
                {renderRfiCard(rfiItem1, mediumPriorityStyle, pendingResponseStyle)}

                {/* RFI Card 2 */}
                {renderRfiCard(rfiItem2, highPriorityStyle, inReviewStyle)}

            </div>

            {/* --- 4. AI Insights & Recommendations Section --- */}
            <div className="mb-5"> 
                {/* Section Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold mb-0 d-flex align-items-center">
                        <i className="bi bi-lightbulb fs-4 me-2" style={{color: '#0d6efd'}}></i> 
                        AI Insights & Recommendations
                    </h3>
                    {/* View All Link */}
                    <a 
                        href="#" 
                        className="text-primary text-decoration-none fw-semibold"
                        onClick={(e) => { e.preventDefault(); handleInsightAction('View All', 'All Insights'); }}
                    >
                        View All
                    </a>
                </div>

                {/* Insights Cards */}
                <div className="row g-3">
                    {/* Quality Risk Card */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card border p-3 rounded-3 d-flex flex-row align-items-center">
                            <i className="bi bi-exclamation-triangle fs-4 me-3" style={{color: '#dc3545'}}></i> 
                            <div>
                                <span className="badge text-uppercase p-1 rounded-2 me-2" style={qualityRiskHighBadge}>
                                    Quality Risk
                                </span>
                                <span className="badge text-uppercase p-1 rounded-2" style={qualityRiskHighBadge}>
                                    High
                                </span>
                                <p className="mb-0 text-muted small mt-1">Weather conditions may impact concrete</p>
                            </div>
                            {/* View Details Link */}
                            <a 
                                href="#" 
                                className="btn btn-link text-decoration-none ms-auto text-primary fw-semibold"
                                onClick={(e) => { e.preventDefault(); handleInsightAction('View Details', 'Quality Risk'); }}
                            >
                                View Details
                            </a>
                        </div>
                    </div>

                    {/* Deposits Card */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card border p-3 rounded-3 d-flex flex-row align-items-center">
                            <i className="bi bi-currency-dollar fs-4 me-3" style={{color: '#28a745'}}></i> 
                            <div>
                                <span className="badge text-uppercase p-1 rounded-2 me-2" style={depositsMediumBadge}>
                                    Deposits
                                </span>
                                <span className="badge text-uppercase p-1 rounded-2" style={depositsMediumBadge}>
                                    Medium
                                </span>
                                <p className="mb-0 text-muted small mt-1">$2.43k in client deposits expected</p>
                            </div>
                            {/* Process Link */}
                            <a 
                                href="#" 
                                className="btn btn-link text-decoration-none ms-auto text-primary fw-semibold"
                                onClick={(e) => { e.preventDefault(); handleInsightAction('Process', 'Deposits'); }}
                            >
                                Process
                            </a>
                        </div>
                    </div>

                    {/* Documents Card */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card border p-3 rounded-3 d-flex flex-row align-items-center">
                            <i className="bi bi-file-earmark-text fs-4 me-3" style={{color: '#0d6efd'}}></i> 
                            <div>
                                <span className="badge text-uppercase p-1 rounded-2 me-2" style={documentsNewBadge}>
                                    Documents
                                </span>
                                <span className="badge text-uppercase p-1 rounded-2" style={documentsNewBadge}>
                                    New
                                </span>
                                <p className="mb-0 text-muted small mt-1">3 permit applications require</p>
                            </div>
                            {/* Review Link */}
                            <a 
                                href="#" 
                                className="btn btn-link text-decoration-none ms-auto text-primary fw-semibold"
                                onClick={(e) => { e.preventDefault(); handleInsightAction('Review', 'Documents'); }}
                            >
                                Review
                            </a>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default RequestForInformationBootstrap;