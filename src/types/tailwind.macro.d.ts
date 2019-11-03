declare module "tailwind.macro" {
  import { CSSProperties, StyledInterface } from "styled-components"

  type TailwindInterface = (s: TemplateStringsArray, o: any) => CSSProperties
  declare const tw: StyledInterface & TailwindInterface

  export = tw
}
