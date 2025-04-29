interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-nowrap text-3xl font-bold tracking-tight text-black">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
export default Heading;
