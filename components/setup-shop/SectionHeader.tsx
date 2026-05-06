type Props = {
  title: string;
  description?: string;
};

export default function SectionHeading({ title, description }: Props) {
  return (
    <div className="text-[14px] leading-[100%]">
      <p className="font-medium text-[#111111] uppercase">{title}</p>

      {description && <p className="text-[#777777] mt-1">{description}</p>}
    </div>
  );
}
