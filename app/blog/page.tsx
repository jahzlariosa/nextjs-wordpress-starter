"use client"
import { useEffect, useState } from 'react';

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


const Blog = ({pageProps={}}) => {
    const [pageNumber, setPageNumber] = useState(pageProps.pageNumber ? pageProps.pageNumber : 1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(pageNumber);
    const [totalPages, setTotalPages] = useState<number>(0);


  useEffect(() => {
    fetch(`https://wp.jahz.xyz/wp-json/wp/v2/posts?page=${pageNumber}&per_page=2`)
    .then((response) => {
        const totalPagesHeader = response.headers.get("x-wp-totalpages");
        if(totalPagesHeader) {
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
      <button disabled={currentPage === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>
      <div>
  {Array.from({length: totalPages}, (_, i) => (
    <button key={i + 1} onClick={() => setPageNumber(i + 1)}>{i + 1}</button>
  ))}
</div>
<button disabled={currentPage === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</button>

</div>
  );
};

export default Blog;
