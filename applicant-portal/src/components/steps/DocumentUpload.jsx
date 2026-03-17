import { useCallback } from 'react';

export default function DocumentUpload({ files, updateFile, errors }) {
  const handleDrop = useCallback((e, field) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      updateFile(field, file);
    } else {
      alert("Invalid file. Please upload PDF, JPG, or PNG under 5MB.");
    }
  }, [updateFile]);

  const handleChange = (e, field) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      updateFile(field, file);
    } else {
      e.target.value = null; // reset
      alert("Invalid file. Please upload PDF, JPG, or PNG under 5MB.");
    }
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const docs = [
    {
      id: 'photo',
      title: 'Applicant Photo',
      desc: 'Recent passport size photo (JPG/PNG)',
      req: 'Mandatory',
      icon: '👤'
    },
    {
      id: 'aadhaar_doc',
      title: 'Aadhaar Card',
      desc: 'Self-attested copy of Aadhaar (PDF/JPG)',
      req: 'Mandatory (Proof of Identity)',
      icon: '📄'
    },
    {
      id: 'address_proof',
      title: 'Address Proof',
      desc: 'Passport, Voter ID, or Utility Bill',
      req: 'Mandatory (Proof of Address)',
      icon: '🏠'
    },
    {
      id: 'medical_certificate',
      title: 'Medical Certificate (Form 1A)',
      desc: 'Signed by registered medical practitioner',
      req: 'Mandatory (Age > 40 or Transport)',
      icon: '⚕️'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="warning-panel flex items-start gap-2">
        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-sm">
          <strong>Important Instructions:</strong>
          <ul className="list-disc list-inside mt-1 ml-1 opacity-90">
            <li>Ensure documents are properly scanned and clearly readable.</li>
            <li>Supported formats: JPG, PNG, PDF only. Maximum file size: 5 MB per document.</li>
            <li>Uploading forged or false documents is punishable under law.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc) => (
          <div key={doc.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:border-[#bce8f1] transition-colors">
            <div className="flex border-b border-gray-100 pb-3 mb-3">
              <div className="text-2xl mr-3">{doc.icon}</div>
              <div>
                <h4 className="font-bold text-[#1244A2] text-sm">{doc.title} <span className="text-red-600">*</span></h4>
                <p className="text-xs text-gray-500 mt-0.5">{doc.desc}</p>
                <div className="inline-block px-2 py-0.5 bg-[#fcf8e3] text-[#8a6d3b] text-[11px] font-bold rounded-sm mt-1 border border-[#faebcc]">
                  {doc.req}
                </div>
              </div>
            </div>

            <div
              className={`file-upload-zone relative mt-2 ${files[doc.id] ? 'has-file' : ''} ${errors[doc.id] ? 'border-red-500! bg-[#f2dede!]' : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, doc.id)}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleChange(e, doc.id)}
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <div className="pointer-events-none flex flex-col items-center justify-center">
                {files[doc.id] ? (
                  <>
                    <svg className="w-8 h-8 text-[#5CB85C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-bold text-[#3c763d] truncate w-full px-4">
                      {files[doc.id].name}
                    </span>
                    <span className="text-xs text-[#3c763d] opacity-80 mt-1">
                      Click or drag to replace
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-[#009EDE] mb-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-sm text-[#31708f] font-bold">
                      Click to Browse
                    </span>
                    <span className="text-xs text-[#31708f] opacity-80 mt-1">
                      or drag & drop file here
                    </span>
                  </>
                )}
              </div>
            </div>
            {errors[doc.id] && <p className="text-red-600 text-xs mt-2 text-center font-bold">{errors[doc.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
