import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleStartTraining = () => navigate('/book-session');

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <h1 className="text-center mb-6">Your Soccer Blueprint to D1 Recruitment</h1>
          <p className="text-xl mb-8 text-center">Elite training designed by Stanford D1 players to accelerate your development</p>
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-sm">Players Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>
          <div className="text-center">
            <button 
              onClick={handleStartTraining}
              className="btn-white text-lg px-8 py-6"
            >
              Start Your Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* Training Plans Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="section-title text-center mb-12">Transform Your Game</h2>
          <div className="grid grid-2 gap-8">
            <div className="card">
              <h3 className="mb-4">Position-Specific Training</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-star text-primary mt-1 mr-2"></i>
                  <span>Custom drills for forwards, midfielders, defenders & goalkeepers</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-trophy text-primary mt-1 mr-2"></i>
                  <span>Pro-level speed and agility protocols</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-users text-primary mt-1 mr-2"></i>
                  <span>Weekly progression tracking</span>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="mb-4">1-on-1 Mentoring</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-video text-primary mt-1 mr-2"></i>
                  <span>Personal coaching sessions via Zoom</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-film text-primary mt-1 mr-2"></i>
                  <span>Game film analysis with D1 players</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-graduation-cap text-primary mt-1 mr-2"></i>
                  <span>Recruitment guidance and advice</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-white py-16">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6">Our Guarantee</h2>
            <div className="card">
              <i className="fas fa-shield-alt text-primary text-4xl mb-4"></i>
              <p className="text-xl mb-4">
                If you don't see more improvement in 30 days than you've experienced 
                in the last six months, we'll refund every penny.
              </p>
              <p className="text-gray-600">
                We're proud to say that no player has ever requested a refund after completing 
                our 30-day program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-center mb-12">Success Stories</h2>
          <div className="grid grid-3 gap-8">
            <div className="card">
              <p className="mb-4">
                "The personalized training plan completely transformed my game. I'm now being actively 
                recruited by top D1 programs."
              </p>
              <div className="font-bold">Alex Rodriguez</div>
              <div className="text-sm text-gray-500">Top 50 Ranked 2025 Recruit</div>
            </div>
            <div className="card">
              <p className="mb-4">
                "The mentoring from Stanford players gave me insights I couldn't get anywhere else. 
                Worth every penny!"
              </p>
              <div className="font-bold">Marcus Chen</div>
              <div className="text-sm text-gray-500">D1 Commit</div>
            </div>
            <div className="card">
              <p className="mb-4">
                "In just three months, I've seen more improvement than in the past year of 
                regular training."
              </p>
              <div className="font-bold">David Thompson</div>
              <div className="text-sm text-gray-500">Club Team Captain</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-6">Ready to Take Your Game to the Next Level?</h2>
          <p className="text-xl mb-8">Join the elite players who are transforming their game with our proven system</p>
          <button 
            onClick={handleStartTraining}
            className="btn-white text-lg px-8 py-6"
          >
            Start Training Today
          </button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
