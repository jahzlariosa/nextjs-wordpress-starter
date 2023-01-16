export type Posts = [
    {
      id: number;
      title: { rendered: string};
      slug: string;
      author: string;
      excerpt: { rendered: string};
      content: { rendered: string};
      date: string;
      featured_img_url: string;
    }
  ]
  