import React from "react";
import dynamic from "next/dynamic";

import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";
import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";

import styles from "./postSlug.module.css";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const {
    frontmatter: { title, abstract },
  } = await loadBlogPost(postSlug);

  return {
    title: title,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const {
    content,
    frontmatter: { title, publishedOn },
  } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{ pre: CodeSnippet, DivisionGroupsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
