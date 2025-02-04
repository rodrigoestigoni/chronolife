import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-white p-4 mt-4 text-center">
      © {new Date().getFullYear()} ChronoLife
    </footer>
  );
}

export default Footer;
