declare module "tailwind.macro" {
  import { CSSProperties, StyledInterface } from "styled-components"

  type TailwindInterface = (s: TemplateStringsArray, o?: any) => any
  declare const tw: TailwindInterface & StyledInterface

  export = tw
}
