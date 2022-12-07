interface TechnologiesProps {
  text: string;
}

export default function Technologies(props:TechnologiesProps) {
  return (
    <>
      <div className="w-[86px] h-6 rounded-[30px] text-[#000] bg-[#CB92B1] flex justify-center items-center text-center">
        <span className="font-merriweather font-bold text-[10px]">{props.text}</span>
      </div>
    </>
  )
}