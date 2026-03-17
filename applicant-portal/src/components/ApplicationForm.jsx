import { useState, useCallback } from 'react';
import axios from 'axios';
import PersonalInfo from './steps/PersonalInfo';
import ContactDetails from './steps/ContactDetails';
import Identification from './steps/Identification';
import VehicleDetails from './steps/VehicleDetails';
import DocumentUpload from './steps/DocumentUpload';

const API_URL = 'http://localhost:5000/api';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Contact Details' },
  { id: 3, title: 'Identification' },
  { id: 4, title: 'Vehicle & Licence' },
  { id: 5, title: 'Documents' },
];

const initialFormData = {
  full_name: '',
  father_name: '',
  mother_name: '',
  date_of_birth: '',
  gender: '',
  blood_group: '',
  nationality: 'Indian',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  pincode: '',
  mobile_number: '',
  email: '',
  emergency_contact: '',
  aadhaar_number: '',
  existing_license_number: '',
  vehicle_class: '',
  license_type: 'Learning License',
};

export default function ApplicationForm({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState({
    photo: null,
    aadhaar_doc: null,
    address_proof: null,
    medical_certificate: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const updateFile = useCallback((field, file) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const validateAadhaar = (aadhaar) => /^\d{12}$/.test(aadhaar);
  const validatePincode = (pincode) => /^\d{6}$/.test(pincode);
  const validateAge = (dob) => {
    if (!dob) return false;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 16;
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.full_name.trim() || formData.full_name.trim().length < 2) newErrors.full_name = 'Full name is required (min 2 characters)';
        if (!formData.father_name.trim() || formData.father_name.trim().length < 2) newErrors.father_name = "Father's name is required";
        if (!formData.mother_name.trim() || formData.mother_name.trim().length < 2) newErrors.mother_name = "Mother's name is required";
        if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
        else if (!validateAge(formData.date_of_birth)) newErrors.date_of_birth = 'Applicant must be at least 16 years old';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.blood_group) newErrors.blood_group = 'Blood group is required';
        break;
      case 2:
        if (!formData.address_line1.trim()) newErrors.address_line1 = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        else if (!validatePincode(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
        if (!formData.mobile_number) newErrors.mobile_number = 'Mobile number is required';
        else if (!validateMobile(formData.mobile_number)) newErrors.mobile_number = 'Invalid mobile (10 digits, starting with 6-9)';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.emergency_contact) newErrors.emergency_contact = 'Emergency contact is required';
        else if (!validateMobile(formData.emergency_contact)) newErrors.emergency_contact = 'Invalid emergency contact';
        break;
      case 3:
        if (!formData.aadhaar_number) newErrors.aadhaar_number = 'Aadhaar number is required';
        else if (!validateAadhaar(formData.aadhaar_number)) newErrors.aadhaar_number = 'Aadhaar must be 12 digits';
        break;
      case 4:
        if (!formData.vehicle_class) newErrors.vehicle_class = 'Vehicle class is required';
        break;
      case 5:
        if (!files.photo) newErrors.photo = 'Photo is required';
        if (!files.aadhaar_doc) newErrors.aadhaar_doc = 'Aadhaar document is required';
        if (!files.address_proof) newErrors.address_proof = 'Address proof is required';
        if (!files.medical_certificate) newErrors.medical_certificate = 'Medical certificate is required';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(prev => Math.min(prev + 1, 5)); };
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setSubmitting(true);
    setServerErrors([]);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (v) fd.append(k, v); });
      Object.entries(files).forEach(([k, f]) => { if (f) fd.append(k, f); });
      const res = await axios.post(`${API_URL}/applications`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      onSuccess(res.data.applicationNumber);
    } catch (error) {
      if (error.response?.data?.errors) setServerErrors(error.response.data.errors);
      else if (error.response?.data?.error) setServerErrors([error.response.data.error]);
      else setServerErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    const props = { formData, updateField, errors };
    switch (currentStep) {
      case 1: return <PersonalInfo {...props} />;
      case 2: return <ContactDetails {...props} />;
      case 3: return <Identification {...props} />;
      case 4: return <VehicleDetails {...props} />;
      case 5: return <DocumentUpload files={files} updateFile={updateFile} errors={errors} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="form-card p-4 mb-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`progress-step ${currentStep === step.id ? 'active' : currentStep > step.id ? 'completed' : 'inactive'}`}>
                  {currentStep > step.id ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : step.id}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block font-bold ${currentStep >= step.id ? 'text-[#0097a7]' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${currentStep > step.id ? 'bg-[#5CB85C]' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="form-card">
        <div className="section-header flex items-center gap-2">
          <span className="text-base">
            Step {currentStep}: {STEPS[currentStep - 1].title}
          </span>
          <span className="text-xs opacity-80 ml-auto">
            ({currentStep} of {STEPS.length})
          </span>
        </div>

        <div className="p-6">
          {/* Mandatory fields notice */}
          <div className="info-panel mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Fields marked with <span className="text-red-600 font-bold">*</span> are mandatory.</span>
          </div>

          {/* Server Errors */}
          {serverErrors.length > 0 && (
            <div className="error-panel mb-4">
              <p className="font-bold mb-1">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm">
                {serverErrors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          {/* Step Content */}
          <div className="min-h-[280px]">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="btn-gov-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ◀ Previous
            </button>

            {currentStep < 5 ? (
              <button onClick={handleNext} className="btn-gov-primary">
                Continue ▶
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-gov-success flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
