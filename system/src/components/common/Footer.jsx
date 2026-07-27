function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DoctorApp</h3>
            <p className="text-gray-400">
              Your trusted platform for booking doctor appointments online.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/doctors" className="text-gray-400 hover:text-white transition-colors">
                  Doctors
                </a>
              </li>
              <li>
                <a href="/book-appointment" className="text-gray-400 hover:text-white transition-colors">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@doctorapp.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Medical Center Dr</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 DoctorApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
