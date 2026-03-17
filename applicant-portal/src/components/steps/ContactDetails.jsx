export default function ContactDetails({ formData, updateField, errors }) {
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry',
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Address Line 1 <span className="text-red-600">*</span>
        </label>
        <input type="text" value={formData.address_line1} onChange={(e) => updateField('address_line1', e.target.value)}
          className={`gov-input ${errors.address_line1 ? 'error' : ''}`} placeholder="House No., Street, Area" id="address_line1" />
        {errors.address_line1 && <p className="text-red-600 text-xs mt-1">{errors.address_line1}</p>}
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Address Line 2</label>
        <input type="text" value={formData.address_line2} onChange={(e) => updateField('address_line2', e.target.value)}
          className="gov-input" placeholder="Landmark, Locality (Optional)" id="address_line2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">City <span className="text-red-600">*</span></label>
          <input type="text" value={formData.city} onChange={(e) => updateField('city', e.target.value)}
            className={`gov-input ${errors.city ? 'error' : ''}`} placeholder="Enter city" id="city" />
          {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">State <span className="text-red-600">*</span></label>
          <select value={formData.state} onChange={(e) => updateField('state', e.target.value)}
            className={`gov-select ${errors.state ? 'error' : ''}`} id="state">
            <option value="">-- Select State --</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Pincode <span className="text-red-600">*</span></label>
          <input type="text" maxLength={6} value={formData.pincode}
            onChange={(e) => updateField('pincode', e.target.value.replace(/\D/g, ''))}
            className={`gov-input ${errors.pincode ? 'error' : ''}`} placeholder="6-digit pincode" id="pincode" />
          {errors.pincode && <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number <span className="text-red-600">*</span></label>
          <input type="text" maxLength={10} value={formData.mobile_number}
            onChange={(e) => updateField('mobile_number', e.target.value.replace(/\D/g, ''))}
            className={`gov-input ${errors.mobile_number ? 'error' : ''}`} placeholder="10-digit mobile" id="mobile_number" />
          {errors.mobile_number && <p className="text-red-600 text-xs mt-1">{errors.mobile_number}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email Address <span className="text-red-600">*</span></label>
          <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)}
            className={`gov-input ${errors.email ? 'error' : ''}`} placeholder="your@email.com" id="email" />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Emergency Contact <span className="text-red-600">*</span></label>
          <input type="text" maxLength={10} value={formData.emergency_contact}
            onChange={(e) => updateField('emergency_contact', e.target.value.replace(/\D/g, ''))}
            className={`gov-input ${errors.emergency_contact ? 'error' : ''}`} placeholder="10-digit number" id="emergency_contact" />
          {errors.emergency_contact && <p className="text-red-600 text-xs mt-1">{errors.emergency_contact}</p>}
        </div>
      </div>
    </div>
  );
}
