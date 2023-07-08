export default function Loading() {
  return (
    <>
      <header className="absolute top-0 z-10 flex h-24 w-full items-center justify-center bg-slate-200 dark:bg-[#111e29]">
        <div className="mx-auto hidden w-full max-w-[1200px] items-center justify-between px-6 lg:flex">
          <div className="h-[58px] w-[58px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          <div className="flex items-center gap-10">
            <nav className="flex w-48 items-center gap-4 sm:gap-10">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-10 w-full animate-pulse cursor-progress items-center gap-2 rounded-lg bg-slate-500/50 pl-4 dark:bg-slate-950/50"
                />
              ))}
            </nav>
            <div className="flex max-w-[8rem] animate-pulse cursor-progress justify-center rounded-lg border-none bg-slate-500/50 px-12 py-6 dark:bg-slate-950/50" />
          </div>
        </div>
        <div className="flex w-full items-center justify-between lg:hidden">
          <div className="flex w-full items-center justify-between px-6">
            <div className="h-[58px] w-[58px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <button className="flex w-10 cursor-progress flex-col gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-full animate-pulse bg-slate-500/50 dark:bg-slate-950/50"
                />
              ))}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
