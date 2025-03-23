import React from "react";
import Navbar from "./Navbar";
import c1 from "./images/c1.jpg";
import c2 from "./images/html.png";
import c3 from "./images/sql.jpg";
import "./css/style.css";
import {
  faGraduationCap,
  faAward,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Footer from "./header and footer/Footer";

function Home() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token")
  return (
    <div>
      <Navbar page={"home"} />
      <div>
        <section id="home">
          <h2>Booster votre carrière avec E-SKILLS Academy Learning MANAGEMENT</h2>
          <p>
            {" "}
            E-SKILLS Academy est une plateforme -learning dédiée aux entreprises. Nous proposons des solutions
            sur mesure afin de subvenir à vos besoins. Découvrez la formation continue en
            toute sa modernité !!&#128522;&#128522;
          </p>
          <div className="btn">
            <a className="blue" href="./login">
              Plus
            </a>
            <a className="blue" href="./courses">
              Nos Cours
            </a>
          </div>
        </section>
        <section id="features">
          <h1>Meilleurs fonctionnalités</h1>
          <p>Une chance pour tendre vers la perfection</p>
          <div className="fea-base">
            <div className="fea-box">
              <FontAwesomeIcon icon={faGraduationCap} className="i" />
              <h3>Enseignement</h3>
              <p>L’originalité est l’essence de la véritable éducation </p>
            </div>
            <div className="fea-box">
              <FontAwesomeIcon icon={faStar} className="i" />
              <h3>Cours efficaces</h3>
              <p>
                L’éducation en ligne est comme une marée montante, elle soulèvera tous
                les bateaux.{" "}
              </p>
            </div>
            <div className="fea-box">
              <FontAwesomeIcon icon={faAward} className="i" />
              <h3>Des certifications reconnues</h3>
              <p>
                Un certificat sans connaissance est comme une arme sans balles.{" "}
              </p>
            </div>
          </div>
        </section>
        <section id="course">
          <h1>Nos cours populaires</h1>
          <p>200+ inscrits</p>
          <div className="course-box">
            {/* ... (Course content here) */}
            <div className="courses">
              <img src={c1} alt="" />
              <div className="details">
                <p>Updated 07/10/2024</p>
                <h6>JavaScript pour les débutant</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(111)</p>
                </div>
              </div>

            </div>
            <div className="courses">
              <img src={c2} alt="" />
              <div className="details">
                <p>Updated 11/05/2024</p>
                <h6>HTML pour les débutants</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(12)</p>
                </div>
              </div>

            </div>
            <div className="courses">
              <img src={c3} alt="" />
              <div className="details">
                <p>Updated 12/11/24</p>
                <h6>SQL pour les débutants</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(22)</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
export default Home;
