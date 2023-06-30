import Image from 'next/image'

export function SoftSkills() {
  return (
    <div className="flex gap-8 rounded-lg bg-gray-600/20 p-6 text-gray-900  transition-all hover:bg-gray-400/30 hover:text-emerald-900 dark:text-gray-500 dark:hover:bg-gray-600/30 dark:hover:text-emerald-500">
      <div className="flex flex-col">
        <h1 className="font-sans text-sm font-bold text-black dark:text-white lg:text-lg"></h1>
        <span className="font-sans text-sm lg:text-base"></span>
        <span className="font-sans"></span>
      </div>
      <Image
        className="rounded-lg"
        src="{education.image.url}"
        alt="{education.imageAlt}"
        width={84}
        height={84}
      />
    </div>
  )
}
