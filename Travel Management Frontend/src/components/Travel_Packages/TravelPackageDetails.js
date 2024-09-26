import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import AddRating from "./PackageAddRating";

const PackageDetails = (props) => {
  const [post, setPost] = useState({});
  const { match } = props;

  useEffect(() => {
    const id = match.params.id;
    axios.get(`http://localhost:3009/travelpackages/admin/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
      }
    });
  }, [match.params.id]);

  const {
    _id,
    packageName,
    destination,
    discription,
    date,
    noofdays,
    noofnights,
    vehical,
    perperson,
    packageImage,
  } = post;
  const data = packageName

  return (
    <div className="boodydetails">
      <Header />
      <div className="infotr boodydetails">
        <div className="container">
          <div></div>
       
          <div className={{ paddingBottom: "10px" }}>
            <hr />
          </div>
    
          <ul className="postcard__tagbox" style={{ fontSize: "16px" }}>
            <li>
              <small
                className="text-muted"
                style={{ marginInlineStart: "2%" }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100px" }}
                >
    
                  <a
                    href="/travelpackages"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <i className="fas fa-angle-left mr-2"></i>Back
                  </a>
                </button>
              </small>{" "}
            </li>
            <div style={{ marginInlineStart: "55%" }}>
              <li className="tag__item">
                <i className="fab fa-cc-visa mr-2"></i>Visa Payment
              </li>
              <li className="tag__item">
                <i className="fas fa-paper-plane mr-2"></i>Full Option
              </li>
              <li className="tag__item play blue">
                {" "}
                <i className="fas fa-hands mr-2"></i>Security{" "}
              </li>
            </div>
          </ul>
          <hr />
          <br />

          <div className="card">
            <img
              style={{ height: "470px" }}
              className="card-img-top"
              src={`/uploads/${packageImage}`}
              alt="..."
            />
            <div dangerouslySetInnerHTML={{__html: data}} />

            <div className="card-body" style={{ backgroundColor: "#DDE8E8" }}>
              <h5 className="card-title" >
                {" "}
                {packageName}
              </h5>
              <p className="card-text"> {date} </p>
              <p className="card-text">
                <i className="fas fa-long-arrow-alt-right mr-2"></i>
                <b> {destination} </b>{" "}
              </p>
              <p className="card-text">
                <i className="fas fa-long-arrow-alt-right mr-2"></i>
                <b> {discription} </b>{" "}
              </p>

              <p>
                We are the Best Travel Company in Sri Lanka. Since 2018, Us the
                "Dream travellers" has been committed to bring the travellers
                the best experience and value for their travel arrangements. We
                are passionate about travel and providing corporate travellers
                high-touch services to facilitate their travel needs and sharing
                the world's wonders best experience on the leisure travel side.
                On behalf of that we offer valuable and time reliable offers for
                the best prices for our customers.Sri Lanka Local Tours
                tailor-makes unique Sri Lanka tours, sightseeing adventures and
                interesting trips starting from the gateway cities of Sri Lanka
                to help travelers explore Sri Lanka on their way. We are a
                passionate team of one hundred avid travelers who love to share
                our experiences of Sri Lanka with those looking for a more
                authentic travel experience.
              </p>
            </div>
    
            <div
              className="modal custom-fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div>
                    <AddRating id={_id} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer" style={{ backgroundColor: "#ADADAD" }}>
              <ul className="postcard__tagbox" style={{ fontSize: "16px" }}>
                <li className="tag__item">
                  <i className="fas fa-tag mr-2"></i>PP Rs.&nbsp;{perperson}
                </li>
                <li className="tag__item">
                  <i className="fas fa-clock mr-2"></i>
                  {noofdays}&nbsp;{noofnights}
                </li>
                <li className="tag__item play blue">
                  {" "}
                  <i className="fas fa-car mr-2"></i>
                  {vehical}{" "}
                </li>

                <li style={{ marginLeft: "6%", paddingBottom: "5px" }}>
                  <button style={{ width: "200px" }} type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter">
                    <b>Give Rating</b>
                  </button>
                </li>

                <li style={{ marginLeft: "14%", paddingBottom: "5px" }}>
                  <small className="text-muted">
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-danger"
                      style={{ width: "300px", fontSize: "20px" }}
                    >
                      <a
                        href={`/bookingpackage/${_id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Book Package
                      </a>
                    </button>
                  </small>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PackageDetails;
