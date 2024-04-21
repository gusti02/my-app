import { ProductType } from "@/types/products.type";
import Image from "next/image";
function DetailProduct({ product }: { product: ProductType }) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/4 p-5">
        <h1 className="text-center font-bold text-2xl">{product.name}</h1>
        <div className="">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>
        <h4 className="font-bold text-lg">{product.name}</h4>
        <p className="text-gray-500 text-lg">{product.category}</p>
        <p className="font-bold text-lg mt-2">
          {product.price &&
            product.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
        </p>
      </div>
    </div>
  );
}

export default DetailProduct;
