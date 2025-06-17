
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExperiencePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const experiences = [
  {
    company: "CONNECTED LOGISTICS",
    role: "APPLICATIONS PROGRAMMER",
    period: "09/2024 - PRESENT",
    location: "REMOTE",
    responsibilities: [
      "Assist systems analysts and designers in translating solutions into detailed program specifications.",
      "Prepare documentation for programmers, system users, and support services workers.",
      "Test applications and assisted in the modification of program code to enhance capabilities.",
      "Help with program design activities, including defining data arrangements."
    ]
  },
  {
    company: "UPS",
    role: "SOFTWARE QUALITY ENGINEER",
    period: "07/2023 - 09/2024",
    location: "REMOTE",
    responsibilities: [
      "Utilized Selenium and TestNG to execute automated test scripts for a Java-based web application.",
      "Integrated robust reporting and logging mechanisms to provide clear test execution summaries and detailed logs for troubleshooting and analysis.",
      "Established and executed security and automation testing protocols within the development pipeline."
    ]
  },
  {
    company: "CHAINBRIDGE SOLUTIONS",
    role: "SOFTWARE TEST ENGINEER",
    period: "12/2020 - 04/2023",
    location: "REMOTE",
    responsibilities: [
      "Writing and running tests on an AF Java web application",
      "Writing and running automation tests with Selenium",
      "Performance testing with JUnit on web application",
      "Ran, wrote and transitioned HP ALM test cases to Jira and Zephyr"
    ]
  },
  {
    company: "PCI",
    role: "MOBILE APPS ENGINEER",
    period: "06/2018 - 09/2020",
    location: "MONTGOMERY, AL",
    responsibilities: [
      "Developed mobile developer standards for a technical baseline",
      "Ran security tests on mobile application",
      "Wrote and ran automation tests with Selenium and Cypress"
    ]
  },
  {
    company: "OCV, LLC",
    role: "iOS DEVELOPER",
    period: "10/2017 - 06/2018",
    location: "AUBURN, AL",
    responsibilities: [
      "Developed, tested, and performed quality control on 15+ iOS applications using MacOS, Xcode, Swift, and Objective-C.",
      "Published applications to the App Store with focus on user experience and performance optimization."
    ]
  }
];

export const ExperiencePopup: React.FC<ExperiencePopupProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentExperience = experiences[currentIndex];

  const nextExperience = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextExperience();
    if (e.key === 'ArrowLeft') prevExperience();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="bg-gray-900 border border-green-400 rounded-lg shadow-2xl w-full max-w-4xl animate-scale-in">
        {/* Terminal-style header */}
        <div className="bg-gray-800 border-b border-green-400 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm text-green-400 font-mono">
              experience.show({currentIndex + 1}/{experiences.length})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevExperience}
              className="text-green-400 hover:text-green-300 transition-colors p-1 rounded hover:bg-gray-700"
              aria-label="Previous experience"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextExperience}
              className="text-green-400 hover:text-green-300 transition-colors p-1 rounded hover:bg-gray-700"
              aria-label="Next experience"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={onClose}
              className="text-green-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-gray-700"
              aria-label="Close experience"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto bg-black">
          <div className="mb-4">
            <h2 className="text-green-400 font-mono text-xl mb-1">{currentExperience.company}</h2>
            <h3 className="text-green-300 font-mono text-lg mb-2">{currentExperience.role}</h3>
            <div className="flex flex-wrap gap-4 text-green-400/80 font-mono text-sm mb-4">
              <span>📅 {currentExperience.period}</span>
              <span>📍 {currentExperience.location}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-green-400 font-mono text-sm mb-2">$ responsibilities --list</h4>
            {currentExperience.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-green-400 font-mono text-sm mt-1">├──</span>
                <span className="text-green-300 font-mono text-sm leading-relaxed">
                  {responsibility}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-400' : 'bg-green-400/30'
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Terminal-style footer */}
        <div className="border-t border-green-400/30 px-4 py-2 bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
            <span>Use ← → arrows to navigate | ESC to close</span>
            <span>{currentIndex + 1} of {experiences.length} positions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
