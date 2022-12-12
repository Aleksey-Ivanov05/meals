import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {MealsList, MealType} from "../../types";
import axiosApi from "../../axiosApi";
import Meal from "../../components/Meal/Meal";

const Home = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const location = useLocation();

  const fetchMeals = useCallback(async () => {
    const mealsResponse = await axiosApi.get<MealsList | null>('.json');
    let newMeals: MealType[] = [];
    const meals = mealsResponse.data;

    if (meals) {
      newMeals = Object.keys(meals).map(id => {
        const meal = meals[id];
        return {
          ...meal,
          id,
        };
      });
    }

    setMeals(newMeals);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchMeals();
    }
  }, [location, fetchMeals]);

  const countTotalPrice = () => {
    return meals.reduce((acc, meal) => {
      return acc + meal.calories;
    }, 0);
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-between mb-4">
        <span className="col-3">Total calories: {countTotalPrice()}</span>
        <NavLink to="/meals/add" className="btn btn-primary col-2">Add new meal</NavLink>
      </div>
      <div>
        {meals.map(meal => (
          <Meal key={meal.id} meal={meal} fetchResponse={fetchMeals}/>
        ))}
      </div>
    </div>
  );
};

export default Home;