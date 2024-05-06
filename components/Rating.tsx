import Image from "next/image";
import ratingimg from "../public/images/star-icon.png";

export default function Rating({ rating }: { rating: any }) {
  rating = JSON.parse(rating);
  console.log(rating);
  return (
    <>
      <div className="flex">
        {Array(4)
          .fill(1)
          .map((i) => {
            return (
              <>
                <Image src={ratingimg} width={20} height={20} alt="rating" />
              </>
            );
          })}
        <h1 className="text-[#007185] ml-2 font-medium">
          {rating.count} ratings
        </h1>
      </div>
    </>
  );
}
