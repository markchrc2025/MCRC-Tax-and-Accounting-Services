import { Target, Heart, TrendingUp } from "lucide-react";
import aboutImage from "figma:asset/3568a43984398b447dc5b591c88ecda200dafed8.png";

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#00618F] mb-4" style={{ fontSize: "2.5rem", fontWeight: "700" }}>
            About MCRC
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: "1.125rem" }}>
            Committed to empowering entrepreneurs with expert financial guidance and support
          </p>
        </div>

        {/* Introduction of Company */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-12 bg-[#00B4D8]"></div>
                <h3 className="text-[#00618F]" style={{ fontSize: "1.875rem", fontWeight: "600" }}>
                  Introduction of Company
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                MCRC Tax and Accounting Services was founded in 2022 with a steadfast 
                commitment to empower small business owners. We understand the challenges 
                faced by entrepreneurs, particularly in navigating the complexities of accounting 
                and tax regulations. Our mission is to bridge this knowledge gap by providing 
                comprehensive and accessible support to each and every micro and small 
                business owners.
              </p>
              <div className="bg-gradient-to-r from-[#E6F7FF] to-white p-6 rounded-lg border-l-4 border-[#00618F]">
                <p className="text-gray-700 italic">
                  "Bridging the knowledge gap through comprehensive and accessible support 
                  for entrepreneurs"
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc1OTk5MTU1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business consulting"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Company's Commitment to Service */}
          <div className="bg-gradient-to-br from-[#E6F7FF] to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#00618F] rounded-full flex items-center justify-center mb-6">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="text-[#00618F] mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Company's Commitment to Service
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We believe that every entrepreneur deserves the tools and knowledge to effectively 
              manage their finances. Through our services, we aim to equip business owners with 
              a deep understanding of accounting principles, tax laws, and compliance requirements.
            </p>
          </div>

          {/* Importance of Accounting */}
          <div className="bg-gradient-to-br from-[#E6F7FF] to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#00618F] rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-[#00618F] mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Importance of Accounting
            </h3>
            <p className="text-gray-700 leading-relaxed">
              By cultivating a strong foundation of financial literacy, we equip entrepreneurs 
              with the knowledge and skills to navigate the complexities of the business world. 
              This includes understanding key financial concepts and providing valuable insights.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-gradient-to-br from-[#E6F7FF] to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-[#00618F] rounded-full flex items-center justify-center mb-6">
              <Target className="text-white" size={32} />
            </div>
            <h3 className="text-[#00618F] mb-4" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We empower entrepreneurs to make informed decisions, optimize their business 
              operations, and achieve sustainable growth. Our support network provides valuable 
              insights, identifies potential challenges, and offers tailored strategies to overcome obstacles.
            </p>
          </div>
        </div>

        {/* Full-Width Impact Statement */}
        <div className="bg-gradient-to-r from-[#00618F] to-[#00B4D8] p-12 rounded-2xl text-white text-center">
          <p style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>
            By providing access to expert guidance from experienced mentors, consultants, 
            and financial advisors, we empower entrepreneurs to make informed decisions, 
            optimize their business operations, and achieve sustainable growth.
          </p>
        </div>
      </div>
    </section>
  );
}
