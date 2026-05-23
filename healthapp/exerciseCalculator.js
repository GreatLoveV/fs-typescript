"use strict";
const intakeArguments = (argv) => {
  if (argv.length < 4) {
    throw new Error("No valid args");
  }
  const args = argv.slice(2);
  args.forEach((a) => {
    if (isNaN(Number(a))) {
      throw new Error(" all arguments must be numbers");
    }
  });
  const target = Number(args[0]);
  const dailyHours = args.slice(1).map((d) => Number(d));
  return {
    target,
    dailyHours,
  };
};
const calculateExercises = (target, dailyHours) => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
  const success = average >= target ? true : false;
  let rating;
  let ratingDescription;
  const percentage = (average / target) * 100;
  if (percentage >= 100) {
    rating = 3;
    ratingDescription = "Target met, great job!";
  } else if (percentage >= 75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You missed the target by a significant margin";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


  try {
    const { target, dailyHours } = intakeArguments(process.argv);
    console.log(calculateExercises(target, dailyHours));
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }



