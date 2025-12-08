package com.example.CreArte.Controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // permite cualquier origen
public class ChatbotController {

    @PostMapping("/chatbot")
    public Map<String, String> chatbot(@RequestBody Map<String, String> payload) {
        String category = payload.get("userRequest"); // recibe directamente la categoría que ya calculas en Voiceflow

        Map<String, String> result = new HashMap<>();
        result.put("category", category); // devuelve exactamente lo que recibe
        return result;
    }




}
