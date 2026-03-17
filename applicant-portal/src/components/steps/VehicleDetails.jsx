export default function VehicleDetails({ formData, updateField, errors }) {
  const vehicleClasses = [
    {
      id: 'MCWOG',
      name: 'Motorcycle Without Gear',
      desc: 'Scooty, Moped (engine capacity up to 50cc)',
      icon: '🛵'
    },
    {
      id: 'MCWG',
      name: 'Motorcycle With Gear',
      desc: 'All motorcycles with gears',
      icon: '🏍️'
    },
    {
      id: 'LMV',
      name: 'Light Motor Vehicle',
      desc: 'Car, Jeep, small vans',
      icon: '🚗'
    },
    {
      id: 'LMV-TR',
      name: 'Transport Vehicle',
      desc: 'Taxi, Delivery Van, Light Commercial',
      icon: '🚐'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="info-panel flex items-start gap-2">
        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">Please select the correct Class of Vehicle (COV). You will only be tested for the vehicle classes selected below.</span>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Select Vehicle Class <span className="text-red-600">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vehicleClasses.map((vc) => (
            <div
              key={vc.id}
              onClick={() => updateField('vehicle_class', vc.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                formData.vehicle_class === vc.id
                  ? 'border-[#009EDE] bg-[#e3f2fd]'
                  : 'border-gray-200 bg-white hover:border-[#bce8f1] hover:bg-[#f0f9ff]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${formData.vehicle_class === vc.id ? 'opacity-100' : 'opacity-70'}`}>
                  {vc.icon}
                </div>
                <div>
                  <h4 className={`font-bold text-[15px] ${formData.vehicle_class === vc.id ? 'text-[#1244A2]' : 'text-gray-800'}`}>
                    {vc.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{vc.id} - {vc.desc}</p>
                </div>
                <div className="ml-auto">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.vehicle_class === vc.id ? 'border-[#009EDE]' : 'border-gray-300'
                  }`}>
                    {formData.vehicle_class === vc.id && <div className="w-2.5 h-2.5 rounded-full bg-[#009EDE]" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.vehicle_class && <p className="text-red-600 text-xs mt-2">{errors.vehicle_class}</p>}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Application Type <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md bg-gray-50 flex-1">
            <input
              type="radio"
              checked={formData.license_type === 'Learning License'}
              onChange={() => updateField('license_type', 'Learning License')}
              className="w-4 h-4 text-[#009EDE] focus:ring-[#009EDE]"
              name="license_type"
            />
            <span className="font-bold text-gray-700 text-sm">Issue of New Learner&apos;s Licence</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md bg-gray-50 flex-1 opacity-60">
            <input
              type="radio"
              disabled
              className="w-4 h-4"
              name="license_type"
            />
            <span className="font-bold text-gray-700 text-sm">Addition of Class to LL (Coming Soon)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
