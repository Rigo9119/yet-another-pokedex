import { Link } from "@tanstack/react-router";

export interface ErrorCmpProps {
  message?: string;
  displayBtn?: boolean;
}

export default function ErrorCmp({ message, displayBtn }: ErrorCmpProps) {
  return (
    <div>
      {displayBtn && <Link to="/">Go back to home</Link>}
      <p>{message}</p>
    </div>
  );
}
