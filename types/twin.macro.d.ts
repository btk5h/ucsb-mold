declare module "twin.macro" {
  import { CreateStyled } from "@emotion/styled";

  type TailwindInterface = (s: TemplateStringsArray, o?: any) => CSSProperties;
  declare const tw: TailwindInterface & CreateStyled;

  export = tw;
}
