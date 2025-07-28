import { Img, Section } from "@react-email/components";
import { getEmailUrl } from "@unstage/utils/envs";

const baseUrl = getEmailUrl();

export function Logo() {
  // CSS-blended version for automatic dark mode adaptation
  return (
    <Section className="mt-[32px]">
      <style>{`
          .logo-blend {
            filter: none;
          }
          
          /* Regular dark mode - exclude Outlook.com and disable-dark-mode class */
          @media (prefers-color-scheme: dark) {
            .logo-blend:not([class^="x_"]):not(.disable-dark-mode .logo-blend) {
              filter: invert(1) brightness(1);
            }
          }
          
          /* Outlook.com specific dark mode targeting - but not when dark mode is disabled */
          [data-ogsb]:not(.disable-dark-mode) .logo-blend,
          [data-ogsc]:not(.disable-dark-mode) .logo-blend,
          [data-ogac]:not(.disable-dark-mode) .logo-blend,
          [data-ogab]:not(.disable-dark-mode) .logo-blend {
            filter: invert(1) brightness(1);
          }
          
          /* Force no filter when dark mode is disabled */
          .disable-dark-mode .logo-blend {
            filter: none !important;
          }
        `}</style>

      <Img
        src={`${baseUrl}/email/logo.png`}
        width="48"
        height="48"
        alt="Unstage"
        className="my-0 mx-auto block logo-blend"
      />
    </Section>
  );
}
