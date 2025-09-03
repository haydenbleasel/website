import clsx from "clsx";

type ContainerOuterProps = React.ComponentPropsWithoutRef<"div">;

export const ContainerOuter = ({
  className,
  children,
  ...props
}: ContainerOuterProps) => (
  <div className={clsx("sm:px-8", className)} {...props}>
    <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
  </div>
);

type ContainerInnerProps = React.ComponentPropsWithoutRef<"div">;

export const ContainerInner = ({
  className,
  children,
  ...props
}: ContainerInnerProps) => (
  <div className={clsx("relative px-4 sm:px-8 lg:px-12", className)} {...props}>
    <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
  </div>
);

type ContainerProps = React.ComponentPropsWithoutRef<typeof ContainerOuter>;

export const Container = ({ children, ...props }: ContainerProps) => (
  <ContainerOuter {...props}>
    <ContainerInner>{children}</ContainerInner>
  </ContainerOuter>
);
