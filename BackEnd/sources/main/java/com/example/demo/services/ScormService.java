package com.example.demo.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class ScormService {

    private final OkHttpClient client = new OkHttpClient();
    private final String SCORM_API_URL = "https://cloud.scorm.com/api/v2/";
    private final String API_KEY = "NUlwmoWAWVh5aEBV3UUJDU1MdoGFp9HnnRvdLVad";

    // Méthode pour tester la connexion en récupérant la liste des cours
    public String testConnection() throws IOException {
        Request request = new Request.Builder()
                .url(SCORM_API_URL + "/courses")
                .header("Authorization", "Bearer " + API_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                return "Erreur : " + response.message();
            }
            return response.body().string(); // Renvoyer la réponse JSON si la connexion est réussie
        }
    }
    public String getLaunchUrl(String courseId) throws IOException {
        String launchRequestUrl = SCORM_API_URL + "/courses/" + courseId + "/launchLink";

        Request request = new Request.Builder()
                .url(launchRequestUrl)
                .header("Authorization", "Bearer " + API_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur lors de la récupération de l'URL de lancement : " + response.message());
            }
            return response.body().string(); // L'URL de lancement sera dans la réponse JSON
        }
    }

}
