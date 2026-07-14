import { 
  FileCheck, 
  DollarSign, 
  Calculator, 
  FileText, 
  BookOpen, 
  Users,
  Building2,
  Shield,
  Heart,
  Briefcase,
  TrendingUp,
  PieChart,
  Scale,
  UserCheck,
  GraduationCap,
  Megaphone,
  Palette
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Services() {
  const coreServices = [
    {
      icon: FileCheck,
      title: "Audit & Assurance",
      description: "Comprehensive audit services ensuring accuracy and compliance with financial standards."
    },
    {
      icon: FileText,
      title: "Financial Statement Preparation",
      description: "Professional preparation of financial statements that meet regulatory requirements."
    },
    {
      icon: Calculator,
      title: "Tax Advisory & Compliance",
      description: "Expert tax planning and compliance services to optimize your tax position."
    },
    {
      icon: Shield,
      title: "BIR Audit/LOA Assistance",
      description: "Professional support during BIR audits and Letter of Authority proceedings."
    },
    {
      icon: BookOpen,
      title: "Bookkeeping",
      description: "Accurate and timely recording of all your business financial transactions."
    },
    {
      icon: DollarSign,
      title: "Payroll Processing",
      description: "Efficient payroll management ensuring timely and accurate employee compensation."
    }
  ];

  const registrationServices = [
    {
      icon: Building2,
      title: "Business Permit Registration",
      description: "Assistance with business permit registration and annual renewals at all government levels."
    },
    {
      icon: FileCheck,
      title: "SEC/DTI/BIR/FDA Registration",
      description: "Complete registration services for SEC, DTI, BIR, and FDA requirements."
    },
    {
      icon: Heart,
      title: "SSS/PhilHealth/Pag-ibig",
      description: "Full compliance support for mandatory government contributions and registrations."
    }
  ];

  const advisoryServices = [
    {
      icon: TrendingUp,
      title: "Retirement Planning",
      description: "Strategic planning to secure your financial future and retirement goals."
    },
    {
      icon: Briefcase,
      title: "Business Consulting",
      description: "Expert advice to optimize operations, increase profitability, and drive growth."
    },
    {
      icon: PieChart,
      title: "Financial Investment",
      description: "Investment strategies and portfolio management for wealth creation."
    },
    {
      icon: FileText,
      title: "Financial Modeling",
      description: "Sophisticated financial models for forecasting, valuation, and decision-making."
    }
  ];

  const otherServices = [
    {
      icon: Scale,
      title: "Legal Services",
      description: "Contract drafting, review, and negotiation. Transfer of Land Title. CPA Certification for Estate Tax."
    },
    {
      icon: UserCheck,
      title: "HR & Manpower Services",
      description: "Comprehensive human resource solutions and manpower management."
    },
    {
      icon: GraduationCap,
      title: "Employee Training Programs",
      description: "Modular training programs designed to enhance employee skills and competencies."
    }
  ];

  const marketingServices = [
    {
      icon: Megaphone,
      title: "Brand Building & Customer Acquisition",
      description: "Strategic marketing initiatives to build your brand and acquire customers."
    },
    {
      icon: Palette,
      title: "Graphic Design & Multimedia",
      description: "Creative design and multimedia production services for all marketing materials."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-[#E6F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#00618F] mb-4" style={{ fontSize: "2.5rem", fontWeight: "700" }}>
            How We Can Help!
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: "1.125rem" }}>
            Focus on what matters most with our comprehensive services. We handle the complexities 
            of financial management and tax compliance, allowing you to concentrate on growing your business.
          </p>
        </div>

        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 bg-white">
            <TabsTrigger value="core" className="data-[state=active]:bg-[#00618F] data-[state=active]:text-white">
              Core Services
            </TabsTrigger>
            <TabsTrigger value="registration" className="data-[state=active]:bg-[#00618F] data-[state=active]:text-white">
              Registration
            </TabsTrigger>
            <TabsTrigger value="advisory" className="data-[state=active]:bg-[#00618F] data-[state=active]:text-white">
              Advisory
            </TabsTrigger>
            <TabsTrigger value="other" className="data-[state=active]:bg-[#00618F] data-[state=active]:text-white">
              Professional
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-[#00618F] data-[state=active]:text-white">
              Marketing
            </TabsTrigger>
          </TabsList>

          {/* Core Accounting & Tax Services */}
          <TabsContent value="core">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-t-4 border-t-[#00618F]">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00618F] to-[#00B4D8] rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#00618F] mb-3" style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Business Registration & Compliance */}
          <TabsContent value="registration">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrationServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-t-4 border-t-[#00618F]">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00618F] to-[#00B4D8] rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#00618F] mb-3" style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Advisory & Consulting */}
          <TabsContent value="advisory">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisoryServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-t-4 border-t-[#00618F]">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00618F] to-[#00B4D8] rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#00618F] mb-3" style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other Professional Services */}
          <TabsContent value="other">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-t-4 border-t-[#00618F]">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00618F] to-[#00B4D8] rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#00618F] mb-3" style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Marketing & Creative Services */}
          <TabsContent value="marketing">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {marketingServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-t-4 border-t-[#00618F]">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00618F] to-[#00B4D8] rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#00618F] mb-3" style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
