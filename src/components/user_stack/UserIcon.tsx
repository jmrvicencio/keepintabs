function UserIcon({
  bgColor = 'bg-accent-100',
  border = 'border-accent-200',
  imageUrl,
}: {
  bgColor?: string;
  border?: string;
  imageUrl?: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
      className={`${bgColor} ${border} box-content h-5 w-5 rounded-full border-2 bg-cover not-first:-ml-1`}
    ></div>
  );
}

export default UserIcon;
