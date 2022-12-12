import React, {useState} from 'react';
import {MealApi, MealMutation} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (meal: MealApi) => void;
  existingMeal?: MealMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const initialState = {
  time: '',
  description: '',
  calories: '',
}

const MealForm:React.FC<Props> = ({onSubmit, existingMeal = initialState, isEdit = false, isLoading = false}) => {
  const [meal, setMeal] = useState(existingMeal);
  const onMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setMeal(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...meal,
      calories: parseFloat(meal.calories),
    });
  }

  return (
    <div className="container">
      <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit meal' : 'Add new meal'} </h4>
      <div className="form-group mt-3">
        <label htmlFor="time">Time</label>
        <select id="time" name="time" className="form-control form-select" value={meal.time} onChange={onMealChange}>
          <option disabled value=""></option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Snack">Snack</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="description">Meal description</label>
        <input type="text"
               id="description" name="description"
               className="form-control"
               value={meal.description}
               onChange={onMealChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="calories">Calories</label>
        <input
          id="calories" name="calories" type="number"
          className="form-control w-25"
          value={meal.calories}
          onChange={onMealChange}
        />
      </div>
      <button type="submit" disabled={isLoading} className="btn btn-primary mt-3">{isLoading && <ButtonSpinner/>}{isEdit ? 'Save' : 'Add'}</button>
    </form>
    </div>

  );
};

export default MealForm;