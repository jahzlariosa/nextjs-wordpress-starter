"use client";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  pageNumber: number;
}

//wip
const Blog = ({ pageProps = { pageNumber: 1 } }) => {
  const [pageNumber, setPageNumber] = useState(pageProps.pageNumber);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetch(
      `https://wp.jahz.xyz/wp-json/wp/v2/posts?page=${pageNumber}&per_page=2`
    )
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
  }, [pageNumber]);

  return (
    <div>
      <div>
        Current Page: {currentPage} / Total Pages: {totalPages}
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      ))}
      <div className="flex justify-between">
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
        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded ${currentPage === i + 1 ? 'bg-gray-500' : 'hover:bg-gray-500'}`}
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
