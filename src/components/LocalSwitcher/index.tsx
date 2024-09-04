'use client'

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation.js";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [ isPending, startTransition ] = useTransition()
  const router = useRouter()
  const localActive = useLocale()
  
  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  return (
    <select defaultValue={localActive} className="flex justify-center rounded-lg bg-slate-300/50 px-4 py-[0.8rem] transition-colors duration-500 hover:bg-slate-300 dark:bg-slate-800/50 dark:hover:bg-slate-800 font-sans max-w-[13rem]" onChange={onSelectChange}>
      <option className="" value="pt_BR">🇧🇷 Português Brasil</option>
      <option value="en">🇺🇸 English</option>
    </select>
  )
}