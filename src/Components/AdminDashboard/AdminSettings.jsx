import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminSettings = () => {
    // --- State for Navigation ---
    const [activeTab, setActiveTab] = useState('school-info');

    // --- State for All Sections ---
    const [schoolInfo, setSchoolInfo] = useState({
        schoolName: 'Springfield Elementary', schoolEmail: 'info@springfield.edu', address: '123 Main St, Springfield',
        contactNumber: '1234567890', principalName: 'Seymour Skinner', adminEmail: 'admin@springfield.edu',
        academicYear: '2023-2024', timeZone: 'UTC-5 (EST)', language: 'English'
    });

    const [ssoSettings, setSsoSettings] = useState({
        mainEnabled: false, google: { enabled: false, clientId: '' },
        microsoft: { enabled: false, clientId: '' }, custom: { enabled: false, clientId: '' },
        redirectUrl: 'https://yourapp.com/auth/callback'
    });

    const [roles, setRoles] = useState([
        { id: 1, name: 'Super Admin', permissions: { view: true, add: true, edit: true, delete: true }, isSystem: true },
        { id: 2, name: 'School Admin', permissions: { view: true, add: true, edit: true, delete: false }, isSystem: true },
        { id: 3, name: 'Teacher', permissions: { view: true, add: false, edit: true, delete: false }, isSystem: true },
        { id: 4, name: 'Librarian', permissions: { view: true, add: true, edit: true, delete: true }, isSystem: false },
    ]);

    const [moduleAccess, setModuleAccess] = useState({
        'User Management': { 'Super Admin': true, 'School Admin': true, 'Teacher': false, 'Librarian': false },
        'Academic Management': { 'Super Admin': true, 'School Admin': true, 'Teacher': true, 'Librarian': false },
        'Reporting': { 'Super Admin': true, 'School Admin': true, 'Teacher': true, 'Librarian': true },
    });

    const [logoPreview, setLogoPreview] = useState('https://via.placeholder.com/150x50.png?text=Logo');
    const [faviconPreview, setFaviconPreview] = useState('https://via.placeholder.com/32x32.png?text=F');
    const [newRoleName, setNewRoleName] = useState('');

    // --- Handler Functions ---
    const handleSchoolInfoChange = (e) => setSchoolInfo({ ...schoolInfo, [e.target.name]: e.target.value });
    const handleSsoChange = (provider, field, value) => setSsoSettings(prev => ({ ...prev, [provider]: { ...prev[provider], [field]: value } }));
    const handleMainSsoToggle = () => setSsoSettings(prev => ({ ...prev, mainEnabled: !prev.mainEnabled }));
    const handleRolePermissionChange = (roleId, permission) => setRoles(prevRoles => prevRoles.map(role => role.id === roleId ? { ...role, permissions: { ...role.permissions, [permission]: !role.permissions[permission] } } : role));
    const handleModuleAccessChange = (module, roleName) => setModuleAccess(prev => ({ ...prev, [module]: { ...prev[module], [roleName]: !prev[module][roleName] } }));
    const handleLogoUpload = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setLogoPreview(reader.result); reader.readAsDataURL(file); } };
    const handleFaviconUpload = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFaviconPreview(reader.result); reader.readAsDataURL(file); } };
    const handleAddRole = () => { if (newRoleName.trim()) { const newRole = { id: Date.now(), name: newRoleName, permissions: { view: true, add: false, edit: false, delete: false }, isSystem: false }; setRoles([...roles, newRole]); setNewRoleName(''); } };
    const handleDeleteRole = (roleId) => setRoles(roles.filter(role => role.id !== roleId));
    const copyToClipboard = () => { navigator.clipboard.writeText(ssoSettings.redirectUrl); alert('Redirect URL copied to clipboard!'); };
    const handleSave = (section) => {
        console.log(`Saving ${section}...`, { schoolInfo, ssoSettings, roles, moduleAccess });
        alert(`${section} settings saved! (Check console for data)`);
    };

    // --- Custom CSS ---
    const styles = `
        :root {
            --heading-color: #1e2a38; --primary-bg: #7e3af2; --primary-text: white;
            --secondary-color: #7e3af2; --border-color: #cbd5e1; --hover-bg: rgba(126, 58, 242, 0.1); --card-bg: white;
        }
        body { background-color: var(--page-bg); font-family: sans-serif; }
        .main-heading { color: var(--heading-color); font-weight: 600; margin-bottom: 2rem; }
        
        /* Tab Navigation Styling */
        .nav-tabs .nav-link {
            color: var(--heading-color);
            border-bottom: 2px solid transparent;
            font-weight: 500;
            padding: 1rem 1.5rem;
        }
        .nav-tabs .nav-link:hover {
            border-bottom-color: var(--border-color);
            color: var(--secondary-color);
        }
        .nav-tabs .nav-link.active {
            color: var(--secondary-color);
            border-bottom-color: var(--secondary-color);
            background-color: transparent;
        }
        .nav-tabs { border-bottom: 1px solid var(--border-color); }

        /* Content Area Styling */
        .tab-content {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-top: none;
            border-radius: 0 0 8px 8px;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .form-label { font-weight: 500; color: #4a5568; }
        .form-control, .form-select { border-color: var(--border-color); transition: border-color 0.2s, box-shadow 0.2s; }
        .form-control:focus, .form-select:focus { border-color: var(--primary-bg); box-shadow: 0 0 0 0.2rem var(--hover-bg); }
        .btn-primary-custom { background-color: var(--primary-bg); color: var(--primary-text); border: 1px solid var(--primary-bg); padding: 0.5rem 1.5rem; font-weight: 500; transition: background-color 0.2s, border-color 0.2s; }
        .btn-primary-custom:hover { background-color: #6d28d9; border-color: #6d28d9; }
        .btn-secondary-custom { color: var(--secondary-color); background-color: transparent; border: 1px solid var(--secondary-color); padding: 0.5rem 1.5rem; font-weight: 500; transition: background-color 0.2s, color 0.2s; }
        .btn-secondary-custom:hover { background-color: var(--hover-bg); color: var(--secondary-color); }
        .table { color: var(--heading-color); }
        .table th { border-bottom: 2px solid var(--border-color); font-weight: 600; }
        .form-check-input:checked { background-color: var(--primary-bg); border-color: var(--primary-bg); }
        .form-switch .form-check-input:checked { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 1.0%29'/%3e%3c/svg%3e"); }
        .file-upload-wrapper { border: 1px dashed var(--border-color); padding: 1rem; border-radius: 4px; text-align: center; background-color: #f8fafc; }
        .preview-image { max-height: 50px; margin-top: 0.5rem; }
        .action-cell { min-width: 100px; }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="container mt-4">
                <h1 className="main-heading">Settings</h1>

                {/* Tab Navigation */}
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'school-info' ? 'active' : ''}`} onClick={() => setActiveTab('school-info')}>
                            School Information
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'sso' ? 'active' : ''}`} onClick={() => setActiveTab('sso')}>
                            Single Sign-On (SSO)
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
                            Roles & Permissions
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Page 1: School Information */}
                    {activeTab === 'school-info' && (
                        <div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">School Name</label>
                                    <input type="text" className="form-control" name="schoolName" value={schoolInfo.schoolName} onChange={handleSchoolInfoChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">School Email</label>
                                    <input type="email" className="form-control" name="schoolEmail" value={schoolInfo.schoolEmail} onChange={handleSchoolInfoChange} required />
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={schoolInfo.address} onChange={handleSchoolInfoChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Contact Number</label>
                                    <input type="text" className="form-control" name="contactNumber" value={schoolInfo.contactNumber} onChange={handleSchoolInfoChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Principal Name</label>
                                    <input type="text" className="form-control" name="principalName" value={schoolInfo.principalName} onChange={handleSchoolInfoChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Admin Email</label>
                                    <input type="email" className="form-control" name="adminEmail" value={schoolInfo.adminEmail} onChange={handleSchoolInfoChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Academic Year</label>
                                    <input type="text" className="form-control" name="academicYear" value={schoolInfo.academicYear} onChange={handleSchoolInfoChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Time Zone</label>
                                    <select className="form-select" name="timeZone" value={schoolInfo.timeZone} onChange={handleSchoolInfoChange} required>
                                        <option>UTC-11 (SST)</option><option>UTC-5 (EST)</option><option>UTC+0 (GMT)</option><option>UTC+1 (CET)</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Language</label>
                                    <select className="form-select" name="language" value={schoolInfo.language} onChange={handleSchoolInfoChange} required>
                                        <option>English</option><option>Spanish</option><option>French</option><option>German</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">School Logo</label>
                                    <div className="file-upload-wrapper">
                                        <input type="file" className="form-control" accept=".jpg, .png" onChange={handleLogoUpload} />
                                        {logoPreview && <img src={logoPreview} alt="Logo preview" className="preview-image" />}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Favicon / Small Logo</label>
                                    <div className="file-upload-wrapper">
                                        <input type="file" className="form-control" accept=".ico, .png" onChange={handleFaviconUpload} />
                                        {faviconPreview && <img src={faviconPreview} alt="Favicon preview" className="preview-image" />}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button className="btn btn-secondary-custom" onClick={() => alert('Cancelled')}>Cancel</button>
                                <button className="btn btn-primary-custom" onClick={() => handleSave('School Information')}>Save Changes</button>
                            </div>
                        </div>
                    )}

                    {/* Page 2: SSO */}
                    {activeTab === 'sso' && (
                        <div>
                            <div className="d-flex align-items-center mb-3">
                                <label className="form-label me-3 mb-0">Enable SSO</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" checked={ssoSettings.mainEnabled} onChange={handleMainSsoToggle} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Redirect URL (Read-only)</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" value={ssoSettings.redirectUrl} readOnly />
                                    <button className="btn btn-outline-secondary" type="button" onClick={copyToClipboard}>Copy</button>
                                </div>
                            </div>
                            {['google', 'microsoft', 'custom'].map(provider => (
                                <div key={provider} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">{provider.charAt(0).toUpperCase() + provider.slice(1)} {provider === 'custom' ? 'OAuth Provider' : 'Workspace'}</h5>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" checked={ssoSettings[provider].enabled} onChange={(e) => handleSsoChange(provider, 'enabled', e.target.checked)} disabled={!ssoSettings.mainEnabled} />
                                            </div>
                                        </div>
                                        {ssoSettings[provider].enabled && (
                                            <div className="mt-3">
                                                <label className="form-label">Client ID</label>
                                                <input type="text" className="form-control" value={ssoSettings[provider].clientId} onChange={(e) => handleSsoChange(provider, 'clientId', e.target.value)} required />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button className="btn btn-secondary-custom" onClick={() => alert('Testing connection...')}>Test Connection</button>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-secondary-custom" onClick={() => alert('Cancelled')}>Cancel</button>
                                    <button className="btn btn-primary-custom" onClick={() => handleSave('SSO')}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Page 3: Roles & Permissions */}
                    {activeTab === 'roles' && (
                        <div>
                            <h5 className="mb-3">User Roles</h5>
                            <div className="table-responsive">
                                <table className="table table-align-middle">
                                    <thead><tr><th>Role Name</th><th>Permissions</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {roles.map(role => (
                                            <tr key={role.id}>
                                                <td>{role.name}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        {['view', 'add', 'edit', 'delete'].map(perm => (
                                                            <div className="form-check form-switch" key={perm}>
                                                                <input className="form-check-input" type="checkbox" checked={role.permissions[perm]} onChange={() => handleRolePermissionChange(role.id, perm)} />
                                                                <label className="form-check-label text-capitalize">{perm}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="action-cell">
                                                    <button className="btn btn-sm btn-secondary-custom me-2">Edit</button>
                                                    {!role.isSystem && <button className="btn btn-sm btn-danger" onClick={() => handleDeleteRole(role.id)}>Delete</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex align-items-center gap-2 mt-4 mb-4">
                                <input type="text" className="form-control" placeholder="Enter new role name" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
                                <button className="btn btn-primary-custom" onClick={handleAddRole}>Add New Role</button>
                            </div>
                            <h5 className="mb-3">Module Access</h5>
                            <div className="table-responsive">
                                <table className="table table-align-middle">
                                    <thead><tr><th>Module Name</th>{roles.map(role => <th key={role.id}>{role.name}</th>)}</tr></thead>
                                    <tbody>
                                        {Object.keys(moduleAccess).map(module => (
                                            <tr key={module}>
                                                <td>{module}</td>
                                                {roles.map(role => (
                                                    <td key={role.id}>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={moduleAccess[module][role.name]} onChange={() => handleModuleAccessChange(module, role.name)} />
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button className="btn btn-secondary-custom" onClick={() => alert('Cancelled')}>Cancel</button>
                                <button className="btn btn-primary-custom" onClick={() => handleSave('Roles & Permissions')}>Save Changes</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminSettings;