"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";


interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {rendered:string};
  pageNumber: number;
}
interface PageProps {
  pageProps: {
    pageNumber: number;
  };
  endpoint: string;
}

const Blog: NextPage<PageProps> = ({ endpoint, pageProps = { pageNumber: 1 } }) => {
  const [pageNumber, setPageNumber] = useState(pageProps.pageNumber);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    console.log()
    fetch(
      `${endpoint}/posts?page=${pageNumber}&per_page=5`, {next: { revalidate: 60}} )
      .then((response) => {
        const totalPagesHeader = response.headers.get("x-wp-totalpages");
        if (totalPagesHeader) {
          setTotalPages(+totalPagesHeader);
        }
        return response.json();
      })
      .then((data: Post[]) => {
        setCurrentPage(pageNumber);
        setPosts(data);
      });
  }, [pageNumber, endpoint]);

  return (
    <div>
      <div>
        Current Page: {currentPage} / Total Pages: {totalPages}
      </div>
      {posts.map((post) => (
        <div key={post.id} className='bg-white border-gray-300 mb-2 rounded-md col-span-1'>
        <Link href={`/blogs/${post.slug}`}>
        <div className='grid grid-cols-1'>
          <div className='postBody p-2'>
            <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}} className='text-2xl'></h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
          </div>
        </div>
        </Link>
      </div>
      ))}
      <div className="flex">
  <button
    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-l ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-500'}`}
    disabled={currentPage === 1}
    onClick={() => setPageNumber(pageNumber - 1)}
  >
    Previous
  </button>
  <div className="flex">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mx-1 ${currentPage === i + 1 ? 'bg-gray-500' : 'hover:bg-gray-500'}`}
        onClick={() => setPageNumber(i + 1)}
      >
        {i + 1}
      </button>
    ))}
  </div>
  <button
    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-r ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-500'}`}
    disabled={currentPage === totalPages}
    onClick={() => setPageNumber(pageNumber + 1)}
  >
    Next
  </button>
</div>
    </div>
  );
};

export default Blog;
