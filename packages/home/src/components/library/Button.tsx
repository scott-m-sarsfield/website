import React from 'react';

const Button = ({
  onClick,
  className,
  children,
}: React.PropsWithChildren<{ onClick: () => void; className?: string }>) => (
  <button {...{ onClick, className }}>{children}</button>
);

export default Button;
