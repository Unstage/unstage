import { Body, Container, Heading, Link, Preview, Text } from "@react-email/components";
import { Footer } from "../components/footer";
import { Logo } from "../components/logo";
import { OtpCode } from "../components/otp-code";
import {
  EmailThemeProvider,
  getEmailInlineStyles,
  getEmailThemeClasses,
} from "../components/theme";

interface Props {
  otp: string;
}

export const EmailOtp = ({ otp = "123456" }: Props) => {
  const text = `Your Unstage verification code is ${otp}.`;
  const themeClasses = getEmailThemeClasses();
  const lightStyles = getEmailInlineStyles("light");

  return (
    <EmailThemeProvider preview={<Preview>{text}</Preview>}>
      <Body className={`my-auto mx-auto font-sans ${themeClasses.body}`} style={lightStyles.body}>
        <Container
          className={`my-[40px] mx-auto p-[20px] max-w-[600px] ${themeClasses.container}`}
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: lightStyles.container.borderColor,
          }}
        >
          <Logo />
          <Heading
            className={`text-[28px] font-normal text-center p-0 my-[20px] mx-0 ${themeClasses.heading}`}
            style={{
              color: lightStyles.text.color,
              fontFamily: "Space Grotesk, Helvetica, Arial, sans-serif",
            }}
          >
            Sign in to Unstage
          </Heading>

          <Text className={`font-light text-center`} style={{ color: lightStyles.mutedText.color }}>
            Use the following code to finish signing in to Unstage:
          </Text>

          <OtpCode otp={otp} />

          <Text
            className={`font-light text-center text-xs mt-[50px]`}
            style={{ color: lightStyles.mutedText.color }}
          >
            If you didn't request this, you can contact us at{" "}
            <Link href="mailto:support@unstage.dev">support@unstage.dev</Link>
          </Text>

          <Footer />
        </Container>
      </Body>
    </EmailThemeProvider>
  );
};

export default EmailOtp;
