import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import heroBanner from "figma:asset/0ee3ed2586559c8454135cfc03717b0142fead1b.png";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative pt-16 overflow-hidden">
      {/* Hero Banner with Image and Text Overlay */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[500px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="MCRC Team"
            className="w-full h-full object-cover"
          />
          {/* Dark blue overlay for better text readability */}
          <div className="absolute inset-0 bg-[#2C3E50]/75"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center">
            <div className="max-w-2xl space-y-6">
              <div className="space-y-3">
                <h1 className="text-white" style={{ fontSize: "2.5rem", fontWeight: "700", lineHeight: "1.2" }}>
                  MCRC Tax and Accounting Services
                </h1>
                <p className="text-[#4DD0E1]" style={{ fontSize: "1.75rem", fontWeight: "700", lineHeight: "1.2" }}>
                  Empowering Entrepreneurs
                </p>
              </div>

              <p className="text-white/95" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                Founded in 2022 with a steadfast commitment to empower small business owners. We bridge the knowledge gap by providing comprehensive and accessible support to each and every micro and small business owner.
              </p>

              <div className="space-y-2.5">
                {[
                  "Expert Tax & Accounting Solutions",
                  "Business Registration & Compliance",
                  "Strategic Financial Advisory",
                  "Comprehensive Business Support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-[#4DD0E1] flex-shrink-0" size={22} />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-[#1E3A5F] hover:bg-[#152E4D] text-white"
                  size="lg"
                >
                  Request a Consultation
                  <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button
                  onClick={() => scrollToSection("services")}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1E3A5F] bg-transparent"
                >
                  Explore Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
