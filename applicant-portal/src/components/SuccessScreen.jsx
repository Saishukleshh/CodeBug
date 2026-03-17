export default function SuccessScreen({ applicationNumber, onNewApplication }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(applicationNumber);
    alert('Application Number copied to clipboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="form-card text-center p-8 md:p-12 mb-8">
        <div className="mx-auto w-20 h-20 bg-[#dff0d8] rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-[#5CB85C]">
          <svg className="w-10 h-10 text-[#5CB85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#1244A2] mb-3">Application Submitted Successfully</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Your application for a Learner&apos;s Licence has been recorded in the Parivahan Sewa portal. Please quote your Application Number for tracking status.
        </p>

        <div className="bg-[#f0f9ff] border-2 border-[#bce8f1] rounded-lg p-6 inline-block w-full max-w-md shadow-sm">
          <p className="text-sm font-bold text-[#31708f] uppercase tracking-wider mb-2">Your Application Reference #</p>
          <div className="flex items-center justify-center gap-3 bg-white p-3 rounded-md border border-[#009EDE]">
            <span className="text-2xl md:text-3xl font-black text-[#1244A2] tracking-widest font-mono">
              {applicationNumber}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 text-[#009EDE] hover:bg-[#e3f2fd] rounded-full transition-colors flex-shrink-0"
              title="Copy to clipboard"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-gray-200 pt-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#fcf8e3] flex justify-center items-center flex-shrink-0 border border-[#faebcc]">
              <span className="text-xl">⏱️</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Processing Time</h4>
              <p className="text-gray-600 text-xs mt-1 leading-relaxed">Verification normally takes 3-5 working days. RTO officials will verify your uploaded documents.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex justify-center items-center flex-shrink-0 border border-[#bce8f1]">
              <span className="text-xl">📱</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Notifications</h4>
              <p className="text-gray-600 text-xs mt-1 leading-relaxed">You will receive SMS alerts on your registered mobile number upon approval or if any discrepancies are found.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onNewApplication}
          className="btn-gov-primary px-8 py-3 text-lg shadow-md"
        >
          Submit Another Application
        </button>
      </div>
    </div>
  );
}
