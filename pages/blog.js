import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <p>{post.frontmatter.title}</p>
            </Link>
            <p>{post.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts');
  const posts = files.map(filename => {
    const markdownWithMetadata = fs
      .readFileSync(path.join('posts', filename))
      .toString();
    const { data } = matter(markdownWithMetadata);

    const slug = filename.replace('.md', '');

    return {
      slug,
      frontmatter: data,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
