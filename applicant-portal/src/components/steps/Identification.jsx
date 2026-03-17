export default function Identification({ formData, updateField, errors }) {
  return (
    <div className="space-y-4">
      <div className="info-panel mb-4 flex items-start gap-2">
        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">Your Aadhaar number is used for identity verification purposes only. All data is securely stored.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Aadhaar Number <span className="text-red-600">*</span>
          </label>
          <input type="text" maxLength={12} value={formData.aadhaar_number}
            onChange={(e) => updateField('aadhaar_number', e.target.value.replace(/\D/g, ''))}
            className={`gov-input ${errors.aadhaar_number ? 'error' : ''}`} placeholder="12-digit Aadhaar number" id="aadhaar_number" />
          {errors.aadhaar_number && <p className="text-red-600 text-xs mt-1">{errors.aadhaar_number}</p>}
          {formData.aadhaar_number && formData.aadhaar_number.length === 12 && (
            <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Valid format
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Existing Licence Number <span className="text-gray-400 text-xs font-normal">(if any)</span>
          </label>
          <input type="text" maxLength={20} value={formData.existing_license_number}
            onChange={(e) => updateField('existing_license_number', e.target.value.toUpperCase())}
            className="gov-input" placeholder="e.g., DL-1234567890123" id="existing_license_number" />
          <p className="text-gray-500 text-xs mt-1">Leave blank if this is your first licence application</p>
        </div>
      </div>
    </div>
  );
}
