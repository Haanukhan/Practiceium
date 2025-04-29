interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center text-center">
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Welcome to Auth
      </h1>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
};
