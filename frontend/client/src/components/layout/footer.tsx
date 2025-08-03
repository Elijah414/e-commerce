import './footer.css'
import logo from '../../assets/images/logo/logo.jpg'
 
 function Footer(){

return (
  <footer className="footer">
  <div className="footer-container">
    <div>
      <h2>FutureGuide</h2>
      <p>Find Your Future.</p>
      <p>Build Your Path.</p>
    </div>

    <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/exploreCareers">Explore Careers</a>
          <a href="/guaidanceQuiz">Guaidance Quiz</a>
          <a href="/resources">Resources</a>
          <a href="/about">About</a>
        </div>

        <div className="developer-section">
        <img src={logo} alt="Cipher's Den Logo" className="developer-logo" />
        <div className="developer-info">
          <span className="designer-text">Developed by</span>
          <span className="company-name">Cipher's Den</span>
          <span className="tagline">Future Tech Leaders</span>
        </div>
      </div>

      </div>
    <div id="allRightsReserved">
      © {new Date().getFullYear()} FutureGuide. All rights reserved.
    </div>
   
  </footer>



  
)};

export default Footer