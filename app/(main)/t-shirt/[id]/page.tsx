// import { TShirtActions } from "@/components/t-shirt/t-shirt-action";
import { TShirttDetails } from "@/components/t-shirt/t-shirt-detail";
import { TShirtImageGallery } from "@/components/t-shirt/t-shirt-gallery";
import { TShirtInfo } from "@/components/t-shirt/t-shirt-info";
import TShirtSlider from "@/components/t-shirt/t-shirt-slider";
import { Button } from "@/components/ui/button";
import Female from "@/public/images/male.png";
import Link from "next/link";

// This would normally come from a database or API
const TShirt = {
  id: 1,
  title: "Unisex Heavy Cotton Tee",
  brand: "By Gildan *500",
  price: 8.61,
  sizes: ["S", "M", "L", "XL", "2XL"],
  colors: 70,
  printProviders: 22,
  rating: 4.8,
  reviews: 2156,
  description:
    "This classic unisex jersey short sleeve tee fits like a well-loved favorite. Soft cotton and quality print make users fall in love with it over and over again. These t-shirts have-ribbed knit collars to bolster shaping. The shoulders have taping for better fit over time. Dual side seams hold the garment's shape for longer.",
  features: [
    "Solid colors are 100% cotton",
    "Heather colors are 50% cotton, 50% polyester",
    "Fabric weight: 5.0–5.3 oz/yd² (170-180 g/m²)",
    "Preshrunk jersey knit",
    "Seamless double-needle 7⁄8″ (2.2 cm) collar",
    "Taped neck and shoulders",
    "Double-needle sleeve and bottom hems",
    "Quarter-turned to avoid crease down the center",
  ],
  images: [Female, Female, Female, Female, Female],
  isNew: true,
};

export default function TShirtDetailPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TShirtImageGallery
          images={TShirt.images}
          title={TShirt.title}
          isNew={TShirt.isNew}
        />
        <div className="space-y-6">
          <TShirtInfo
            title={TShirt.title}
            brand={TShirt.brand}
            rating={TShirt.rating}
            reviews={TShirt.reviews}
            price={TShirt.price}
          />
          {/* <TShirtSpecs
            sizes={TShirt.sizes}
            colors={TShirt.colors}
            printProviders={TShirt.printProviders}
          /> */}
          {/* <TShirtSizeSelector sizes={TShirt.sizes} /> */}
          {/* <TShirtActions /> */}
          <TShirttDetails
            description={TShirt.description}
            features={TShirt.features}
          />
          <Button>
            <Link href="/my-order">
              <span>To do design</span>
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-semibold text-muted-foreground">
          Recommend for you
        </h1>
        <div className="px-4">
          <TShirtSlider />
        </div>
      </section>
    </div>
  );
}
