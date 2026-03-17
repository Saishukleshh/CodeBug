import { useState } from 'react';
import SearchApplication from './components/SearchApplication';
import ApplicationDetails from './components/ApplicationDetails';

function App() {
  const [applicationData, setApplicationData] = useState(null);

  const handleSearchSuccess = (data) => {
    setApplicationData(data);
  };

  const handleBack = () => {
    setApplicationData(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Tricolor Stripe */}
      <div className="tricolor-stripe" />

      {/* Top Bar */}
      <div className="gov-header-top">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Admin Review Panel (Internal Use Only)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-yellow-300">|</span>
            <span>English</span>
            <span className="cursor-pointer hover:underline text-xs ml-2">A-</span>
            <span className="cursor-pointer hover:underline text-sm">A</span>
            <span className="cursor-pointer hover:underline text-base">A+</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="gov-header-main shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Ashoka Emblem */}
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center p-1 border-2 border-[#1244A2]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1244A2]">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="50" cy="50" r="12" fill="currentColor"/>
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
                  <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(angle * Math.PI / 180)} y2={50 + 40 * Math.sin(angle * Math.PI / 180)} stroke="currentColor" strokeWidth="2" />
                ))}
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1244A2]">सड़क परिवहन और राजमार्ग मंत्रालय</p>
              <p className="text-[11px] font-bold text-gray-600">MINISTRY OF ROAD TRANSPORT & HIGHWAYS</p>
              <p className="text-lg font-black text-[#e65100] tracking-wide mt-0.5">VAHAN - SARATHI ADMIN</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="bg-[#f0f9ff] border border-[#bce8f1] px-4 py-2 rounded-md">
              <p className="text-sm font-bold text-[#1244A2] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                RTO Official Login
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title Bar */}
      <div className="bg-[#1244A2] text-white shadow-sm border-b-4 border-yellow-500">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h1 className="text-sm font-bold tracking-wide">
            APPLICATION PROCESSING & VERIFICATION MODULE
          </h1>
        </div>
      </div>

      <main className="flex-1 py-8 px-4 w-full flex justify-center items-start">
        <div className="w-full max-w-5xl">
          {applicationData ? (
            <ApplicationDetails 
              applicationData={applicationData} 
              onBack={handleBack} 
            />
          ) : (
            <SearchApplication onSearchSuccess={handleSearchSuccess} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="gov-footer mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs opacity-80 gap-4">
            <div>
              <p>This is a secure application verification module for authorized RTO officials only.</p>
              <p className="mt-1">Unauthorized access is prohibited and punishable under IT Act 2000.</p>
            </div>
            <div className="text-right">
              <p className="font-bold">National Informatics Centre</p>
              <p>© 2026 Admin Portal</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
