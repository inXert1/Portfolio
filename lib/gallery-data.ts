export type GalleryPhoto = {
  src: string
  alt: string
  width: number
  height: number
}

export type GalleryCategory = {
  id: string
  label: string
  photos: GalleryPhoto[]
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: "maris-joefren",
    label: "Maris Joefren",
    photos: [
      {
        src: "/gallery/maris-joefren/MJ-sample1.webp",
        alt: "Maris Joefren beauty campaign — duo portrait",
        width: 1080,
        height: 1350,
      },
      {
        src: "/gallery/maris-joefren/MJ-sample2.webp",
        alt: "Maris Joefren triangle powder puff product shot",
        width: 800,
        height: 1200,
      },
      {
        src: "/gallery/maris-joefren/MJ-sample3.webp",
        alt: "Maris Joefren artistry brush collection",
        width: 800,
        height: 1200,
      },
      {
        src: "/gallery/maris-joefren/MJ-sample4.webp",
        alt: "Maris Joefren light as air campaign",
        width: 1080,
        height: 1080,
      },
      {
        src: "/gallery/maris-joefren/MJ-sample5.webp",
        alt: "Maris Joefren bridal lashes product",
        width: 1080,
        height: 1080,
      },
    ],
  },
  {
    id: "kneatwear",
    label: "KNEAT",
    photos: [
      {
        src: "/gallery/kneatwear/kneat1.png",
        alt: "KNEAT homepage — warmth and comfort hero",
        width: 1920,
        height: 900,
      },
      {
        src: "/gallery/kneatwear/kneat2.png",
        alt: "KNEAT interactive lookbook — urban minimalist",
        width: 1920,
        height: 900,
      },
      {
        src: "/gallery/kneatwear/kneat3.png",
        alt: "KNEAT journal — stories in every stitch",
        width: 1920,
        height: 900,
      },
      {
        src: "/gallery/kneatwear/kneat4.png",
        alt: "KNEAT about — weaving coziness since 2022",
        width: 1920,
        height: 900,
      },
    ],
  },
]

export function getAllPhotos(): (GalleryPhoto & { categoryId: string })[] {
  return galleryCategories.flatMap((cat) =>
    cat.photos.map((photo) => ({ ...photo, categoryId: cat.id }))
  )
}
