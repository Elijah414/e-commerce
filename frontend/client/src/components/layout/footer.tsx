import './footer.css'
import logo from '../../assets/images/logo/logo.png'
 
 function Footer(){

return (
  <footer className="footer">
  <div className="footer-container">
    <div>
      <h2>FastDelivery</h2>
      <p>Find Your Drip.</p>
    </div>

    <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/about">About</a>
        </div>

        <div className="developer-section">
        <img src={logo} alt="Luheni foundation logo" className="developer-logo" />
        <div className="developer-info">
          <span className="designer-text">Developed by</span>
          <span className="company-name">Luheni Foundation</span>
          <span className="tagline">We care</span>
        </div>
      </div>

      </div>
    <div id="allRightsReserved">
      © {new Date().getFullYear()} FastDelivery. All rights reserved.
    </div>
   
  </footer>



  
)};

export default Footer