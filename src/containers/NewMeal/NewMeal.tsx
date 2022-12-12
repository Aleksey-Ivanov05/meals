import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {MealApi} from "../../types";
import MealForm from "../../components/MealForm/MealForm";

const NewMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addNewMeal = async (meal: MealApi) => {
    try {
      setLoading(true);
      await axiosApi.post('.json', meal);
      navigate('/');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <MealForm onSubmit={addNewMeal} isLoading={loading}/>
    </div>
  );
};

export default NewMeal;