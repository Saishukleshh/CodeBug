import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const UPLOADS_URL = 'http://localhost:5000/uploads';

export default function ApplicationDetails({ applicationData, onBack }) {
  const [actioning, setActioning] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [error, setError] = useState('');
  const [successStatus, setSuccessStatus] = useState(null); // 'approved' or 'rejected'

  const handleAction = async (action) => {
    if (action === 'reject' && rejectReason.length < 10) {
      setError('Please provide a descriptive reason for rejection (min 10 characters).');
      return;
    }

    setActioning(true);
    setError('');

    try {
      if (action === 'approve') {
        await axios.post(`${API_URL}/applications/${applicationData.application_number}/approve`);
        setSuccessStatus('approved');
      } else {
        await axios.post(`${API_URL}/applications/${applicationData.application_number}/reject`, {
          reason: rejectReason,
        });
        setSuccessStatus('rejected');
      }
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${action} application.`);
    } finally {
      setActioning(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    return <span className={`status-badge ${s}`}>{status.toUpperCase()}</span>;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  if (successStatus) {
    return (
      <div className="bg-white border rounded shadow p-10 text-center mx-auto max-w-2xl mt-10">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          successStatus === 'approved' ? 'bg-[#dff0d8] text-[#3c763d] border-2 border-[#5cb85c]' 
                                       : 'bg-[#f2dede] text-[#a94442] border-2 border-[#d9534f]'
        }`}>
          {successStatus === 'approved' ? (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          )}
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${successStatus === 'approved' ? 'text-[#3c763d]' : 'text-[#a94442]'}`}>
          Application {successStatus === 'approved' ? 'Approved' : 'Rejected'}
        </h2>
        <p className="text-gray-600 mb-6">
          Application <strong>{applicationData.application_number}</strong> has been successfully {successStatus}.
        </p>
        <button onClick={onBack} className="btn-gov-primary px-8">
          Process Next Application
        </button>
      </div>
    );
  }

  const isPending = applicationData.status.toLowerCase() === 'pending';

  return (
    <div className="bg-white border text-sm shadow-md rounded overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b bg-gray-50 mb-2">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="btn-gov-secondary flex items-center gap-1 px-3 py-1.5 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK
          </button>
          <div>
            <h2 className="text-lg font-bold text-[#1244A2]">App #{applicationData.application_number}</h2>
            <div className="flex gap-2 mt-1">
              {getStatusBadge(applicationData.status)}
              <span className="text-xs text-gray-500 font-mono py-1">
                Ref: {new Date(applicationData.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {isPending && (
          <div className="flex gap-3 mt-4 md:mt-0">
            <button onClick={() => setShowRejectModal(true)} className="btn-gov-danger shadow">
              ✗ Reject
            </button>
            <button onClick={() => setShowApproveModal(true)} className="btn-gov-success shadow">
              ✓ Approve
            </button>
          </div>
        )}
      </div>

      <div className="p-4 grid grid-cols-1 gap-6">
        {/* Verification Check Notice */}
        <div className="info-panel border-l-4 border-l-[#31708f] flex gap-3 items-center">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-bold">Authorized RTO Official Check required. Verify age limit against vehicle class. Compare Applicant Photo against Identity proof.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Personal Details */}
          <div>
            <div className="section-header bg-[#337ab7]">Personal Information</div>
            <table className="detail-table border-x border-b">
              <tbody>
                <tr><th>Full Name</th><td className="uppercase">{applicationData.full_name}</td></tr>
                <tr><th>Age / D.O.B</th><td>{calculateAge(applicationData.date_of_birth)} Yrs ({new Date(applicationData.date_of_birth).toLocaleDateString()})</td></tr>
                <tr><th>Father's Name</th><td className="uppercase">{applicationData.father_name}</td></tr>
                <tr><th>Mother's Name</th><td className="uppercase">{applicationData.mother_name}</td></tr>
                <tr><th>Gender</th><td>{applicationData.gender}</td></tr>
                <tr><th>Blood Group</th><td className="text-red-700 font-bold">{applicationData.blood_group}</td></tr>
                <tr><th>Nationality</th><td>{applicationData.nationality}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Contact Details */}
          <div>
            <div className="section-header bg-[#337ab7]">Contact Information</div>
            <table className="detail-table border-x border-b h-[calc(100%-43px)]">
              <tbody>
                <tr><th>Mobile</th><td className="font-mono text-blue-800 font-bold">{applicationData.mobile_number}</td></tr>
                <tr><th>Email</th><td>{applicationData.email}</td></tr>
                <tr><th>Address L1</th><td>{applicationData.address_line1}</td></tr>
                <tr><th>City / State</th><td>{applicationData.city}, {applicationData.state}</td></tr>
                <tr><th>Pincode</th><td className="font-mono">{applicationData.pincode}</td></tr>
                <tr><th>Emergency</th><td className="font-mono text-red-700">{applicationData.emergency_contact}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 3: Identity & Transport */}
          <div>
            <div className="section-header bg-[#337ab7]">Identity & Transport</div>
            <table className="detail-table border-x border-b">
              <tbody>
                <tr><th>Aadhaar Number</th><td className="font-mono font-bold">{applicationData.aadhaar_number}</td></tr>
                <tr><th>Existing Licence</th><td>{applicationData.existing_license_number || 'N/A'}</td></tr>
                <tr><th>Applied Class</th>
                    <td className="bg-[#e3f2fd] border-l-4 border-[#337ab7] font-bold text-[#1244A2]">
                        {applicationData.vehicle_class}
                    </td>
                </tr>
                <tr><th>Licence Type</th><td>{applicationData.license_type}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Documents Attached */}
          <div>
            <div className="section-header bg-[#337ab7]">Documents Submitted</div>
            <div className="border-x border-b bg-white p-4 h-[calc(100%-43px)]">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Applicant Photo", key: "photo_path", icon: "👤" },
                  { label: "Aadhaar / ID Card", key: "aadhaar_path", icon: "📄" },
                  { label: "Address Proof", key: "address_proof_path", icon: "🏠" },
                  { label: "Medical Cert. Form 1A", key: "medical_cert_path", icon: "⚕️" }
                ].map((doc, idx) => (
                    <a
                      key={idx}
                      href={`${UPLOADS_URL}/${applicationData[doc.key]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded bg-gray-50 hover:bg-[#d9edf7] hover:border-[#bce8f1] transition-colors group"
                    >
                      <span className="text-xl">{doc.icon}</span>
                      <span className="text-[#337ab7] font-bold group-hover:underline text-xs flex-1 truncate">
                        {doc.label}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-[#337ab7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {(showApproveModal || showRejectModal) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-xl max-w-lg w-full border-t-4 border-[#337ab7]">
            <div className="p-5 border-b">
              <h3 className={`text-xl font-bold ${showApproveModal ? 'text-[#3c763d]' : 'text-[#a94442]'} flex items-center gap-2`}>
                {showApproveModal ? '✓ Confirm Approval' : '✗ Confirm Rejection'}
              </h3>
            </div>
            
            <div className="p-6">
              {showApproveModal ? (
                <div className="space-y-4">
                  <div className="success-panel">
                    <p className="font-bold">Are you sure you want to approve this Learner's Licence?</p>
                  </div>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>I have verified the applicant's age visually and systemically.</li>
                    <li>The submitted documents are legible and valid.</li>
                    <li>The application meets all criteria for Class {applicationData.vehicle_class}.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="error-panel mb-4">
                    <p className="font-bold">Provide Reason for Rejection</p>
                  </div>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter the exact reason for rejecting this application (min 10 characters)..."
                    className="w-full border-gray-300 rounded p-3 text-sm focus:border-[#D9534F] focus:ring-[#D9534F] min-h-[100px]"
                    required
                  />
                  {rejectReason.length > 0 && rejectReason.length < 10 && (
                    <p className="text-red-500 text-xs">Reason must be at least 10 characters.</p>
                  )}
                </div>
              )}

              {error && <p className="text-red-600 text-sm mt-4 font-bold bg-[#f2dede] p-2 border border-[#ebccd1] rounded">{error}</p>}
            </div>

            <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3 rounded-b border-t border-gray-200">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setShowRejectModal(false);
                  setError('');
                }}
                disabled={actioning}
                className="btn-gov-secondary px-6"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(showApproveModal ? 'approve' : 'reject')}
                disabled={actioning || (showRejectModal && rejectReason.length < 10)}
                className={showApproveModal ? "btn-gov-success px-6" : "btn-gov-danger px-6"}
              >
                {actioning ? 'Processing...' : (showApproveModal ? 'Confirm Approve' : 'Confirm Reject')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
