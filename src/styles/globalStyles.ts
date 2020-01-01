import tw from "tailwind.macro"
import { createGlobalStyle } from "styled-components/macro"

import "tailwindcss/dist/base.css"

export default createGlobalStyle`
  body {
    ${tw`
      text-off-black
    `};
  }
`
