import { Star } from "lucide-react";

interface TShirtInfoProps {
  title: string;
  brand: string;
  rating: number;
  reviews: number;
  price: number;
}

export function TShirtInfo({
  title,
  brand,
  rating,
  reviews,
  price,
}: TShirtInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground">{brand}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
        </div>
        <span className="text-muted-foreground">({reviews} reviews)</span>
      </div>

      {/* <div className="text-3xl font-bold">${price.toFixed(2)}</div> */}
    </div>
  );
}
