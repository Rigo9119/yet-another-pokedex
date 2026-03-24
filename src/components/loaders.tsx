export type LoadingVariant = "spinner" | "skeleton";

export interface LoadingProps {
  message?: string;
  variant?: LoadingVariant;
}

export const SpinnerComponent = () => (
  <div className="animate-spin rounded-full overflow-hidden w-10 h-10 relative border-black border">
    <div className="h-1/2 bg-red-600 border-b border-b-slate-950" />
    <div
      className="borde-slate-950 bg-white border rounded-full overflow-hidden w-2 h-2 absolute top-1/2
      left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <div className="h-1/2 bg-white" />
  </div>
);

export const SkeletonComponent = () => (
  <div className="flex flex-col gap-2 bg-white border border-transparent rounded-md md:w-1/6">
    <div className="animate-pulse flex justify-center content-center bg-neutral-300 border border-transparent rounded-md h-56"></div>
    <div className="animate-pulse flex justify-center content-center border border-transparent rounded-md  bg-red-400 h-6"></div>
  </div>
);

export default function LoadingCmp({ message, variant }: LoadingProps) {
  switch (variant) {
    case "spinner":
      return <SpinnerComponent />;
    case "skeleton":
      return <SkeletonComponent />;
    default:
      return (
        <div className="flex w-full items-center justify-center">
          <p className="text-amber-300">{message}</p>
        </div>
      );
  }
}
