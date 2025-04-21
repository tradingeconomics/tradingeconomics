type headerProp = {
  title: string;
};
const SectionHeader = ({ title }: headerProp) => {
  return <h1 className="font-bold text-3xl">{title}</h1>;
};

export default SectionHeader;
