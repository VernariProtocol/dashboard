import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Norse';
        font-style: normal;
        font-weight: normal;
        src: url('/Norse.otf') format('opentype');
      }
      @font-face {
        font-family: 'Norsebold';
        font-style: normal;
        font-weight: normal;
        src: url('/Norsebold.otf') format('opentype');
      }
    `}
  />
);

export default Fonts;
