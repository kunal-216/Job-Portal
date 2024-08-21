import React, { useState } from 'react';

const Connect = () => {
  const [activeSection, setActiveSection] = useState('chat');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setActiveSection('chat')}
          className={`px-4 py-2 rounded-md text-white ${activeSection === 'chat' ? 'bg-blue-500' : 'bg-gray-400'}`}
        >
          Chat
        </button>
        <button 
          onClick={() => setActiveSection('video')}
          className={`px-4 py-2 rounded-md text-white ${activeSection === 'video' ? 'bg-blue-500' : 'bg-gray-400'}`}
        >
          Video Call
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        {activeSection === 'chat' ? (
          <div className="h-96 flex items-center justify-center">
            
            <p className="text-gray-600">This is the chat section.</p>
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center">
            
            <p className="text-gray-600">This is the video call section.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connect;
