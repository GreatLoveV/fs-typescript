import express from "express";
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const heightQuery = req.query.height;
  const weightQuery = req.query.weight;

  if (!heightQuery || !weightQuery) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const height = Number(heightQuery);
  const weight = Number(weightQuery);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const hasInvalidValues = daily_exercises.some((d) => isNaN(Number(d)));

  if (hasInvalidValues || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const dailyExercise = daily_exercises.map((d) => Number(d));
  const targetValue = Number(target);

  const result = calculateExercises(targetValue, dailyExercise);

  return res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server up at port ${PORT}`);
});
