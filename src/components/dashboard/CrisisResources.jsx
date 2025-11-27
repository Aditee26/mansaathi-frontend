// frontend/src/components/dashboard/CrisisResources.jsx
import React from 'react';

const CrisisResources = () => {
  const resources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 free and confidential support for people in distress, prevention, and crisis resources",
      available: "24/7",
      url: "https://suicidepreventionlifeline.org",
      icon: "📞",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 crisis counseling via text message with trained crisis counselors",
      available: "24/7",
      url: "https://www.crisistextline.org",
      icon: "💬",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "SAMHSA Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service for mental health and substance use",
      available: "24/7",
      url: "https://www.samhsa.gov/find-help/national-helpline",
      icon: "🏥",
      color: "from-green-500 to-green-600"
    },
    {
      name: "The Trevor Project",
      phone: "1-866-488-7386",
      description: "Crisis intervention and suicide prevention for LGBTQ youth",
      available: "24/7",
      url: "https://www.thetrevorproject.org",
      icon: "🌈",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Veterans Crisis Line",
      phone: "1-800-273-8255",
      description: "Support for veterans in crisis and their families, press 1 for VA services",
      available: "24/7",
      url: "https://www.veteranscrisisline.net",
      icon: "🇺🇸",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Disaster Distress Helpline",
      phone: "1-800-985-5990",
      description: "Crisis counseling for emotional distress related to natural or human-caused disasters",
      available: "24/7",
      url: "https://www.samhsa.gov/find-help/disaster-distress-helpline",
      icon: "🌪️",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const copingStrategies = [
    {
      title: "Grounding Techniques",
      description: "5-4-3-2-1 method: Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, 1 thing you taste.",
      icon: "🌍",
      steps: ["Look around", "Notice sensations", "Listen carefully", "Identify smells", "Taste something"]
    },
    {
      title: "Breathing Exercise",
      description: "4-7-8 breathing: Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.",
      icon: "🌬️",
      steps: ["Breathe in (4s)", "Hold (7s)", "Exhale (8s)", "Repeat"]
    },
    {
      title: "Reach Out Immediately",
      description: "Contact a trusted friend, family member, or mental health professional. You don't have to face this alone.",
      icon: "👥",
      steps: ["Identify trusted person", "Call or text them", "Be honest", "Accept support"]
    },
    {
      title: "Create Safe Space",
      description: "Remove yourself from triggering situations and go to a safe, comfortable space where you feel secure.",
      icon: "🏠",
      steps: ["Find safe location", "Remove triggers", "Comfort yourself", "Stay until calm"]
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      title: "Call for Help",
      description: "Reach out to emergency services or a crisis hotline immediately",
      action: "Dial 988 or 911"
    },
    {
      step: 2,
      title: "Stay on the Line",
      description: "Don't hang up until you've spoken to someone who can help",
      action: "Keep talking"
    },
    {
      step: 3,
      title: "Remove Dangers",
      description: "Ensure your immediate environment is safe",
      action: "Secure your space"
    },
    {
      step: 4,
      title: "Don't Be Alone",
      description: "Stay with someone you trust until help arrives",
      action: "Find company"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl shadow-2xl p-8 text-white text-center mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🆘</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Immediate Help Available</h1>
                <p className="text-xl text-orange-100">
                  You are not alone. Help is available right now.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-2xl mx-auto">
              <a 
                href="tel:988" 
                className="bg-white text-red-600 font-bold py-4 px-6 rounded-2xl hover:bg-red-50 transition-all duration-300 text-lg shadow-lg flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">📞</span>
                <span>Call 988 Now</span>
              </a>
              <a 
                href="sms:741741" 
                className="bg-white text-red-600 font-bold py-4 px-6 rounded-2xl hover:bg-red-50 transition-all duration-300 text-lg shadow-lg flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">💬</span>
                <span>Text HOME to 741741</span>
              </a>
            </div>
            
            <div className="mt-6 p-4 bg-white/10 rounded-2xl">
              <p className="text-lg font-semibold">
                If you're in immediate danger, call <strong>911</strong> or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Steps */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-red-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Emergency Action Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencySteps.map((step) => (
              <div key={step.step} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {step.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crisis Resources */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-200">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-blue-600">🆘</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Crisis Resources</h2>
                  <p className="text-gray-600">Immediate support available 24/7. All services are free and confidential.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div 
                    key={index} 
                    className={`bg-gradient-to-br ${resource.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{resource.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{resource.name}</h3>
                        <div className="space-y-2">
                          <p className="text-xl font-semibold bg-white/20 px-3 py-1 rounded-lg inline-block">
                            {resource.phone}
                          </p>
                          <p className="text-white/90 text-sm">{resource.description}</p>
                          <p className="text-white/80 text-sm font-semibold">Available: {resource.available}</p>
                          {resource.url && (
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white font-semibold text-sm inline-flex items-center space-x-1 hover:underline"
                            >
                              <span>Visit Website</span>
                              <span>→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coping Strategies & Safety */}
          <div className="space-y-6">
            {/* Coping Strategies */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">💪</span>
                <span>Immediate Coping Strategies</span>
              </h3>

              <div className="space-y-4">
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className="bg-green-50 rounded-2xl p-4 border border-green-200 hover:border-green-300 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{strategy.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800 text-lg mb-2">{strategy.title}</h4>
                        <p className="text-green-700 text-sm mb-3">{strategy.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {strategy.steps.map((step, stepIndex) => (
                            <span key={stepIndex} className="bg-white text-green-600 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
                              {step}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Reminder */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl shadow-2xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">💛</span>
                <span>Safety Reminder</span>
              </h3>
              <div className="space-y-3 text-orange-800">
                <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-xl">
                  <span className="text-lg">❤️</span>
                  <span className="font-semibold">You are important and your life matters</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-xl">
                  <span className="text-lg">⏳</span>
                  <span className="font-semibold">Feelings are temporary - even when they feel overwhelming</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-xl">
                  <span className="text-lg">🤝</span>
                  <span className="font-semibold">Help is available - you don't have to go through this alone</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-xl">
                  <span className="text-lg">📞</span>
                  <span className="font-semibold">Reach out to trusted people in your life</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-red-600">🚨</span>
              </div>
              <h3 className="font-bold text-red-800 text-lg mb-2">Life-Threatening Emergency</h3>
              <p className="text-red-700 text-sm mb-4">
                If you or someone else is in immediate danger
              </p>
              <a 
                href="tel:911" 
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors duration-300 inline-block"
              >
                Call 911 Now
              </a>
            </div>
          </div>
        </div>

        {/* Hope Message */}
        <div className="text-center mt-12 bg-white rounded-3xl shadow-2xl p-8 border border-purple-200">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">There is Hope</h2>
            <p className="text-xl text-gray-600 mb-6">
              Many people who have felt overwhelmed have found help, support, and recovery. 
              You can get through this, and there are people who want to help you.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <p className="text-purple-800 font-semibold text-lg">
                "The bravest thing I ever did was continuing my life when I wanted to die." - Juliette Lewis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisResources;