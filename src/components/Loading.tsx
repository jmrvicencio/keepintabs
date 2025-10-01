import Logo from './logo/Logo';

function Loading() {
  return (
    <div className="text-ink-800 bg flex h-dvh w-full items-center justify-center">
      <Logo className="fill-wheat-400 w-16 animate-pulse" />
    </div>
  );
}

export default Loading;
