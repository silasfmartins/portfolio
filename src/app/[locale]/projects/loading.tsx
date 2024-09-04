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
      <main>
        <section className="flex h-[450px] w-full flex-col items-center justify-center bg-slate-200 px-2 dark:bg-[#111e29] lg:h-[630px]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-28 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="h-16 w-72 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          </div>
          <div className="flex flex-col items-center">
            <div className="my-6 h-24 w-[640px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
              <div className="h-6 w-16 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            </div>
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-x-4 gap-y-6 px-6 py-32 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
          <div className="flex h-[436px] animate-pulse cursor-progress flex-col overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-300 bg-slate-500/50 opacity-70 transition-all hover:border-emerald-900 hover:opacity-100 dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-950/50 dark:hover:border-emerald-500">
            <div className="h-48 w-full overflow-hidden">
              <div className="h-[200px] w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full">
                <div className="h-4 w-28 animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-2 w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
              <div className="mt-auto block w-full">
                <div className="h-full w-full animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
