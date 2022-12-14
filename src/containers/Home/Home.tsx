import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {MealDateNumber, MealsList, MealType} from "../../types";
import axiosApi from "../../axiosApi";
import Meal from "../../components/Meal/Meal";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const date = new Date();
  const existingDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<MealsList | null>('.json');
      let newMeals: MealDateNumber[] = [];
      const meals = mealsResponse.data;

      if (meals) {
        newMeals = Object.keys(meals).map(id => {
          const meal = meals[id];
          const date = meal.date
          const dateNumber = parseFloat(date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10));
          return {
            ...meal,
            id,
            date: dateNumber,
          };
        });
      }

      const resultMeals = newMeals.sort((a, b) => b.date - a.date).map(resultMeal => {
        const date = resultMeal.date.toString();
        return {
          ...resultMeal,
          date: date.slice(0, 4) + '-' + date.slice(4, 6) + '-' +  date.slice(6, 8),
        }
      })

      setMeals(resultMeals);
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchMeals();
    }
  }, [location, fetchMeals]);

  const countTotalPrice = () => {
    return meals.reduce((acc, meal) => {
      if (existingDate === meal.date) {
        return acc + meal.calories;
      } else {
        return acc;
      }
    }, 0);
  }

  return (
    <div className="container mt-3">
      {loading ? <Spinner/> :
        <>
          <div className="row justify-content-between mb-4">
            <span className="col-3 fs-5"><strong>Total calories: {countTotalPrice()} kcal</strong></span>
            <NavLink to="/meals/add" className="btn btn-primary col-2">Add new meal</NavLink>
          </div>
          <div>
            {meals.map(meal => (
              <Meal key={meal.id} meal={meal} fetchResponse={fetchMeals}/>
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default Home;