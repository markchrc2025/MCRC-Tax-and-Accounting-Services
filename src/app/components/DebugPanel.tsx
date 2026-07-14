import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function DebugPanel() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTests = async () => {
    setTesting(true);
    const testResults: any = {
      timestamp: new Date().toISOString(),
      tests: [],
    };

    // Test 1: Check Supabase connection
    try {
      testResults.tests.push({
        name: "Supabase Connection",
        status: "success",
        message: `Project ID: ${projectId}`,
      });
    } catch (error) {
      testResults.tests.push({
        name: "Supabase Connection",
        status: "error",
        message: `Error: ${error}`,
      });
    }

    // Test 2: Health check
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-212365c9/health`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: "Server Health Check",
        status: response.ok ? "success" : "error",
        message: response.ok ? "Server is running" : "Server health check failed",
        data,
      });
    } catch (error: any) {
      testResults.tests.push({
        name: "Server Health Check",
        status: "error",
        message: `Error: ${error.message}`,
      });
    }

    // Test 2.5: Environment check
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-212365c9/env-check`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: "RESEND_API_KEY Check",
        status: data.resendApiKeyConfigured ? "success" : "error",
        message: data.resendApiKeyConfigured
          ? `API Key is configured (${data.resendApiKeyLength} characters, starts with ${data.resendApiKeyPrefix})`
          : "⚠️ RESEND_API_KEY is NOT configured! Please add it as an environment variable.",
        data,
      });
    } catch (error: any) {
      testResults.tests.push({
        name: "RESEND_API_KEY Check",
        status: "error",
        message: `Error checking environment: ${error.message}`,
      });
    }

    // Test 3: Submit test contact form
    try {
      const testSubmission = {
        name: "Debug Test User",
        email: "debug@test.com",
        phone: "1234567890",
        service: "Debug Test",
        message: "This is a debug test submission to check email notifications.",
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-212365c9/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(testSubmission),
        }
      );

      const data = await response.json();
      testResults.tests.push({
        name: "Contact Form Submission",
        status: response.ok ? "success" : "error",
        message: response.ok
          ? "Test submission successful - Check server logs for email status"
          : `Submission failed: ${data.error}`,
        data,
      });
    } catch (error: any) {
      testResults.tests.push({
        name: "Contact Form Submission",
        status: "error",
        message: `Error: ${error.message}`,
      });
    }

    // Test 4: Fetch submissions
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
      testResults.tests.push({
        name: "Fetch Submissions",
        status: response.ok ? "success" : "error",
        message: response.ok
          ? `Found ${data.submissions?.length || 0} submissions`
          : "Failed to fetch submissions",
        data: response.ok ? { count: data.submissions?.length } : data,
      });
    } catch (error: any) {
      testResults.tests.push({
        name: "Fetch Submissions",
        status: "error",
        message: `Error: ${error.message}`,
      });
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      case "error":
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <AlertCircle className="text-yellow-600" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-600">Success</Badge>;
      case "error":
        return <Badge className="bg-red-600">Error</Badge>;
      default:
        return <Badge className="bg-yellow-600">Warning</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#E6F7FF] p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#00618F] flex items-center gap-3">
              <AlertCircle size={28} />
              MCRC Debug Panel
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Test your contact form and email notification system
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-yellow-800 flex items-center gap-2 mb-2">
                <AlertCircle size={18} />
                Important Instructions
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1 ml-6 list-disc">
                <li>Click "Run Tests" to check all systems</li>
                <li>
                  <strong>Open browser console (F12)</strong> to see detailed server logs
                </li>
                <li>Check the "Contact Form Submission" test for email status</li>
                <li>
                  Look for log messages starting with "Resend API" in the console
                </li>
                <li>
                  Check your email inbox (christian.canlubo@mcrctas.com) and spam folder
                </li>
              </ul>
            </div>

            <Button
              onClick={runTests}
              disabled={testing}
              className="w-full bg-[#00618F] hover:bg-[#004d73]"
              size="lg"
            >
              {testing ? (
                <>
                  <RefreshCw className="mr-2 animate-spin" size={20} />
                  Running Tests...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2" size={20} />
                  Run Tests
                </>
              )}
            </Button>

            {results && (
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h3 className="text-lg mb-3" style={{ fontWeight: "600" }}>
                    Test Results
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Tested at: {new Date(results.timestamp).toLocaleString()}
                  </p>

                  <div className="space-y-3">
                    {results.tests.map((test: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(test.status)}
                              <h4 style={{ fontWeight: "600" }}>{test.name}</h4>
                            </div>
                            {getStatusBadge(test.status)}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{test.message}</p>
                          {test.data && (
                            <details className="text-xs bg-gray-50 p-2 rounded mt-2">
                              <summary className="cursor-pointer text-gray-600">
                                View Details
                              </summary>
                              <pre className="mt-2 overflow-auto">
                                {JSON.stringify(test.data, null, 2)}
                              </pre>
                            </details>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-800 flex items-center gap-2 mb-2">
                    <AlertCircle size={18} />
                    Email Debugging Tips
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1 ml-6 list-disc">
                    <li>
                      <strong>Open browser console (F12)</strong> - Look for messages
                      about "RESEND_API_KEY"
                    </li>
                    <li>
                      If you see "RESEND_API_KEY not configured" - The environment
                      variable is not set
                    </li>
                    <li>
                      If you see "Email notification sent successfully" - Check your
                      email and spam folder
                    </li>
                    <li>
                      If you see an error response - Check the Resend API error message
                      in the console
                    </li>
                    <li>
                      Visit{" "}
                      <a
                        href="https://dashboard.resend.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Resend Dashboard
                      </a>{" "}
                      to check email logs
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-green-800 mb-2">Next Steps</h3>
                  <ol className="text-sm text-green-700 space-y-1 ml-6 list-decimal">
                    <li>Check browser console for detailed logs</li>
                    <li>
                      If API key not found, make sure you added it in the Figma Make
                      environment
                    </li>
                    <li>
                      Check{" "}
                      <a
                        href="https://dashboard.resend.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        Resend Dashboard
                      </a>{" "}
                      for email delivery status
                    </li>
                    <li>Check spam folder in your email</li>
                    <li>If still not working, share the console logs for support</li>
                  </ol>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <a
            href="#home"
            className="text-[#00618F] hover:underline"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
