import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "../icons"
import { Rating } from "../ui/rating"
import Link from "next/link"
import { gql, DocumentType } from "@/gql"
import { keytoUrl } from "@/lib/s3/s3"

type ProductCard = {
  id: string
  image: {
    src: string
    alt: string
  }
  name: string
  description: string
  price: number
}

type CardProps = React.ComponentProps<typeof Card>

type ProductCardProps = CardProps & {
  product: DocumentType<typeof ProductCardFragment>
}

const ProductCardFragment = gql(/* GraphQL */ `
  fragment ProductCardFragment on products {
    id
    name
    description
    rating
    images
    featuredImage: medias {
      id
      key
      alt
    }
    sku: product_skusCollection {
      edges {
        node {
          sku
          price
          inventory
        }
      }
    }
    collections {
      id
      label
      slug
    }
  }
`)

export function ProductCard({
  className,
  product,
  ...props
}: ProductCardProps) {
  const { id, name, featuredImage } = product
  return (
    <Card className={cn("w-full border-0 rounded-lg", className)} {...props}>
      <CardContent className="relative">
        <Link href={`/products/${id}`}>
          <Image
            src={keytoUrl(featuredImage.key)}
            alt={featuredImage.alt}
            width={280}
            height={280}
            className="aspect-[1/1] object-cover object-center"
          />
        </Link>
      </CardContent>
      <CardHeader>
        <CardTitle>
          <Link href={`/products/${id}`}>{name}</Link>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <div>$382.00</div>
        <Rating value={product.rating} precision={0.5} readOnly />
      </CardHeader>
      <CardFooter className="gap-x-5">
        <Button className="rounded-full p-0 h-8 w-8">
          <Icons.basket className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="rounded-full p-0 h-8 w-8">
          <Icons.heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
