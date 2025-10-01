function UserIcon({ bgColor = 'bg-accent-100', border = 'border-accent-200' }: { bgColor?: string; border?: string }) {
  return <div className={`${bgColor} ${border} box-content h-5 w-5 rounded-full border-2 not-first:-ml-1`}></div>;
}

export default UserIcon;
