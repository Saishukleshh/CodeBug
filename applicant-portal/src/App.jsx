import { useState } from 'react';
import ApplicationForm from './components/ApplicationForm';
import SuccessScreen from './components/SuccessScreen';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

  const handleSuccess = (appNumber) => {
    setApplicationNumber(appNumber);
    setSubmitted(true);
  };

  const handleNewApplication = () => {
    setSubmitted(false);
    setApplicationNumber('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Tricolor Stripe */}
      <div className="tricolor-stripe" />

      {/* Top Bar */}
      <div className="gov-header-top">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Screen Reader Access</span>
            <span className="text-yellow-300">|</span>
            <span>Skip to Main Content</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="cursor-pointer hover:underline text-xs">A-</span>
            <span className="cursor-pointer hover:underline text-sm">A</span>
            <span className="cursor-pointer hover:underline text-base">A+</span>
            <span className="text-yellow-300 ml-2">|</span>
            <span className="cursor-pointer hover:underline">English</span>
            <span className="cursor-pointer hover:underline">हिन्दी</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="gov-header-main">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Ashoka Emblem */}
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center p-1.5 shadow-md">
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
              <p className="text-sm opacity-90">सड़क परिवहन और राजमार्ग मंत्रालय</p>
              <p className="text-xs opacity-80">MINISTRY OF ROAD TRANSPORT & HIGHWAYS</p>
              <p className="text-lg font-bold tracking-wide mt-0.5">SARATHI - PARIVAHAN SEWA</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold">LEARNING LICENCE PORTAL</p>
            <p className="text-xs opacity-80 mt-1">
              DATE: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}
              &nbsp;&nbsp;TIME: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase()}
            </p>
          </div>
        </div>
      </header>

      {/* Page Title Bar */}
      <div className="bg-white border-b-2 border-[#e0e0e0] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <h1 className="text-[#0097a7] text-xl md:text-2xl font-bold text-center tracking-wide uppercase">
            Application for Learner&apos;s Licence (LL)
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 px-4">
        {submitted ? (
          <SuccessScreen
            applicationNumber={applicationNumber}
            onNewApplication={handleNewApplication}
          />
        ) : (
          <ApplicationForm onSuccess={handleSuccess} />
        )}
      </main>

      {/* Footer */}
      <footer className="gov-footer">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="font-bold mb-2 text-yellow-300">Designed & Developed by</p>
              <p className="text-xs opacity-80">National Informatics Centre (NIC)</p>
              <p className="text-xs opacity-80 mt-1">Ministry of Electronics & IT</p>
            </div>
            <div>
              <p className="font-bold mb-2 text-yellow-300">Quick Links</p>
              <p className="text-xs opacity-80 hover:opacity-100 cursor-pointer">Dashboard</p>
              <p className="text-xs opacity-80 hover:opacity-100 cursor-pointer mt-1">User Manual</p>
              <p className="text-xs opacity-80 hover:opacity-100 cursor-pointer mt-1">Acts & Rules</p>
            </div>
            <div>
              <p className="font-bold mb-2 text-yellow-300">Help & Support</p>
              <p className="text-xs opacity-80 hover:opacity-100 cursor-pointer">Contact Us</p>
              <p className="text-xs opacity-80 hover:opacity-100 cursor-pointer mt-1">FAQs</p>
              <p className="text-xs opacity-80 hover:opacity-100 cursor-pointer mt-1">Feedback</p>
            </div>
            <div>
              <p className="font-bold mb-2 text-yellow-300">Important</p>
              <p className="text-xs opacity-80">This is an online portal for Learning Licence applications.</p>
              <p className="text-xs opacity-60 mt-2">© 2026 Parivahan Sewa. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Tricolor */}
      <div className="tricolor-stripe" />
    </div>
  );
}

export default App;
