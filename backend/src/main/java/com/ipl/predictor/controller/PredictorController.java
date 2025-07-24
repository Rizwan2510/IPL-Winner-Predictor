package com.ipl.Predictor;

import  com.ipl.Predictor.service.PredictorService;

@RestController
@RequestMapping("/predict")
public class PredictorController {

    @Autowired
    private PredictorService service;

    @PostMapping
    public ResponseEntity<Map<String, Double>> predict(@RequestBody InputData input) {
        try {
            Map<String, Double> response = service.predict(input);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
