import React from "react";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";
import BlogHero from "@/components/BlogHero";

import COMPONENT_MAP from "@/helpers/mdx-components";
import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) return;

  const {
    frontmatter: { title, abstract },
  } = blogPost;

  return {
    title: title,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    notFound();
  }

  const {
    frontmatter: { title, publishedOn },
    content,
  } = loadBlogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
