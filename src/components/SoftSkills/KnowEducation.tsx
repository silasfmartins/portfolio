import Image from "next/image";

export function SoftSkills() {
  return (
    <div className="flex gap-8 rounded-lg bg-gray-600/20 p-6 text-gray-900 transition-all hover:bg-gray-400/30 hover:text-emerald-900 dark:text-gray-500 dark:hover:bg-gray-600/30 dark:hover:text-emerald-500">
      <div className="flex flex-col">
        <h1 className="font-bold font-sans text-black text-sm lg:text-lg dark:text-white" />
        <span className="font-sans text-sm lg:text-base" />
        <span className="font-sans" />
      </div>
      <Image
        alt="{education.imageAlt}"
        className="rounded-lg"
        height={84}
        src="{education.image.url}"
        width={84}
      />
    </div>
  );
}
