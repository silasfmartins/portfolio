interface ButtonProps {
  children: any;
  className: string;
  onClick: any;
}

export default function Button({children, className, onClick}:ButtonProps) {
  return (
    <>
      <button className={`p-2 rounded-md hover:ring-2 ring-2 ${className}`} onClick={onClick}>
        {children}     
      </button>
    </>
  )
}