export default function PersonalInfo({ formData, updateField, errors }) {
  const genderOptions = ['Male', 'Female', 'Other'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input type="text" value={formData.full_name} onChange={(e) => updateField('full_name', e.target.value)}
            className={`gov-input ${errors.full_name ? 'error' : ''}`} placeholder="Enter your full name" id="full_name" />
          {errors.full_name && <p className="text-red-600 text-xs mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Date of Birth <span className="text-red-600">*</span>
          </label>
          <input type="date" value={formData.date_of_birth} onChange={(e) => updateField('date_of_birth', e.target.value)}
            className={`gov-input ${errors.date_of_birth ? 'error' : ''}`} id="date_of_birth" />
          {errors.date_of_birth && <p className="text-red-600 text-xs mt-1">{errors.date_of_birth}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Father&apos;s Name <span className="text-red-600">*</span>
          </label>
          <input type="text" value={formData.father_name} onChange={(e) => updateField('father_name', e.target.value)}
            className={`gov-input ${errors.father_name ? 'error' : ''}`} placeholder="Enter father's name" id="father_name" />
          {errors.father_name && <p className="text-red-600 text-xs mt-1">{errors.father_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Mother&apos;s Name <span className="text-red-600">*</span>
          </label>
          <input type="text" value={formData.mother_name} onChange={(e) => updateField('mother_name', e.target.value)}
            className={`gov-input ${errors.mother_name ? 'error' : ''}`} placeholder="Enter mother's name" id="mother_name" />
          {errors.mother_name && <p className="text-red-600 text-xs mt-1">{errors.mother_name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Gender <span className="text-red-600">*</span>
          </label>
          <select value={formData.gender} onChange={(e) => updateField('gender', e.target.value)}
            className={`gov-select ${errors.gender ? 'error' : ''}`} id="gender">
            <option value="">-- Select --</option>
            {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Blood Group <span className="text-red-600">*</span>
          </label>
          <select value={formData.blood_group} onChange={(e) => updateField('blood_group', e.target.value)}
            className={`gov-select ${errors.blood_group ? 'error' : ''}`} id="blood_group">
            <option value="">-- Select --</option>
            {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          {errors.blood_group && <p className="text-red-600 text-xs mt-1">{errors.blood_group}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nationality</label>
          <input type="text" value={formData.nationality} onChange={(e) => updateField('nationality', e.target.value)}
            className="gov-input" placeholder="Nationality" id="nationality" />
        </div>
      </div>
    </div>
  );
}
