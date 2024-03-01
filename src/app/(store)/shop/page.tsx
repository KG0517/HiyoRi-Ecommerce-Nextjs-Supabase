import { listCollectionsAction } from "@/_actions/collections"
import Header from "@/components/Header"
import { Shell } from "@/components/layouts/Shell"
import { Skeleton } from "@/components/ui/skeleton"
import {
  FilterSelections,
  SearchProductsGridSkeleton,
  SearchProductsInifiteScroll,
} from "@/features/products"
import { Suspense } from "react"

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

async function ProductsPage({}: ProductsPageProps) {
  const collectionsData = await listCollectionsAction()

  return (
    <Shell>
      <Header heading="Shop Now" />

      <Suspense
        fallback={
          <div>
            <Skeleton className="max-w-xl h-8 mb-3" />
            <Skeleton className="max-w-2xl h-8" />
          </div>
        }
      >
        <FilterSelections collectionsSection={collectionsData} />
      </Suspense>

      <Suspense fallback={<SearchProductsGridSkeleton />}>
        <SearchProductsInifiteScroll />
      </Suspense>
    </Shell>
  )
}

export default ProductsPage
