import HealthCamps from "../components/camp/HealthCamps"
import HeroSection from "../components/landing/HeroSection"
import SmartFeatures from "../components/landing/SmartFeatures"

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <section id="home">
          <HeroSection />
          <HealthCamps/>
          <SmartFeatures/>
        </section>
    
    </div>
    </>
  )
}

export default LandingPage