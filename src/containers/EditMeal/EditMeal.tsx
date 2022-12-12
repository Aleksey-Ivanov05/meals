import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {MealApi} from "../../types";
import axiosApi from "../../axiosApi";
import MealForm from "../../components/MealForm/MealForm";

const EditMeal = () => {
  const {id} = useParams();
  const [meal, setMeal] = useState<MealApi | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOneMeal = useCallback(async () => {
    const mealResponse = await axiosApi.get<MealApi>('/' + id + '.json');
    setMeal(mealResponse.data);
  }, [id]);

  useEffect(() => {
    void fetchOneMeal();
  }, [fetchOneMeal]);

  const updateMeal = async (meal: MealApi) => {
    try {
      setLoading(true);
      await axiosApi.put('/' + id + '.json', meal);
    } finally {
      setLoading(false);
    }
  }

  const existingMeal = meal && {
    ...meal,
    calories: meal.calories.toString(),
  }
  
  return (
    <div>
      {existingMeal && <MealForm onSubmit={updateMeal} existingMeal={existingMeal} isEdit isLoading={loading}/>}
    </div>
  );
};

export default EditMeal;