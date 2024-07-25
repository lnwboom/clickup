import * as React from "react";

function DashboardInfo() {
  return (
    <div className="flex flex-col">
      <div className="flex-wrap content-start w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center font-semibold max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col pt-3.5 pr-20 pb-14 pl-3.5 bg-white rounded-xl border border-solid border-stone-500 max-md:pr-5 max-md:max-w-full">
                <div className="self-start text-base text-zinc-800">
                  Unassigned
                </div>
                <div className="mt-14 text-4xl text-center text-black max-md:mt-10">
                  4<br />
                  <span className="text-sm font-[275]">tasks in progress</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-2 w-full font-semibold bg-white rounded-xl border border-solid border-stone-500 max-md:mt-6 max-md:max-w-full">
              <div className="text-base text-zinc-800 max-md:max-w-full">
                Completed
              </div>
              <div className="mt-14 text-4xl text-center text-black max-md:mt-10">
                1<br />
                <span className="text-sm font-[275]">tasks completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-wrap content-start mt-7 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center text-base max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col items-center pt-3.5 pr-20 pb-12 pl-3.5 bg-white rounded-xl border border-solid border-stone-500 max-md:pr-5 max-md:max-w-full">
                <div className="self-start font-semibold text-zinc-800 max-md:max-w-full">
                  Total Tasks by Assignee
                </div>
                <div className="flex flex-col justify-center items-center mt-10 font-medium whitespace-nowrap bg-fuchsia-300 rounded-full aspect-square w-[330px] max-md:mt-10">
                  <div className="flex overflow-hidden relative flex-col px-20 py-20 rounded-full border border-white border-solid aspect-square max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/472b0f122ae113dd313bfa50907fdf00cb96fdb67cf2b31906a646431c6cc897?"
                      className="object-cover absolute inset-0 size-full"
                    />
                    <div className="relative self-end text-white border border-solid border-zinc-500 max-md:mr-2.5">
                      20%
                    </div>
                    <div className="relative mt-28 mr-3.5 mb-3.5 ml-3 text-rose-50 border border-solid border-zinc-500 max-md:mx-2.5 max-md:mt-10">
                      80%
                    </div>
                  </div>
                </div>
                <div className="flex gap-2.5 mt-9 text-xs text-neutral-700">
                  <div className="flex flex-1 gap-2.5 whitespace-nowrap">
                    <div className="shrink-0 w-5 h-5 bg-fuchsia-400 rounded-sm" />
                    <div className="my-auto">Unassigned</div>
                  </div>
                  <div className="flex flex-1 gap-2.5">
                    <div className="shrink-0 w-5 h-5 bg-fuchsia-300 rounded-sm" />
                    <div className="my-auto">Assignee </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col pt-3.5 pr-11 pb-12 pl-3.5 bg-white rounded-xl border border-solid border-stone-500 max-md:pr-5 max-md:max-w-full">
                <div className="text-base font-semibold text-zinc-800 max-md:max-w-full">
                  My Work
                </div>
                <div className="self-start mt-11 ml-7 text-sm text-gray-500 max-md:mt-10 max-md:ml-2.5">
                  Tasks
                </div>
                <div className="flex gap-3 self-end mt-5 max-w-full w-[475px] max-md:flex-wrap">
                  <div className="flex flex-col self-start text-base whitespace-nowrap text-neutral-400">
                    <div>3</div>
                    <div className="mt-24 max-md:mt-10">2</div>
                    <div className="mt-24 max-md:mt-10">1</div>
                    <div className="mt-24 max-md:mt-10">0</div>
                  </div>
                  <div className="flex flex-col grow shrink-0 mt-1.5 basis-0 w-fit max-md:max-w-full">
                    <div className="max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                          <div className="shrink-0 mx-auto bg-white border border-solid border-neutral-100 h-[109px] w-[229px]" />
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                          <div className="shrink-0 mx-auto bg-white border border-solid border-neutral-100 h-[109px] w-[228px]" />
                        </div>
                      </div>
                    </div>
                    <div className="max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow">
                            <div className="shrink-0 bg-white border border-solid border-neutral-100 h-[109px]" />
                            <div className="flex flex-col justify-center px-14 bg-white border border-solid border-neutral-100 max-md:px-5">
                              <div className="shrink-0 bg-fuchsia-300 h-[109px]" />
                            </div>
                            <div className="self-center mt-3 text-xs text-neutral-400">
                              [ Assignee ]{" "}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow">
                            <div className="shrink-0 bg-white border border-solid border-neutral-100 h-[109px]" />
                            <div className="flex flex-col justify-center px-14 bg-white border border-solid border-neutral-100 max-md:px-5">
                              <div className="z-10 shrink-0 mt-0 bg-fuchsia-400 h-[218px]" />
                            </div>
                            <div className="self-center mt-3 text-xs text-neutral-400">
                              [ Unassigned ]
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo