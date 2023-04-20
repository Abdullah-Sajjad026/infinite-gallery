import {useMemo, useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import Loading from "../Loading";
import {ResponseImage} from "../../types";
import ImageCard from "./ImageCard";

import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";

export default function Gallery() {
  const [lightboxState, setLightboxState] = useState(false);
  const [lightboxImgIndex, setLighboxImgIndex] = useState(-1);

  const fetchImages = async (
    // pageNo: number
    link: string
  ): Promise<{res: Response; images: ResponseImage[]}> => {
    const res = await fetch(
      // `https://picsum.photos/v2/list?page=${pageNo}&limit=10`
      link
    );
    const images = await res.json();
    return {res, images};
  };

  const {status, data, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({
      pageParam = `https://picsum.photos/v2/list?page=${2}&limit=10`,
    }) => fetchImages(pageParam),
    getNextPageParam: (lastPage) => {
      console.log({lastPage});
      const linkHeader = lastPage.res.headers.get("Link");
      if (!linkHeader) {
        return undefined;
      }
      const links = linkHeader.split(", ");
      const nextLink = links.find((link) => link.includes('rel="next"'));
      if (!nextLink) {
        return undefined;
      }
      const nextLinkUrlMatch = nextLink.match(/<(.+)>/);
      if (!nextLinkUrlMatch) {
        return undefined;
      }
      const nextLinkUrl = nextLinkUrlMatch[1];
      return nextLinkUrl;
      // const urlSearchParams = new URLSearchParams(nextLinkUrl.split("?")[1]);
      // const nextPage = urlSearchParams.get("page");
      // return nextPage;
    },
    select: (response) => response,
  });

  const images = useMemo(
    () =>
      data?.pages.reduce(
        (acc: ResponseImage[], current) => [...acc, ...current.images],
        []
      ),
    [data]
  );

  return status === "error" ? (
    <div>Error fetching images</div>
  ) : status === "loading" ? (
    <Loading />
  ) : (
    <div className="container p-12 mx-auto ">
      <InfiniteScroll
        dataLength={images ? images.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loading />}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {images &&
          images.map((image: ResponseImage, index: number) => (
            <ImageCard
              {...image}
              onClick={() => {
                setLightboxState(true);
                setLighboxImgIndex(index);
              }}
            />
          ))}
      </InfiniteScroll>

      <Lightbox
        open={lightboxState}
        index={lightboxImgIndex}
        close={() => setLightboxState(false)}
        slides={images?.map((image: ResponseImage) => ({
          alt: image.author,
          width: image.width,
          height: image.height,
          src: image.download_url,
        }))}
        plugins={[Download]}
      />
    </div>
  );
}
