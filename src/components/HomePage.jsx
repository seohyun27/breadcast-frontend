

import React from 'react';

import HeroIntro from './Home/HeroIntro';
import FeatureMission from './Home/FeatureMission';
import ReviewSection from './Home/ReviewSection';
import Footer from './Home/Footer';

function HomePage() {
  return (
    <div className="homepage-wrapper">
      <HeroIntro />
      <FeatureMission />
      <ReviewSection />
      <Footer />
    </div>
  );
}

export default HomePage;