import * as React from "react";

function CardAiStandup() {
  return (
    <div className="flex flex-col justify-center w-full bg-white rounded-xl border border-solid border-stone-300 h-full">
      <div className="flex flex-col px-3.5 py-4 w-full">
        <div className="text-base font-semibold text-zinc-800 max-md:max-w-full">
          AI StandUp
        </div>
        <div className="pt-2.5 pb-28 pr-6 pl-2 mt-4 text-sm bg-white rounded-xl border border-solid border-stone-300 text-neutral-400 max-md:max-w-full">
          No updates in the last 7 days.
        </div>
      </div>
    </div>
  );
}
export default CardAiStandup ;
