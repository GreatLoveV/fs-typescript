"use strict";
const parseArguments = (argv) => {
    if (argv.length > 4 || argv.length < 4) {
        throw new Error("Not the right amount of arguments");
    }
    if (!isNaN(Number(argv[2])) && !isNaN(Number(argv[3]))) {
        return {
            height: Number(argv[2]),
            weight: Number(argv[3]),
        };
    }
    else {
        throw new Error("Provided values were not numbers");
    }
};
const calculateBmi = (height, weight) => {
    const heightInM = height / 100;
    const bmi = weight / heightInM ** 2;
    if (bmi < 18.5) {
        return "Underweight range";
    }
    else if (18.5 <= bmi && bmi <= 24.9) {
        return "Normal range";
    }
    else if (25.0 <= bmi && bmi <= 29.9) {
        return "Overweight range";
    }
    else {
        return "Obese range";
    }
};
try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
}
catch (error) {
    let errorMessage = "Something wrong happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
