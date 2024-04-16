import ProductViewSkeleton from "./Skeleton";
import { ProductType } from "@/types/products.type";

function ProductView(props: { products: ProductType[] }) {
  const { products } = props;
  return (
    <div className="w-full px-8">
      <h1 className="text-center font-bold text-2xl">Product</h1>
      <div className="flex px-5">
        {products.length > 0 ? (
          <>
            {products.map((product: ProductType) => (
              <div key={product.id} className="w-1/4 p-5">
                <div className="">
                  <img src={product.image} alt={product.name} />
                </div>
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-gray-500 text-lg">{product.category}</p>
                <p className="font-bold text-lg mt-2">
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            <ProductViewSkeleton products={products} />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductView;