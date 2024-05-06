import Image from "next/image";
import Rating from "./Rating";
import AddToCardConatainer from "./AddToCardConatainer";

export default function SingleProduct({
  singleProduct,
}: {
  singleProduct: any;
}) {
  return (
    <>
      |
      <div className="w-[80%] mx-auto mt-10">
        <div>
          <div>
            {singleProduct.map((item: any, index: number) => {
              return (
                <>
                  <div className="flex justify-between" key={index}>
                    <div>
                      <div className="flex">
                        <div className="bg-gray-100 flex items-center">
                          <Image
                            className="mix-blend-multiply p-4"
                            src={item.image}
                            width={300}
                            height={200}
                            alt={item.title}
                          />
                        </div>
                        <div className="mx-4 w-[70%]">
                          <h1 className="font-bold text-lg">{item.title}</h1>
                          <p>{item.description}</p>
                          <Rating rating={item.rating} />
                          <h1 className="font-bold text-2xl">{`$${item.price}`}</h1>
                          <div className="font-bold text-sm">
                            <h1>About this item</h1>
                            <li>
                              SLIM FIT: Slim fit through the shoulders, chest,
                              and waist.
                            </li>
                            <li>
                              LIGHTWEIGHT T-SHIRT JERSEY: Soft and comfortable
                              knit fabric for a go-to lightweight t-shirt.
                            </li>
                            <li>
                              HENLEY T-SHIRT: The perfect alternative to your
                              favorite t shirt. Pair this super soft henley with
                              jeans or chinos for comfortable everyday style.
                            </li>
                            <li>
                              DETAILS: Ribbed neck and sleeve hem trim, raglan
                              sleeve with sturdy overlock stitching, and
                              shirttail hem.
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <AddToCardConatainer product={item} />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
