import React from 'react';
import './NavbarFooter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
    </footer>
  );
};

export default Footer;