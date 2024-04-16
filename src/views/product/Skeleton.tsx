import { ProductType } from "@/types/products.type";

function ProductViewSkeleton(props: { products: ProductType[] }) {
  const { products } = props;
  return (
    <div className="flex px-5">
      {products.map((product: ProductType, index) => (
        <div key={index} className="w-1/4 p-5 bg-slate-200">
          {/* Skeleton content */}
          <div className="w-full h-40 bg-gray-300 mt-3 animate-pulse" />
          <div className="h-6 bg-gray-300 mt-1 animate-pulse" />
          <div className="h-6 bg-gray-300 mt-1 animate-pulse" />
          <div className="h-6 bg-gray-300 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default ProductViewSkeleton;
