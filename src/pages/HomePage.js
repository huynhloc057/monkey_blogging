import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase-config";
import styled from "styled-components";
import HomeBanner from "../components/module/home/HomeBanner";
import Layout from "../components/layout/Layout";
import HomeFeature from "../components/module/home/HomeFeature";
import HomeNewest from "../components/module/home/HomeNewest";

const HomePageStyles = styled.div``;
const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
