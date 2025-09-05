import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <div className="bg-olive flex h-full w-full items-center justify-center">
      <LoaderCircle className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default Loading;
