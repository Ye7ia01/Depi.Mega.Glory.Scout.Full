import React from "react";
import img1 from "../assets/Icon Container.png";
import img2 from "../assets/Icon Container2.png";
import img3 from "../assets/Icon Container3.png";
import img4 from "../assets/Icon Container4.png";
import img5 from "../assets/arrow icon.png";
import img6 from "../assets/Subtract.png";
import img7 from "../assets/Vector (Stroke).png";
import img8 from "../assets/Subtract (1).png";
import imgGallery1 from "../assets/image.png";
import imgGallery2 from "../assets/image (1).png";
import imgGallery3 from "../assets/image (2).png";
import imgGallery4 from "../assets/image (3).png";
import imgGallery5 from "../assets/image (4).png";
import imgGallery6 from "../assets/image (5).png";
import CTAImg from "../assets/CTA-bg.png";

const Contact = () => {
  return (
    <>
      <section id="contact-home-page">
        <div className="text-container container-fluid">
          <h2>
            Get in Touch with <span className="glory"> GloryScout</span>
          </h2>
          <p className="main-text">
            Welcome to GloryScout's Contact Us page. We're here to assist you
            with any inquiries, requests, or feedback you may have. Whether
            you're a player looking to showcase your skills, a coach searching
            for talent, or a club interested in scouting, we're just a message
            away. Reach out to us, and let's start a conversation about your
            football journey.
          </p>

          {/*========= contact icon section =========== */}

          <section className="contact-info">
            <div className="row g-2">
              <div className="col-xsm-12 col-md-6 col-lg-3">
                <div className="details">
                  <img src={img5} alt="arrow icon" className="arrow-icon" />
                  <img src={img1} alt="contact-icon" />
                  <p>kareemsaad@gmail.com</p>
                </div>
              </div>

              <div className="col-xsm-12 col-md-6 col-lg-3">
                <div className="details">
                  <img src={img5} alt="arrow icon" className="arrow-icon" />
                  <img src={img2} alt="contact-icon" />
                  <p>+20 109 893 1841</p>
                </div>
              </div>

              <div className="col-xsm-12 col-md-6 col-lg-3">
                <div className="details">
                  <img src={img5} alt="arrow icon" className="arrow-icon" />
                  <img src={img3} alt="contact-icon" />
                  <p>Zagazig</p>
                </div>
              </div>

              <div className="col-xsm-12 col-md-6 col-lg-3">
                <div className="details">
                  <img src={img5} alt="arrow icon" className="arrow-icon" />
                  <img src={img4} alt="contact-icon" />
                  <p className="d-flex justify-content-between">
                    <span>Instagram </span>
                    <span>LinkedIn</span>
                    <span>Facebook</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/*=========== contact form section ========= */}

          <section className="contactForm-container">
            <div>
              <h2>
                Let's <span>Connect</span>
              </h2>
              <p className="main-text">
                We're excited to connect with you and learn more about your
                football journey. Use the form below to get in touch with
                GloryScout. Whether you're a player looking to showcase your
                skills, a coach searching for talent, or a club interested in
                scouting, we're here to answer your questions and provide the
                assistance you need. Let's work together to unlock your
                potential and achieve your football dreams.
              </p>
            </div>

            <div className="contact-form">
              <div className="row p-5 g-3">
                <div className="col-sm-12 col-md-6 col-lg-4 ">
                  <label htmlFor="first-name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    placeholder="Enter First Name"
                    className="form-control"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <label htmlFor="last-name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    placeholder="Enter Last Name"
                    className="form-control"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your Email"
                    className="form-control"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="form-control"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <label htmlFor="inquiry" className="form-label">
                    Inquiry Type
                  </label>
                  <input
                    type="text"
                    id="inquiry"
                    placeholder="Enter Inquiry Type"
                    className="form-control"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <label htmlFor="about-us" className="form-label">
                    How Did You Hear About Us?
                  </label>
                  <input
                    type="text"
                    id="about-us"
                    placeholder="Select"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-12">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    name=""
                    id="message"
                    className="form-control"
                  ></textarea>
                </div>

                <div className="row my-4">
                  <div className="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center">
                    <input
                      type="checkbox"
                      name=""
                      id="agree"
                      className="checkbox-btn"
                    />
                    <label htmlFor="agree" className="m-0 form-label ps-2 ">
                      I agree with Terms of Use and Privacy Policy
                    </label>
                  </div>

                  <div className=" col-sm-12 col-md-6  col-lg-6 d-flex">
                    <button className="btn contact-btn ms-auto">
                      Send Your Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*========== discover our office location ========== */}

          <section className="discover-location">
            <div className="locations-info">
              <h2>
                Discover Our <span>Office Locations</span>
              </h2>
              <p className="main-text">
                GloryScout is here to serve you across multiple locations.
                Whether you're a player looking to showcase your skills, a coach
                searching for talent, or a club interested in scouting, we have
                offices conveniently located to meet your needs. Explore the
                categories below to find the GloryScout office nearest to you
                and start your journey to football success.
              </p>
            </div>

            <div className="locations">
              {/* سوف يتم تحويل ال a الي Link عند تسطيب ال routes*/}

              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Regional
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    International
                  </a>
                </li>
              </ul>

              <div className="row d-flex  justify-content-between gap-4 p-5 discover-container">

                <div className="col-sm-12 col-md-6 col-lg-6 card">
                  <div className="text-container2">
                    <p className="title">
                      123 GloryScout Plaza, Gamal Abdel Nasser Street, Mansoura
                    </p>
                    <p className="main-text">
                      Our main headquarters serve as the heart of GloryScout.
                      Located in the bustling city center of Mansoura, this is
                      where our core team of experts operates, driving the
                      excellence and innovation that define us.
                    </p>
                  </div>
                  <div className="btn-container">
                    <button className="btn">
                      <img src={img6} alt="location-icon" className="me-2" />
                      <span>info@GloryScout.com</span>
                    </button>

                    <button className="btn">
                      <img src={img7} alt="location-icon" className="me-2" />
                      <span>+20 109 893 1841</span>
                    </button>

                    <button className="btn">
                      <img src={img8} alt="location-icon" className="me-2" />
                      <span>AGA</span>
                    </button>
                  </div>

                  <button className="btn w-100 p-2 rounded-pill dir-btn">
                    Get Direction
                  </button>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 card">
                  <div className="text-container2">
                  <p className="title">
                      123 GloryScout Plaza, Gamal Abdel Nasser Street, Mansoura
                    </p>
                    <p className="main-text">
                      Our main headquarters serve as the heart of GloryScout.
                      Located in the bustling city center of Mansoura, this is
                      where our core team of experts operates, driving the
                      excellence and innovation that define us.
                    </p>
                  </div>
                  <div className="btn-container">
                    <button className="btn">
                      <img src={img6} alt="location-icon" className="me-2" />
                      <span>info@GloryScout.com</span>
                    </button>

                    <button className="btn">
                      <img src={img7} alt="location-icon" className="me-2" />
                      <span>+20 109 893 1841</span>
                    </button>

                    <button className="btn">
                      <img src={img8} alt="location-icon" className="me-2" />
                      <span>AGA</span>
                    </button>
                  </div>

                  <button className="btn w-100 p-2 rounded-pill dir-btn">
                    Get Direction
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/*========== Gallary Section ========== */}

          <section className="gallery p-5">
            <div className="img-container bg-white">
              <div className="row  p-1 g-2">
                <div className="col-sm-12 col-md-6 col-lg-6  ">
                  <img
                    src={imgGallery1}
                    alt="gallery image"
                    className="w-100 me-4"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 ">
                  <img
                    src={imgGallery2}
                    alt="gallery image"
                    className="w-100"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <img
                    src={imgGallery3}
                    alt="gallery image"
                    className="w-100 h-100"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <img
                    src={imgGallery4}
                    alt="gallery image"
                    className="w-100"
                  />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4">
                  <img
                    src={imgGallery5}
                    alt="gallery image"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6 p-3">
                <p className="pt-4 title">Explore GloryScout World</p>
                <p className="gallery-desc main-text">
                  Step inside the world of GloryScout, where professionalism
                  meets passion, and expertise meets the love of football. Our
                  gallery offers a glimpse into our team, workspaces, and the
                  vibrant football community we serve. Explore behind the scenes
                  and get to know us better as we work together to unlock the
                  potential of the next generation of football stars.
                </p>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6 p-3">
                <img src={imgGallery6} alt="gallery image" className="w-100 " />
              </div>
            </div>
          </section>

          <section className="CTA">
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <h2>
                  Start Your <span>Football Journey Today</span>
                </h2>
                <p className="main-text">
                  Your dream football career is just a click away. Whether
                  you're a player looking to showcase your skills, a coach
                  searching for talent, or a club aiming to discover the next
                  star, GloryScout is here to assist you every step of the way.
                  Take the first step towards your football goals and explore
                  our platform or get in touch with our team for personalized
                  assistance.
                </p>
              </div>
              <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
                <button className="btn ">Explore Properties</button>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/*========== Call To Action Section ========== */}
    </>
  );
};

export default Contact;
