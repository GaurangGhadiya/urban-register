'use client';
import style from "./home.module.css";
import React, { useEffect, useLayoutEffect } from "react";
import TopSection from "./TopSection";
import Activities from "./Activities";
import Services from "./Services";
import Counting from "./Counting";
import Layout from "@/layout";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/network/api";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "@/network/actions/verityToken";
import { useRouter } from "next/router";
import useSessionCheck from "@/utils/useSessionCheck";


const HomePage = () => {
  const dispatch = useDispatch()
  // useSessionCheck();
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('token')



  const validateToken = async () => {
    let body = {
      token : search || "",
      secret_key : process.env.NEXT_PUBLIC_SECRET_KEY,
      service_id : process.env.NEXT_PUBLIC_SERVICE_ID
    }
    if(search){
      dispatch(verifyToken(body,router))

    }
  }
  useLayoutEffect(() => {

    validateToken()
  }, [search]);
  return (
    <>

      <Layout >
        <div className={style.main}>
          <TopSection />
          <Activities />
          <Services />
          {/* <Counting /> */}
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
