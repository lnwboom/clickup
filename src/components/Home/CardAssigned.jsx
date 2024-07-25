import * as React from "react";

function CardAssigned() {
  return (
    <div className="flex flex-col px-3.5 py-3.5 bg-white rounded-xl border border-solid border-stone-300 max-md:pr-5 h-full">
      <div className="self-start text-base font-semibold text-zinc-800 max-md:max-w-full">
        Assigned comments
      </div>
      <div className="flex flex-col items-center py-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b1ea4e7c5990c79532c0ce93b81933e06cacf825b98bdd78ba75a6f1e2556c9?"
          className="aspect-[1.32] w-[54px] max-md:mt-10"
        />
        <div className="mt-1.5 text-xs text-neutral-700">No Comment</div>
      </div>
    </div>
  );
}

export default CardAssigned;
