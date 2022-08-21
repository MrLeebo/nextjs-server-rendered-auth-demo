import { memo } from "react";
import Image from "next/image";
import type { Set } from "integrations/lego";

function LegoSetCard({ set, priority }: { set: Set; priority: boolean }) {
  return (
    <div className="max-w-lg bg-blue-100 border border-solid border-blue-100 shadow p-4 rounded">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <Image
            src={
              set.set_img_url ??
              "https://cdn.rebrickable.com/media/thumbs/nil_mf.jpg/100x100p.jpg"
            }
            className="rounded-full bg-gray-400 border border-solid border-white shadow-inner"
            alt=""
            width={100}
            height={100}
            priority={priority}
          />
          <div className="flex flex-col flex-wrap">
            <span>{set.name}</span>
            <span className="text-xs opacity-50">{set.set_num}</span>
          </div>
        </div>
        <div>Parts: {set.num_parts}</div>
        <div>{new Date(set.last_modified_dt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

export default memo(LegoSetCard);
