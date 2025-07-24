package com.ipl.Predictor;

import java.util.Map;

@Service
public class PredictorService {

    public Map<String, Double> predict(InputData input) throws IOException {
        PythonPredictorClient client = new PythonPredictorClient();
        double[] probs = client.predict(input);

        Map<String, Double> result = new HashMap<>();
        result.put("team1_win_prob", Math.round(probs[0] * 10000.0) / 100.0);
        result.put("team2_win_prob", Math.round(probs[1] * 10000.0) / 100.0);
        return result;
    }
}
