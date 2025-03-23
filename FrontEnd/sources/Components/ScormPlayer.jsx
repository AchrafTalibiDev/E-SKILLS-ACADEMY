import React, { useEffect, useRef } from "react";
import pipwerks from "pipwerks-scorm-api-wrapper";

const ScormPlayer = ({ courseId }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        pipwerks.SCORM.init();

        const loadScormContent = async () => {
            try {
                // Récupérer l'URL de lancement du cours
                const response = await fetch(`/api/launch-course/${courseId}`);
                const launchUrl = await response.text(); // Assurez-vous que le backend renvoie l'URL en texte

                iframeRef.current.src = launchUrl; // Charger l'URL dans l'iframe

                // Écouter les événements SCORM et sauvegarder
                window.onbeforeunload = () => {
                    pipwerks.SCORM.save();
                    pipwerks.SCORM.quit();
                };
            } catch (error) {
                console.error("Erreur lors du chargement du contenu SCORM:", error);
            }
        };

        loadScormContent();

        return () => {
            pipwerks.SCORM.quit();
        };
    }, [courseId]);

    return (
        <div>
            <iframe
                ref={iframeRef}
                width="100%"
                height="600px"
                title="SCORM Player"
            ></iframe>
        </div>
    );
};

export default ScormPlayer;
