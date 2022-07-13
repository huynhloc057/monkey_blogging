import styled from "styled-components";
import slugify from "slugify";
import React from "react";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  const { category, user } = data;
  if (!data || !data.id) return null;
  console.log("user", user);
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  console.log("date", formatDate);
  return (
    <PostFeatureItemStyles>
      <PostImage alt="unflash" url={data.image}></PostImage>
      {/* <img
        src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
        alt="unsplash"
        className="post-image"
      /> */}
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          {/* <span className="post-category">Kiến thức</span> */}

          <PostMeta
            to={slugify(user?.fullname || "", { lower: true })}
            authorName={user?.fullname}
            date={formatDate}
          ></PostMeta>
          {/* <div className="post-info">
            <span className="post-time">Mar 23</span>
            <span className="post-dot"></span>
            <span className="post-author">Andiez Le</span>
          </div> */}
        </div>
        <PostTitle to={data.slug} size="big">
          {data.title}
        </PostTitle>
        {/* <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3> */}
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
