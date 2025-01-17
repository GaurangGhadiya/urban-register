import React from 'react'
import style from "./layout.module.css"
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoDocumentsOutline, IoHome, IoHomeOutline } from "react-icons/io5";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useRouter } from 'next/router';
import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Divider } from '@mui/material';
import { getImagePath } from '@/utils/CustomImagePath';
import Image from 'next/image';
import { getCookieValues, removeCookie } from '@/utils/cookies';

import { MdGTranslate } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { MdOutlineTransferWithinAStation } from "react-icons/md";




const menu = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: <IoHome size={20} />
    },
    {
        title: "Registration",
        url: "/registration",
        icon: <IoMdPersonAdd size={20} />
    },
    {
        title: "Modify / Edit",
        url: "/update",
        icon: <FaUserEdit size={20} />
    },
    {
        title: "Verifications",
        url: "/verification",
        icon: <MdVerifiedUser size={20} />
    },
    // {
    //     title: "Reports",
    //     url: "/reports",
    //     icon: <IoDocumentsOutline size={20} />
    // },
    // {
    //     title: "Self eKYC",
    //     url: "/ekyc",
    //     icon: <BsPersonBoundingBox size={20} />
    // },
    {
        title: "Check Parivar Details",
        url: "/familyList",
        icon: <TbReportSearch size={20} />
    },
    // {
    //     title: "List of Family",
    //     url: "/familyList",
    //     icon: <FaRegListAlt size={20} />
    // },
    {
        title: "Separate Family",
        url: "/separateFamily",
        icon: <MdOutlineFamilyRestroom size={20} />
    },
    // {
    //     title: "Transfer Member",
    //     url: "/transferMember",
    //     icon: <MdOutlineTransferWithinAStation size={20} />
    // },
    {
        title: "Transfer List",
        url: "/transferList",
        icon: <MdOutlineTransferWithinAStation size={20} />
    },
    {
        title: "Rural Transfer List",
        url: "/transferRuralList",
        icon: <MdOutlineTransferWithinAStation size={20} />
    },
    {
        title: "Parivar Nakal",
        url: "/parivarNakal",
        icon: <IoDocumentsOutline size={20} />
    },
]

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const router = useRouter()
    // const userData = getCookieValues("userData") || null
    const currentPath = router.asPath;
    const logout = () => {

        removeCookie("userData");
        // router.push("/")
        window.location.pathname = "/urbanregister"
        removeCookie("userData");


    }

    const changeLanguae = () => {
        let cLanguage = i18n.language
        if (cLanguage == "en") {
            i18n.changeLanguage("hi")
        } else {
            i18n.changeLanguage("en")
        }
    }
    return (
        <>
        <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} >
            {/* <button onClick={toggleSidebar} style={{background : "red"}}>Toggle Sidebar</button> */}
            <div className={style.topMenu}>
                <Image
                    src={getImagePath("/HPGovt.png")}
                    width="45"
                    height="35"
                    alt="Himachal Pradesh Logo"

                    // className={style.hpLogo}
                />
                <div className={style.title}>Parivar Register</div>
            </div>
            <Divider style={{ marginBottom: "7px" }} />
            <div className={style.outer}>
                <div>
                    {menu?.map(v => (<>
                        <div onClick={() => router.push(v?.url)} className={style.menu}
                            style={{ backgroundColor: currentPath?.includes(v?.url) ? "#F0F4F8" : "transperant", borderRadius: currentPath?.includes(v?.url) ? "4px" : "0px" }}
                        >
                            <div>{v?.icon}</div>
                            <div className={style.menuTitle}>{v?.title}</div>
                        </div>
                    </>))}
                </div>
                {/* <div>
                    <Divider style={{ marginBottom: "7px" }} />
                    <div className={style.menu} onClick={logout}>
                        <div><IoLogOut size={21} style={{ marginTop: "5px" }} /></div>
                        <div className={style.menuTitle} >Logout</div>
                    </div>
                    <div className={style.menu}>
                        <div><FaUserCircle size={20} style={{ marginTop: "5px" }} /></div>
                        <div className={style.menuTitle}>{userData?.user_id || userData?.username}</div>
                    </div>
                    <div className={style.menu} onClick={changeLanguae}>
                        <div><MdGTranslate size={20} style={{ marginTop: "5px" }} /></div>
                        <div className={style.menuTitle} >Change Language to {i18n.language == "en" ? "Hindi" : "English"}</div>
                    </div>
                </div> */}
            </div>
        </div>

        </>
    )
}

export default Sidebar
