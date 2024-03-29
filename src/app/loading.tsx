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
      <section className="flex w-full flex-col justify-end bg-slate-200 py-32 pb-10 dark:bg-[#111e29] sm:pb-32 lg:pb-[110px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center justify-between px-6 lg:flex-row">
          <div className="w-full lg:max-w-[530px]">
            <div className="my-4 h-12 w-60 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="my-4 h-8 w-64 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            {Array.from({ length: 11 }).map((_, index) => (
              <div
                key={index}
                className="my-4 h-4 w-full animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50"
              />
            ))}
            <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-8 w-16 animate-pulse cursor-progress items-center gap-4 rounded-lg bg-slate-500/50 px-3 py-1 dark:bg-slate-950/50"
                />
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-5 lg:mt-10">
              <div className="flex h-12 w-44 cursor-progress items-center justify-center gap-2 rounded-lg bg-slate-500/50 px-4 py-3 dark:bg-slate-950/50" />
              <div className="flex h-20 items-center gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="origin-center">
            <div className="mb-6 h-[404px] w-[420px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 object-cover shadow-2xl dark:bg-slate-950/50 lg:mb-0 lg:h-[404px] lg:w-[420px]" />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
        <div className="flex flex-col gap-4">
          <div className="h-8 w-48 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          <div className="h-12 w-64 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
        </div>
        <div className="mt-[60px] grid w-full grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <div className="flex animate-pulse flex-col gap-2 rounded-lg bg-gray-400/20 p-6 dark:bg-gray-600/20">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-16 cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                  <div className="h-4 w-4 cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                </div>
                <div className="h-8 w-full cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16">
        <div className="flex flex-col gap-4">
          <div className="h-8 w-48 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          <div className="h-12 w-64 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
        </div>
        <div className="my-8 mb-16 w-full border-b border-b-gray-300 dark:border-b-gray-800" />
        <div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                <div className="h-[200px] w-full sm:h-[300px] lg:min-h-full lg:w-[420px]">
                  <div className="h-[304px] w-[420px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                </div>
                <div className="flex-1 lg:py-[18px]">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                    <div className="h-8 w-56 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                  </div>
                  <div className="my-6 flex flex-col items-center gap-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-4 w-full animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50"
                      />
                    ))}
                  </div>
                  <div className="my-6 flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex h-8 w-16 animate-pulse cursor-progress items-center gap-4 rounded-lg bg-slate-500/50 px-3 py-1 dark:bg-slate-950/50"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-20 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                    <div className="h-6 w-6 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                  </div>
                </div>
              </div>
              <div className="my-8 mb-16 w-full border-b border-b-gray-300 dark:border-b-gray-800" />
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="h-7 w-24 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="h-6 w-16 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="h-6 w-6 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          </div>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-16 md:flex-row md:gap-4 lg:gap-16">
        <div className="max-w-[420px]">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-32 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="h-12 w-72 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          </div>
          <div className="mt-6 h-12 w-[420px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[40px,1fr] gap-4 md:gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border border-gray-900 p-0.5 dark:border-gray-500">
                <div className="h-10 w-10 rounded-full" />
              </div>
              <div className="h-full w-[1px] bg-gray-400 dark:bg-gray-800" />
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="h-8 w-16 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-8 w-32 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-8 w-72 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-44 w-96 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-16 md:flex-row md:gap-4 lg:gap-16">
        <div className="max-w-[420px]">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-20 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
            <div className="h-12 w-64 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
          </div>
          <div className="mt-6 h-12 w-[420px] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[40px,1fr] gap-4 md:gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border border-gray-900 p-0.5 dark:border-gray-500">
                <div className="h-10 w-10 rounded-full" />
              </div>
              <div className="h-full w-[1px] bg-gray-400 dark:bg-gray-800" />
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="h-8 w-56 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-8 w-[30vw] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-8 w-72 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[40px,1fr] gap-4 md:gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border border-gray-900 p-0.5 dark:border-gray-500">
                <div className="h-10 w-10 rounded-full" />
              </div>
              <div className="h-full w-[1px] bg-gray-400 dark:bg-gray-800" />
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="h-8 w-72 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-8 w-[40vw] animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
                <div className="h-8 w-64 animate-pulse cursor-progress rounded-lg bg-slate-500/50 dark:bg-slate-950/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
