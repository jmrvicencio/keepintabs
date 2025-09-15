import logo from '/logo-spaced-white.svg';

function Loading() {
  return (
    <div className="bg-olive text-cream flex h-dvh w-dvw items-center justify-center">
      <img src={logo} className="w-16 animate-pulse" />
    </div>
  );
}

export default Loading;
