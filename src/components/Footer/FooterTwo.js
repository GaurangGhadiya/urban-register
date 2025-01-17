import React from 'react'
import style from './footer.module.css'
import { Grid } from '@mui/material'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';


const FooterTwo = () => {
    return (
        <div className={style.footer}>
            <Grid container spacing={3} >
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <h3 className={style.title}>About Us</h3>
                            <p className={style.desc}>Parivar register is an Entitlement based Management System which is being developed into an integrated State Social Registry. It consists of family registry, beneficiary management system, beneficiary registry, direct benefit platform and a grievance redressal system.</p>
                       {/* <div className={style.social}>
                        <FaTwitter className={style.icon} />
                        <FaFacebookF className={style.icon}/>
                        <FaGithub className={style.icon}/>
                        <FaDribbble className={style.icon}/>
                        <FaLinkedinIn className={style.icon}/>
                        <TfiYoutube className={style.icon}/>
                       </div> */}
                        </Grid>
                        <Grid item xs={1} md={0}></Grid>
                        <Grid item xs={12} md={3}>
                            <h3 className={style.title}>Links</h3>
                            <p className={style.descLink} onClick={() => window.open("https://himparivar.hp.gov.in")}>Him Parivar</p>
                            <p className={style.descLink}>CM Help Line</p>
                            <p className={style.descLink} onClick={() => window.open("https://ddtg.hp.gov.in")}>Department Of Digital Technologies And Governance</p>
                            <p className={style.descLink}>Terms of Services</p>
                            <p className={style.descLink}>Privacy Policy</p>
                        </Grid>
                        <Grid item xs={1} md={0}></Grid>

                        <Grid item xs={12} md={3}>
                            <h3 className={style.title}>Contact Us</h3>

                            <p className={style.desc}>DDTG Himachal Pradesh I.T.Bhawan, Mehli, Shimla-171013



                            </p>
                            <p className={style.desc} style={{ margin: "10px 0" }}>Phone: +91 1772628914
                                <br /> Email: dirit-hp@nic.in</p>
                            {/* <p className={style.desc}>
                                Office Visiting Hours: <br />
                                Monday to Friday (010:00 AM to 06:00 PM)
                            </p> */}
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>


            </Grid>

            {/* <div className={style.divider}>
                <hr className={style.hr}/>
            </div> */}

            {/* <div style={{width:"80%", margin : "auto", marginBottom : "-20px"}}>
            <Grid container spacing={3} mt={4}>
                <Grid item xs={12} sm={4} md={2} className={style.fBorder} style={{paddingTop : 0}}>
                <Image src={getImagePath("/f1.png")} width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={12} sm={4} md={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src={getImagePath("/f2.png")} width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={12} sm={4} md={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src={getImagePath("/f3.png")} width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={12} sm={4} md={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src={getImagePath("/f4.png")} width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={12} sm={4} md={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src={getImagePath("/f5.png")} width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={12} sm={4} md={2} className={style.fBorder1} style={{paddingTop : 0}}    >
                <Image src={getImagePath("/f6.png")} width={100} height={80} className={style.fImg} />
                </Grid>
                </Grid>
            </div> */}
        </div>
    )
}

export default FooterTwo
