import Female from "@/public/images/female.png";
import TShirtCart from "./t-shirt-cart";

const TShirts = [
  {
    id: 1,
    title: "Unisex Heavy Cotton Tee",
    brand: "By Gildan *500",
    price: 8.61,
    sizes: 8,
    colors: 70,
    printProviders: 22,
    rating: 4.8,
    reviews: 2156,
    imageUrl: Female,
    isNew: true,
  },
  {
    id: 2,
    title: "Unisex Heavy Cotton Tee",
    brand: "By Gildan *500",
    price: 8.61,
    sizes: 8,
    colors: 70,
    printProviders: 22,
    rating: 5.0,
    reviews: 1890,
    imageUrl: Female,
    isNew: true,
  },
  {
    id: 3,
    title: "Unisex Heavy Cotton Tee",
    brand: "By Gildan *500",
    price: 8.61,
    sizes: 8,
    colors: 70,
    printProviders: 22,
    rating: 4.9,
    reviews: 3421,
    imageUrl: Female,
  },
  {
    id: 4,
    title: "Unisex Heavy Cotton Tee",
    brand: "By Gildan *500",
    price: 8.61,
    sizes: 8,
    colors: 70,
    printProviders: 22,
    rating: 4.7,
    reviews: 2156,
    imageUrl: Female,
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {TShirts.map((product, index) => (
        <TShirtCart key={index} {...product} />
      ))}
    </div>
  );
}
