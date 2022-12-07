interface SubtitleProps {
  text: string;
}

export default function Subtitle(props: SubtitleProps) {
  return (
    <>
      <h2 className="font-merriweather font-bold text-xl text-[#837E9F]">{props.text}</h2>
    </>
  )
}