import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ text, className, onClick }: ButtonProps): JSX.Element {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {text}
    </button>
  );
}
