import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Forum from "./forum";
import ReactPlayer from "react-player";
import { Progress } from "antd";
import { Button, Modal } from "antd";
import Feedback from "./Feedback";

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [course, setCourse] = useState({
    course_name: "",
    instructor: "",
    description: "",
    y_link: "",
    p_link: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(null);
  const [played, setPlayed] = useState(0);
  const [changePlayed, setChangePlayed] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const playerRef = useRef(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${courseId}`
        );
        const fetchedCourse = response.data;
        setCourse(fetchedCourse);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleDuration = () => {
    setDuration(playerRef.current.getDuration());
    if(duration!=0){
      fetch("http://localhost:8080/api/progress/update-duration", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            courseId,
            duration,
        }),
    })
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/progress/${userId}/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
            setPlayed(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}, []);



  useEffect(() => {
    const updateProgress = async () => {
        if (courseId && userId) {
            try {
                const response = await fetch("http://localhost:8080/api/progress/update-progress", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        courseId,
                        playedTime: played,
                        duration,
                    }),
                });

                if (response.ok) {
                    setPlayed(changePlayed < played ? played : changePlayed);
                } else {
                    console.error("Error updating progress:", response.statusText);
                }
            } catch (error) {
                console.error("Error updating progress:", error);
            }
        }
    };

    updateProgress();
}, [changePlayed]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }
  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          color: "white",
          padding: "10px",
          fontSize: "900",
          fontStyle: "italic",
          backgroundColor: "darkblue",
          width: "100%",
          height: "-19px",
        }}
      >
        Le cours {course.course_name} complet - 2024
      </h3>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <div key={courseId} className="course" >
          <div style={{ display: "flex", gap: "20px" }}>
            <ReactPlayer
              ref={playerRef}
              onProgress={(Progress) => {
                if(changePlayed+10 <= Progress.playedSeconds){
                  setChangePlayed(Progress.playedSeconds);
                }
              }}
              url={course.y_link}
              controls
              type="video/mp4"
              width="60%"
              height="440px" 
              onDuration={handleDuration}
              played={played}
              style={{boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)" , padding:'8px',backgroundColor:'darkgrey',borderRadius:'10px'}}
            />
            <div style={{ width: "50%" , boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)" , borderRadius:'10px'}}>
              <h4>Format du Cours:</h4>
              <p>
                  Il s’agit d’un cours en ligne détaillé, à rythme autonome, sous forme de vidéo, des exercices pratiques
                  de codage et un quiz pour évaluer vos connaissances.
                  Vous pouvez suivre le cours à votre rythme durant la session choisie.
              </p>
              
              <h4>Prérequis:</h4>
              <p>
                  Aucune expérience préalable en programmation n’est requise,
                  mais une connaissance de base de l’informatique est recommandée.
              </p>
              <h4>Les profils concernés:</h4>
              <ul>
                <li>Débutants intéressés par l’apprentissage de la programmation.</li>
                <li>
                  Personnes qui cherchent à ajouter {course.course_name} à leurs compétences.
                </li>
                <li>Etudiants qui préparent pour un cursus informatique</li>
              </ul>
              <h4>Evaluez-vous:</h4>
              <p>
                  Les Quizs sont conçues pour tester votre compréhension, renforcer votre apprentissage et vous fournir des
                  feedbacks constructifs sur vos progrès tout au long du cours.
              </p>
              <p>
                  Cliquez sur le bouton ci-dessous <b>"Take Quizz"</b> pour accéder au Quiz
              </p>{" "}
            
          {Math.ceil((played / duration) * 100) >= 98 && (
              <button
                className="enroll-button"
                onClick={() => navigate(`/assessment/${course.course_id}`)}
              >
                {" "}
                Quizz
              </button>
            )}
            {Math.ceil((played / duration) * 100) < 98 && (
              <button
                className="enroll-button-deactive"
                onClick={showModal}
              >
                Quizz
              </button>
            )}
            </div>
          </div>

          <h4 style={{ marginTop: "20px" , boxShadow: "0 0 20px rgba(0, 0, 0, 0.52)" , borderRadius:'10px'}}>
            Description:{" "}
            <span style={{ fontStyle: "italic", color: "grey" }}>
              {course.description}
            </span>
          </h4>

          <p
            style={{
              width: "85%",
              marginBottom: "10px",
              textAlign: "center",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              marginTop:'20px'
            }}
          >
            Ce cours de programmation en ligne offre une introduction complète
            à {course.course_name}. Que vous soyez débutant ou que vous souhaitiez
              développer vos compétences en programmation, ce cours {" "}
            {course.course_name} couvrira les fondamentaux et vous préparerait
              à des défis plus complexes.
          </p>
          <h4 style={{ marginBottom: "10px" }}>
            Formateur: {course.instructor}
          </h4>
          <h4>Contenu: Video</h4>
          <div>
            <button
              className="enroll-button"
              onClick={() => navigate("/learnings")}
            >
              Retour
            </button>
            <Modal
              title="Note:"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p
                style={{ color: "black", fontWeight: "bold", fontSize: "15px" }}
              >
                Complétez 100% de votre cours pour accéder au Quizz
              </p>
            </Modal>

            {popup && (
              <p
                style={{
                  backgroundColor: "#017bff",
                  width: "30%",
                  padding: "8px",
                  borderRadius: "10px",
                  color: "white",
                  marginLeft: "703px",
                  marginTop: "10px",
                }}
              >
               Complétez 100% de votre cours pour accéder au Quizz
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="pro-report">
      <div className="progress-report-section">
        <div className="progress-section">
          <h3 className="section-title">Progression:</h3>
            <Progress
              percent={Math.ceil((played / duration) * 100)}
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              showInfo={false}
            />
          </div>
          <div className="report-section">
            <h3 className="section-title">Rapport:</h3>
            <p className="completion-text">
              Vous avez terminé{' '}
              <span className="completion-percent">
                {Math.ceil((played / duration) * 100)}%
              </span>{' '}
              de ce cours.
            </p>
          </div>
        </div>
      </div>
      <button className="enroll-button" onClick={()=>navigate(`/discussion/${courseId}`)}>discussion</button>
      <Feedback courseid={courseId} />
    </div>
  );
};

export default Course;
