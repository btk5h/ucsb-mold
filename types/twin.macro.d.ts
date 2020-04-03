declare module "twin.macro" {
  import { CSSObject, CreateStyled } from "@emotion/styled";

  type TailwindInterface = (s: TemplateStringsArray, o?: any) => CSSObject;
  declare const tw: TailwindInterface & CreateStyled;

  export = tw;
}
