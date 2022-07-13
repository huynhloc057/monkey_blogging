import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  ${(props) =>
    props.color === "white" &&
    css`
      color: gray;
    `};
  ${(props) =>
    props.color === "gray" &&
    css`
      color: ${(props) => props.theme.gray6B}; ;
    `};
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andie Le",
  color = "white",
  className = "",
  to = "/",
}) => {
  return (
    <PostMetaStyles color={color} className={className}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={to}>
        <span className="post-author">{authorName}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
