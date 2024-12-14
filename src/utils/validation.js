export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateWorkoutData = (workout) => {
  if (!workout.name?.trim()) {
    throw new Error('Workout name is required');
  }

  if (!workout.exercises?.length) {
    throw new Error('At least one exercise is required');
  }

  workout.exercises.forEach(exercise => {
    if (!exercise.name?.trim()) {
      throw new Error('Exercise name is required');
    }
    if (!exercise.sets?.trim() || !exercise.reps?.trim()) {
      throw new Error('Sets and reps are required for each exercise');
    }
  });

  return true;
};

export const validateDietEntry = (entry) => {
  if (!entry.mealType) {
    throw new Error('Meal type is required');
  }

  if (!entry.calories || entry.calories < 0) {
    throw new Error('Valid calorie count is required');
  }

  return true;
};