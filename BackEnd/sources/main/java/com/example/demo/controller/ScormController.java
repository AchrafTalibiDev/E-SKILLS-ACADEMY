package com.example.demo.controller;
import com.example.demo.service.ScormService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;

@RestController
public class ScormController {

    private final ScormService scormService;

    public ScormController(ScormService scormService) {
        this.scormService = scormService;
    }

    @GetMapping("/api/test-scorm-connection")
    public String testScormConnection() {
        try {
            return scormService.testConnection();
        } catch (IOException e) {
            return "Erreur de connexion à SCORM Cloud : " + e.getMessage();
        }
    }

    // Endpoint pour lancer un cours SCORM
    @GetMapping("/api/launch-course/{courseId}")
    public String launchCourse(@PathVariable String courseId) {
        try {
            return scormService.getLaunchUrl(courseId); // Récupère l'URL de lancement
        } catch (IOException e) {
            return "Erreur lors de la récupération de l'URL de lancement : " + e.getMessage();
        }
    }
}

