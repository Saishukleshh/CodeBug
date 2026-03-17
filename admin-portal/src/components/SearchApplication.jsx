import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function SearchApplication({ onSearchSuccess }) {
  const [appNumber, setAppNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!appNumber.trim()) {
      setError('Please enter a valid Application Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/applications/${appNumber}`);
      onSearchSuccess(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('No record found for the provided application number.');
      } else {
        setError('Database connection error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="form-card border-none shadow-md overflow-hidden animate-slideUp">
        <div className="section-header bg-[#337ab7]">
          🔍 Review LL Application
        </div>

        <div className="p-8">
          <div className="info-panel mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#31708f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm">
              <strong>Instructions:</strong>
              <p className="mt-1 opacity-90">Enter the system-generated application number to view applicant details and documents. Verify all information carefully before approval.</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label htmlFor="appNumber" className="block text-sm font-bold text-gray-700 mb-2">
                Application Number <span className="text-red-500">*</span>
              </label>
              <div className="flex bg-[#fcf8e3] border border-[#faebcc] p-1 rounded">
                <div className="flex items-center px-4 border-r border-[#faebcc] bg-[#fcf8e3] text-[#8a6d3b] font-mono">
                  #
                </div>
                <input
                  type="text"
                  id="appNumber"
                  value={appNumber}
                  onChange={(e) => setAppNumber(e.target.value)}
                  placeholder="e.g., LL-20261103-1234"
                  className="gov-input border-0 focus:ring-0 flex-1 uppercase font-mono tracking-wider ml-1"
                  autoComplete="off"
                />
              </div>
            </div>

            {error && (
              <div className="error-panel text-center font-bold">
                ⚠️ {error}
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-gov-primary px-10 py-3 shadow-md flex items-center justify-center min-w-[200px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching Record...
                  </>
                ) : (
                  'Search Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 p-4 shadow-sm">
          <h4 className="font-bold text-[#1244A2] text-sm border-b pb-2 mb-2">Internal Guidelines</h4>
          <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4">
            <li>Verify Age criteria (Min 16 years).</li>
            <li>Check address proof matches state jurisdiction.</li>
            <li>Medical Form 1A must be signed/stamped.</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 p-4 shadow-sm">
          <h4 className="font-bold text-[#1244A2] text-sm border-b pb-2 mb-2">Rejection Policy</h4>
          <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4">
            <li>Illegible or blurred documents.</li>
            <li>Mismatched names in Aadhaar vs Application.</li>
            <li>Always provide a clear 10+ character reason.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
