export interface LoadingProps {
  message?: string;
}

export default function LoadingCmp({ message }: LoadingProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <p className="text-amber-300">{message}</p>
    </div>
  );
}
