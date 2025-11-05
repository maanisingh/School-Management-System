import React, { useState } from 'react';
import { Check, AlertTriangle, FileText, DollarSign } from 'lucide-react';

const PermissionsMatrix = () => {
  const roles = ['Admin', 'Project manager', 'Sales Manager', 'Bookkeeper', 'Subcontractor', 'Client', 'CEO'];
  const modules = [
    { name: 'User Management', permissions: [true, false, true, false, false, false, true] },
    { name: 'Financial Report', permissions: [true, true, true, true, false, false, true] },
    { name: 'Project Creation', permissions: [true, true, true, false, false, false, true] },
    { name: 'Schedule Management', permissions: [true, true, true, false, true, true, true] },
    { name: 'Client Communication', permissions: [true, true, true, true, true, true, true] }
  ];

  const insights = [
    {
      icon: <AlertTriangle size={16} />,
      title: 'Quality Risk',
      badge: 'HIGH',
      badgeColor: '#fee',
      badgeTextColor: '#c33',
      description: 'Weather conditions may impact concrete',
      action: 'View Details',
      actionColor: '#4a90e2'
    },
    {
      icon: <DollarSign size={16} />,
      title: 'Deposits',
      badge: 'MEDIUM',
      badgeColor: '#d4edda',
      badgeTextColor: '#155724',
      description: '$245k in client deposits expected',
      action: 'Process',
      actionColor: '#28a745'
    },
    {
      icon: <FileText size={16} />,
      title: 'Documents',
      badge: 'NEW',
      badgeColor: '#cce5ff',
      badgeTextColor: '#004085',
      description: '3 permit applications require',
      action: 'Review',
      actionColor: '#4a90e2'
    }
  ];

  return (
    <div style={{ 
      padding: '30px', 
      
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          margin: 0,
          color: '#1a1a1a'
        }}>
          Permissions Matrix & Role Management
        </h1>
        <button style={{
          backgroundColor: '#ffc107',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          color: '#000'
        }}>
          Configure
        </button>
      </div>

      {/* Permissions Table */}
      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff' }}>
              <th style={{ 
                padding: '16px 20px', 
                textAlign: 'left', 
                fontWeight: '600',
                fontSize: '14px',
                color: '#1a1a1a',
                borderBottom: '2px solid #e9ecef'
              }}>
                Module
              </th>
              {roles.map((role, idx) => (
                <th key={idx} style={{ 
                  padding: '16px 20px', 
                  textAlign: 'center', 
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  borderBottom: '2px solid #e9ecef'
                }}>
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((module, moduleIdx) => (
              <tr key={moduleIdx} style={{ 
                borderBottom: '1px solid #e9ecef'
              }}>
                <td style={{ 
                  padding: '20px', 
                  fontWeight: '400',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  {module.name}
                </td>
                {module.permissions.map((hasPermission, roleIdx) => (
                  <td key={roleIdx} style={{ 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    {hasPermission ? (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#d4edda',
                        color: '#28a745'
                      }}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : (
                      <span style={{ color: '#dee2e6', fontSize: '18px' }}>–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Insights Section */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
              💡
            </div>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              margin: 0,
              color: '#1a1a1a'
            }}>
              AI Insights & Recommendations
            </h2>
          </div>
          <a href="#" style={{ 
            color: '#4a90e2', 
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            View All
          </a>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '16px' 
        }}>
          {insights.map((insight, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: insight.badgeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: insight.badgeTextColor,
                flexShrink: 0
              }}>
                {insight.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <span style={{ 
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#1a1a1a'
                  }}>
                    {insight.title}
                  </span>
                  <span style={{
                    backgroundColor: insight.badgeColor,
                    color: insight.badgeTextColor,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    {insight.badge}
                  </span>
                </div>
                <p style={{ 
                  margin: '0 0 12px 0',
                  fontSize: '13px',
                  color: '#6c757d',
                  lineHeight: '1.5'
                }}>
                  {insight.description}
                </p>
                <a href="#" style={{
                  color: insight.actionColor,
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  {insight.action}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionsMatrix;