import React from "react";
import styled from "styled-components";
import { Button } from "../../button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div>
        <div className="container">
          <div className="banner">
            <div className="banner-content">
              <h1 className="banner-heading">Monkey Blogging</h1>
              <p className="banner-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                error atque totam doloribus dolores minus numquam? Quos,
                voluptates optio obcaecati adipisci maxime ipsam error officia?
                Illo magni cum velit sit!
              </p>

              <Button
                to="/sign-up"
                kind="secondary"
                style={{ display: "inline-block" }}
              >
                Get started
              </Button>
            </div>
            <div className="banner-image">
              <img src="/img-banner.png" alt="banner" />
            </div>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
