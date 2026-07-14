import { useEffect, useState } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "figma:asset/3ed66585703accd1fb782894b7387ddb00993102.png";
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  Circle,
  Lock,
  LogOut,
  RefreshCw
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  status: "new" | "read";
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Simple password authentication (you can change this password)
  const ADMIN_PASSWORD = "mcrc2024admin";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("Logged in successfully");
      fetchSubmissions();
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setSubmissions([]);
    setSelectedSubmission(null);
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-212365c9/contact-submissions`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSubmissions(data.submissions || []);
      } else {
        toast.error("Failed to fetch submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Error loading submissions");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "new" | "read") => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-212365c9/contact-submissions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setSubmissions(submissions.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        ));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, status });
        }
        toast.success(`Marked as ${status}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-212365c9/contact-submissions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        setSubmissions(submissions.filter(sub => sub.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
        toast.success("Submission deleted");
      } else {
        toast.error("Failed to delete submission");
      }
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast.error("Error deleting submission");
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#E6F7FF] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-3">
                <ImageWithFallback src={logo} alt="MCRC Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <CardTitle className="text-center text-[#00618F]">
              Admin Dashboard
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Enter password to access contact submissions
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#00618F] hover:bg-[#004d73]">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#E6F7FF]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#00618F]" style={{ fontSize: "1.875rem", fontWeight: "700" }}>
                Contact Submissions
              </h1>
              <p className="text-gray-600 mt-1">
                {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
                {submissions.filter(s => s.status === 'new').length > 0 && (
                  <span className="ml-2 text-[#00618F]">
                    ({submissions.filter(s => s.status === 'new').length} new)
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={fetchSubmissions}
                variant="outline"
                disabled={loading}
              >
                <RefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} size={16} />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="mr-2" size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="space-y-4">
            {loading && submissions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  Loading submissions...
                </CardContent>
              </Card>
            ) : submissions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  No submissions yet
                </CardContent>
              </Card>
            ) : (
              submissions.map((submission) => (
                <Card
                  key={submission.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedSubmission?.id === submission.id
                      ? 'ring-2 ring-[#00618F] bg-blue-50'
                      : ''
                  }`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#00618F]" style={{ fontWeight: "600" }}>
                            {submission.name}
                          </h3>
                          <Badge
                            variant={submission.status === 'new' ? 'default' : 'secondary'}
                            className={submission.status === 'new' ? 'bg-[#00618F]' : ''}
                          >
                            {submission.status === 'new' ? (
                              <Circle className="mr-1" size={8} fill="currentColor" />
                            ) : (
                              <CheckCircle className="mr-1" size={12} />
                            )}
                            {submission.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{submission.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                      {submission.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(submission.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>
                        {new Date(submission.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Submission Details */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {selectedSubmission ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-[#00618F]">Submission Details</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateStatus(
                            selectedSubmission.id,
                            selectedSubmission.status === 'new' ? 'read' : 'new'
                          )
                        }
                      >
                        {selectedSubmission.status === 'new' ? (
                          <>
                            <CheckCircle className="mr-2" size={16} />
                            Mark Read
                          </>
                        ) : (
                          <>
                            <Circle className="mr-2" size={16} />
                            Mark New
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteSubmission(selectedSubmission.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-gray-500">Name</Label>
                    <p className="mt-1">{selectedSubmission.name}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="text-[#00618F] mt-1" size={18} />
                    <div className="flex-1">
                      <Label className="text-gray-500">Email</Label>
                      <p className="mt-1">{selectedSubmission.email}</p>
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="text-[#00618F] text-sm hover:underline"
                      >
                        Send email
                      </a>
                    </div>
                  </div>

                  {selectedSubmission.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="text-[#00618F] mt-1" size={18} />
                      <div className="flex-1">
                        <Label className="text-gray-500">Phone</Label>
                        <p className="mt-1">{selectedSubmission.phone}</p>
                        <a
                          href={`tel:${selectedSubmission.phone}`}
                          className="text-[#00618F] text-sm hover:underline"
                        >
                          Call now
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedSubmission.service && (
                    <div className="flex items-start gap-2">
                      <Building2 className="text-[#00618F] mt-1" size={18} />
                      <div className="flex-1">
                        <Label className="text-gray-500">Company / Service</Label>
                        <p className="mt-1">{selectedSubmission.service}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-gray-500">Message</Label>
                    <p className="mt-1 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                      {selectedSubmission.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t">
                    <Calendar size={16} />
                    <span>
                      Submitted on{' '}
                      {new Date(selectedSubmission.timestamp).toLocaleString('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'short',
                        timeZone: 'Asia/Manila',
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  Select a submission to view details
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
