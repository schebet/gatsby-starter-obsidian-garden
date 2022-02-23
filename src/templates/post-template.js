import React from "react";
import { graphql } from "gatsby";
import MdxProvider from "@/components/MDXProvider";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "@/components/Layout";
// import SEO from '@/components/seo';
import Link from "@/components/GatsbyLink";
import kebabCase from "lodash.kebabcase";

const PostTemplate = ({ data }) => {
  const postNode = data.mdx;
  const post = data.mdx.fields;
  const { tags, category } = postNode.frontmatter;
  const postTitle = data.mdx.frontmatter.title;
  // const pageTitle = `${postTitle} - ${siteTitle}`;

  return (
    <MdxProvider>
      <Layout>
        {/* <SEO postNode={data.mdx} postSEO postPath={data.mdx.fields.slug} /> */}
        <small className="text-sm font-bold uppercase tracking-tight">
          {post.date}
        </small>
        <article className="my-6 prose prose-red lg:prose-xl">
          <MDXRenderer>{postNode.body}</MDXRenderer>
        </article>
        <h5 className="uppercase font-bold mb-4">Topics</h5>
        <ul className="flex flex-row gap-4">
          {tags &&
            tags.map((tag) => (
              <li key={tag} className="px-2 py-1 bg-slate-100 rounded-full">
                <Link to={`/tag/${kebabCase(tag)}`}>{tag}</Link>
              </li>
            ))}
        </ul>
        <h5 className="uppercase font-bold mb-4">Maturity</h5>
        {post.stage}
      </Layout>
    </MdxProvider>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...post
    }
  }
`;

export default PostTemplate;
