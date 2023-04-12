import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function Post({ content, frontmatter }) {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const markdownWithMetadata = fs
    .readFileSync(path.join('posts', slug + '.md'))
    .toString();
  const { data, content } = matter(markdownWithMetadata);

  return {
    props: {
      content,
      frontmatter: data,
    },
  };
}
