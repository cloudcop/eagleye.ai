import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const CompliancePage = () => {
  const ukPrinciples = [
    "Use of a surveillance camera system must always be for a specified purpose which is in pursuit of a legitimate aim and necessary to meet an identified pressing need.",
    "The use of a surveillance camera system must take into account its effect on individuals and their privacy, with regular reviews to ensure its use remains justified.",
    "There must be as much transparency in the use of a surveillance camera system as possible, including a published contact point for access to information and complaints.",
    "There must be clear responsibility and accountability for all surveillance camera system activities including images and information collected, held and used.",
    "Clear rules, policies and procedures must be in place for images and information collected, held and used, and these must be communicated to all who need to comply with them.",
    "No more images and information should be stored than that which is strictly required for the stated purpose of a surveillance camera system, and such images and information should be deleted once their purposes have been discharged.",
    "Access to retained images and information should be restricted and there must be clearly defined rules on who can gain access and for what purpose such access is granted; the disclosure of images and information should only take place when it is necessary for such a purpose or for law enforcement purposes.",
    "Surveillance camera system operators should consider any approved operational, technical and competency standards relevant to a system and its purpose and work to meet and maintain those standards.",
    "Surveillance camera system images and information should be subject to appropriate security measures to safeguard against unauthorised access and use.",
    "There should be effective review and audit mechanisms to ensure legal requirements, policies and standards are complied with in practice, and regular reports should be published.",
    "When the use of a surveillance camera system is in pursuit of a criminal investigation, it must be operated in a way that is consistent with rules of evidence, and the images and information it captures are not tampered with.",
    "Any information used to support a surveillance camera system which compares against a reference database for matching purposes must be accurate and kept up to date.",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Compliance & Privacy Center</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Eagleye.ai is committed to upholding the highest standards of
              privacy, security, and ethical operation. This center provides
              information on our adherence to key regulations and our own
              policies designed to protect individuals' data and privacy.
            </p>
          </CardContent>
        </Card>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            The information on this page is for informational purposes only and
            does not constitute legal advice. Please consult with a qualified
            legal professional for advice on specific compliance matters.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              UK Surveillance Camera Code of Practice
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <p>
                We operate in accordance with the 12 guiding principles of the
                Surveillance Camera Code of Practice, issued by the Secretary of
                State under Section 30 of the Protection of Freedoms Act 2012.
              </p>
              <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                {ukPrinciples.map((principle, index) => (
                  <li key={index}>{principle}</li>
                ))}
              </ul>
              <a
                href="https://www.gov.uk/government/publications/surveillance-camera-code-of-practice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Read the full code on GOV.UK
              </a>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              GDPR & Data Protection
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <p>
                Our platform is designed with the principles of the General Data
                Protection Regulation (GDPR) at its core. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Lawfulness, Fairness, and Transparency:</strong> All
                  data processing is lawful, fair, and transparent to the data
                  subject.
                </li>
                <li>
                  <strong>Purpose Limitation:</strong> Data is collected for
                  specified, explicit, and legitimate purposes.
                </li>
                <li>
                  <strong>Data Minimisation:</strong> We only process data that
                  is adequate, relevant, and limited to what is necessary.
                </li>
                <li>
                  <strong>Accuracy:</strong> Personal data is kept accurate and
                  up-to-date.
                </li>
                <li>
                  <strong>Storage Limitation:</strong> Data is kept in a form
                  which permits identification of data subjects for no longer
                  than is necessary.
                </li>
                <li>
                  <strong>Integrity and Confidentiality:</strong> We ensure the
                  security of personal data, protecting it against unauthorised
                  or unlawful processing, accidental loss, destruction, or
                  damage.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              Eagleye.ai Portal Privacy Policy (Template)
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <p className="font-bold">Last Updated: [Date]</p>
              <div className="space-y-2 text-muted-foreground">
                <h3 className="font-semibold text-foreground">Introduction</h3>
                <p>
                  This Privacy Policy outlines how Eagleye.ai ("we", "our",
                  "us") collects, uses, and protects your information when you
                  use our surveillance portal.
                </p>
                <h3 className="font-semibold text-foreground">
                  Data We Collect
                </h3>
                <p>
                  We may collect operational data such as user login credentials,
                  IP addresses, activity logs, and system-generated alert data.
                  Video and image data from connected cameras are processed but
                  are the responsibility of the data controller (you, the client).
                </p>
                <h3 className="font-semibold text-foreground">
                  How We Use Your Data
                </h3>
                <p>
                  Data is used to provide, maintain, and improve our services,
                  ensure security, provide customer support, and comply with
                  legal obligations.
                </p>
                <h3 className="font-semibold text-foreground">Data Security</h3>
                <p>
                  We implement robust technical and organizational measures to
                  protect data against unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
                <h3 className="font-semibold text-foreground">Your Rights</h3>
                <p>
                  Under GDPR, you have rights including the right to access,
                  rectify, or erase your personal data, and the right to restrict
                  processing. Please contact your system administrator to exercise
                  these rights.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CompliancePage;