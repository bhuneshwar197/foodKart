package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.model.Feedback;
import com.foodkart.foodkart.service.AdminService;
import com.foodkart.foodkart.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Simpson Alfred
 */
@CrossOrigin("http://localhost:3000") //allowing client application to consume the backed
@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping("/get-all-feedback")
    public ResponseEntity<List<Feedback>> getAllFeedback(){
        return new ResponseEntity<>(feedbackService.getAllFeedback(), HttpStatus.FOUND);
    }

    @GetMapping("/get-feedback-by-email/{email}")
    public ResponseEntity<List<Feedback>> getFeedbackByEmail(@PathVariable String email){
        return new ResponseEntity<>(feedbackService.getFeedbackByEmail(email), HttpStatus.FOUND);
    }

    @PostMapping("/create-feedback")
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.createFeedback(feedback);
    }

    @DeleteMapping("/delete-feedback-by-email/{email}")
    public void deleteFeedback(@PathVariable String email){
        feedbackService.deleteFeedback(email);
    }

}
