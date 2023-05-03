import * as React from "react";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import { Nav, NavProps } from "./Nav";
import styles from "./scss/index.module.scss";

type FooterProps = NavProps;

export const Footer: React.FC<FooterProps> = ({ menu }) => (
    <div className={`${styles.footer}`} id="footer">
        <div className={styles.footer__favicons}>
            {SOCIAL_MEDIA.map((medium) => (
                <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
        </div>

        <Nav menu={menu} />

        <div className={styles.footer__copyright}>
            <div className="container">
                <div className={styles.footer__copyright__content}>
                    Copyright © 2019
                    <span>ADULLAM INC.</span> All Rights Reserved. Design by
                    <span className={styles.footer__copyright__tranform__none}>TivaTheme</span>
                </div>
            </div>
        </div>
    </div>
);

{/* <footer>
    <div class="footer">
        <div class="newsletter">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-md-12">
                        <div class="title clearfix">
                            <div class=" page-title color">
                                <h3 class="title-main">Subscribe</h3>
                                <div class="title-icon text-left">
                                    <h2 class="title-h2">Subscribe Newsletter</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-7 col-md-12">
                        <form action="#" method="post">
                            <div class="item">
                                <div class="input">
                                    <input type="email" name="EMAIL" placeholder="Your Email" required>
                                </div>
                                <div class="submit">
                                    <button type="submit" class="btn-submit btn button-main">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom pd-top-bottom">
            <div class="container full-mobile">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-6 mg-bottom-30">
                        <div class="item contact-us">
                            <div class="item-content">
                                <div class="sub-title">
                                    <h4 class="title-black">Contact Us</h4>
                                </div>
                            </div>

                            <div class="content">
                                <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                                <ul>
                                    <li class="d-flex bg-icon">
                                        <span>
                                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                                        </span>
                                        <span>221b Notingham Forest - London - UK</span>
                                    </li>
                                    <li class="d-flex bg-icon">
                                        <span>
                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                        </span>
                                        <span>0123 456 789 - 0123 987 654</span>
                                    </li>
                                    <li class="d-flex bg-icon">
                                        <span>
                                            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                                        </span>
                                        <span>tivatheme@gmail.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 col-md-6 col-sm-6 mg-bottom-30">
                        <div class="item">
                            <div class="item-content">
                                <div class="sub-title">
                                    <h4 class="title-black">Follow Me</h4>
                                </div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li class="d-flex">
                                        <a href="#" title="Terms & Conditions">
                                            <span>
                                                <i class="fa fa-facebook"></i>
                                            </span>
                                            <span>Facebook</span>
                                        </a>
                                    </li>
                                    <li class="d-flex">
                                        <a href="#" title="Return Policy">
                                            <span>
                                                <i class="fa fa-twitter"></i>
                                            </span>
                                            <span>Twitter</span>
                                        </a>
                                    </li>
                                    <li class="d-flex">
                                        <a href="#" title="Refund Policy">
                                            <span>
                                                <i class="fa fa-pinterest"></i>
                                            </span>
                                            <span>Pinterest</span>
                                        </a>
                                    </li>
                                    <li class="d-flex">
                                        <a href="#" title="Return Policy">
                                            <span>
                                                <i class="fa fa-instagram"></i>
                                            </span>
                                            <span>Instagram</span>
                                        </a>
                                    </li>
                                    <li class="d-flex">
                                        <a href="#" title="Refund Policy">
                                            <span>
                                                <i class="fa fa-youtube"></i>
                                            </span>
                                            <span>Youtube</span>
                                        </a>
                                    </li>
                                    <li class="d-flex">
                                        <a href="#" title="Refund Policy">
                                            <span>
                                                <i class="fa fa-wordpress"></i>
                                            </span>
                                            <span>Wordpress</span>
                                        </a>
                                    </li>
                                    <li class="d-flex">
                                        <a href="#" title="Refund Policy">
                                            <span>
                                                <i class="fa fa-tumblr"></i>
                                            </span>
                                            <span>Tumblr</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 col-md-6 col-sm-6 mg-bottom-30">
                        <div class="item">
                            <div class="item-content">
                                <div class="sub-title">
                                    <h4 class="title-black">Userful Links</h4>
                                </div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li class="m-bottom-0">
                                        <a href="#" title="Terms & Conditions">About Us</a>
                                    </li>
                                    <li class="m-bottom-0">
                                        <a href="#" title="Return Policy">Portfolio</a>
                                    </li>
                                    <li class="m-bottom-0">
                                        <a href="#" title="Refund Policy">Terms Of Service</a>
                                    </li>
                                    <li class="m-bottom-0">
                                        <a href="#" title="Refund Policy">Privacy Policy</a>
                                    </li>
                                    <li class="m-bottom-0">
                                        <a href="#" title="Refund Policy">Contact Us </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="about-layout">
                            <div class="group">
                                <div class="group-inner  text-center">
                                    <div class="about-logo">
                                        <a href="#" title="">
                                            <img class="img-fluid" src="img/logo.png" alt>
                                        </a>
                                    </div>
                                    <div class="about-content">
                                        <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
                                            ut fermentum massa justo sit amet risus. Curabitur blandit tempusporttitor
                                            nullam quis</p>
                                    </div>
                                    <div class="widget-social">
                                        <ul class="d-flex justify-content-center">
                                            <li class="social-facebook">
                                                <a class="gsf-link" title="Facebook" href="#">
                                                    <i class="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li class="social-twitter">
                                                <a class="gsf-link" title="Twitter" href="#">
                                                    <i class="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li class="social-google-plus">
                                                <a class="gsf-link" title="Google+" href="#">
                                                    <i class="fa fa-google-plus"></i>
                                                </a>
                                            </li>
                                            <li class="social-instagram">
                                                <a class="gsf-link" title="Instagram" href="#">
                                                    <i class="fa fa-instagram"></i>
                                                </a>
                                            </li>
                                            <li class="social-pinterest">
                                                <a class="gsf-link" title="Pinterest" href="#">
                                                    <i class="fa fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-copyright text-center">
            <div class="container">
                <div class="content">
                    Copyright © 2019
                    <span>OARS ORGANIC.</span> All Rights Reserved. Design by
                    <span class="tranform-none">TivaTheme</span>
                </div>
            </div>
        </div>
    </div>
</footer> */}
