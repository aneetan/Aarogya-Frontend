import HealthCamps from "../components/camp/HealthCamps"
import HeroSection from "../components/landing/HeroSection"
import SmartFeatures from "../components/landing/SmartFeatures"

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <section id="home">
          <HeroSection />
          <SmartFeatures/>
          <HealthCamps/>
        </section>
      
      {/* <section id="contact">
        <ContactUs />
      </section>  */}
    </div>
    </>
  )
}

export default LandingPage