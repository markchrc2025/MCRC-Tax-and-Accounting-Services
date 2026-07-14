import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "figma:asset/3ed66585703accd1fb782894b7387ddb00993102.png";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#00618F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex-shrink-0">
                <ImageWithFallback src={logo} alt="MCRC Logo" className="w-full h-full object-contain" />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                MCRC
              </h3>
            </div>
            <p className="text-[#B3E5FC] mb-4">
              Empowering Entrepreneurs
            </p>
            <p className="text-sm text-[#B3E5FC] leading-relaxed">
              Your trusted partner in tax, accounting, and business advisory services since 2022.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontSize: "1.125rem", fontWeight: "600" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["home", "about", "services", "contact"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-[#B3E5FC] hover:text-white transition-colors capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4" style={{ fontSize: "1.125rem", fontWeight: "600" }}>
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-[#B3E5FC]">
              <li>Tax Advisory & Compliance</li>
              <li>Bookkeeping & Payroll</li>
              <li>Business Registration</li>
              <li>Financial Advisory</li>
              <li>Legal Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4" style={{ fontSize: "1.125rem", fontWeight: "600" }}>
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-[#B3E5FC]">
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <div>09190660794</div>
                  <div>09171102814</div>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>christian.canlubo@mcrctas.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Brgy San Roque, Marikina City</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-[#004d73] rounded-full flex items-center justify-center hover:bg-[#00B4D8] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#004d73] rounded-full flex items-center justify-center hover:bg-[#00B4D8] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#004d73] rounded-full flex items-center justify-center hover:bg-[#00B4D8] transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#004d73] mt-12 pt-8 text-center">
          <p className="text-[#B3E5FC] text-sm">
            © 2025 MCRC Tax and Accounting Services. All rights reserved.
          </p>
          <p className="text-[#B3E5FC] text-sm mt-2">
            Empowering entrepreneurs to achieve financial success.
          </p>
          <div className="mt-4">
            <a
              href="#admin"
              className="text-[#B3E5FC] hover:text-white text-xs transition-colors opacity-50 hover:opacity-100"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
