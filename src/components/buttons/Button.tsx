function Button({ children, handleClick = () => {} }: { children: any; handleClick: () => any }) {
  return (
    <button className="cursor-pointer rounded-lg bg-blue-400 px-4 py-2 text-white" onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
