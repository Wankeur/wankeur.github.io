import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const Privacy = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = "Privacy Policy - Daedale";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Privacy Policy & Confidentiality Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                When you use Daedale, we may collect the following information:
              </p>
              <ul>
                <li>Personal information you provide when creating an account (name, email)</li>
                <li>Project submissions and tutorial content</li>
                <li>Comments and interactions on the platform</li>
                <li>Usage data and analytics to improve our services</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use your information to:
              </p>
              <ul>
                <li>Provide and maintain our engineering platform services</li>
                <li>Process and showcase approved projects and tutorials</li>
                <li>Communicate with you about your account and submissions</li>
                <li>Improve our platform and user experience</li>
                <li>Ensure platform security and prevent abuse</li>
              </ul>

              <h2>3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul>
                <li>With your consent or at your direction</li>
                <li>For legal compliance or to protect our rights</li>
                <li>In anonymized form for research and analytics</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information:
              </p>
              <ul>
                <li>Encrypted data transmission and storage</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication systems</li>
                <li>Secure hosting infrastructure with Supabase</li>
              </ul>

              <h2>5. User Content and Intellectual Property</h2>
              <p>
                Regarding content you submit to Daedale:
              </p>
              <ul>
                <li>You retain ownership of your original content</li>
                <li>By submitting, you grant us a license to display and share your content on our platform</li>
                <li>We respect intellectual property rights and expect users to do the same</li>
                <li>Approved projects and tutorials become publicly visible on our platform</li>
              </ul>

              <h2>6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul>
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze platform usage and performance</li>
              </ul>

              <h2>7. Your Rights and Choices</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access, update, or delete your personal information</li>
                <li>Control the visibility of your submitted content</li>
                <li>Opt out of non-essential communications</li>
                <li>Request data portability where applicable</li>
              </ul>

              <h2>8. Data Retention</h2>
              <p>
                We retain your information only as long as necessary to provide our services and comply with legal obligations. Approved content may remain on the platform to maintain the integrity of our engineering community.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes and update the effective date below.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us through our contact page or email us directly.
              </p>

              <p className="text-sm text-muted-foreground mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;