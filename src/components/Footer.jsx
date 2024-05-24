import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-100">
        <footer className="text-center text-light bg-dark">
          <div className="container">
            <section className="mx-1">
              <div className="row text-center pt-4 d-flex flex-row justify-content-center ">
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="/" className="text-light text-decoration-none">
                      AllTraxs
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="/" className="nav-link active">
                      <span>Home</span>
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="/AboutScreen" className="nav-link active">
                      <span>About</span>
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="/ContactScreen" className="nav-link active">
                      <span>Contacts</span>
                    </a>
                  </h6>
                </div>
              </div>
            </section>
            <hr className="my-3" />
            <section className="mb-3">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <p className="text-light">
                    "Imagine a digital music platform where you can access
                    millions of songs, albums, and playlists from various
                    artists and genres, all at your fingertips. Our online song
                    playing app, much like Spotify, offers a seamless and
                    personalized music streaming experience. Discover new
                    releases, create and share playlists, follow your favorite
                    artists, and enjoy curated playlists tailored to your
                    tastes. With features like offline listening, high-quality
                    audio streaming, and cross-device synchronization, you can
                    enjoy your favorite tunes anytime, anywhere. Whether you're
                    in the mood for upbeat tracks to energize your workout or
                    soothing melodies for relaxation, our app provides the
                    ultimate soundtrack to your life."
                  </p>
                </div>
              </div>
            </section>
            <section className="text-center mb-1">
              <a href="/" className="text-light me-4">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="/" className="text-light me-4">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="/" className="text-light me-4">
                <i className="fa fa-google"></i>
              </a>
              <a href="/" className="text-light me-4">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="/" className="text-light me-4">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="/" className="text-light me-4">
                <i className="fa fa-github"></i>
              </a>
            </section>
            <span>
              <i className="fa fa-phone"> Call us at: +91 9634708314</i>
            </span>
            &nbsp;&nbsp;
            <span>
              <i className="fa fa-envelope">
                &nbsp; Mail us at: akash581999@gmail.com
              </i>
            </span>
          </div>

          <div className="text-center py-3 text-light">
            © 2024 Copyright:
            <a
              className="text-light mx-1"
              href="https://sourcedotcom.in/"
              target="_blank"
              rel="noreferrer"
            >
              AllTraxs.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
