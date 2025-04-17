import * as React from "react";
import {
  Html,
  Head,
  Body,
  Text,
  Section,
  Row,
  Font,
  Preview,
  Heading,
  Button,
} from "@react-email/components";

interface EmailProps {
  username: string;
  otp: string;
}

const VerificationEmail: React.FC<Readonly<EmailProps>> = ({
  username,
  otp,
}) => (
  <Html lang="en" dir="ltr">
    <Head>
      <title>Verification Code for KAITON FEEDBACK</title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>
      Here&apos;s your Verification code for Kaiton feedback community: {otp}
    </Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username}</Heading>
      </Row>
      <Row>
        <Text>
          Thank you for registering for Kaiton feedback community. Please use
          the following Verification Code to complete your registration:
        </Text>
      </Row>
      <Row>
        <Heading>{otp}</Heading>
      </Row>
      <Row>
        <Text>
          If you didn&apos;t request this code. Please ignore this email.
        </Text>
      </Row>
    </Section>
  </Html>
);
export default VerificationEmail;
