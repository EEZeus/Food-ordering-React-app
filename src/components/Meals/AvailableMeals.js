import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setIsLoading(true)
    setError(null)
    
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-app-b6b2b-default-rtdb.firebaseio.com/meals.json"
      );
        
      if (!response.ok) {
        console.log("error");
        throw new Error("Problem with fetching data");
      }
      const data = await response.json();
          
      const loadedMeals = [];
      
      for (let key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false)
    }
    fetchMeals().catch((err) => { 
      setError(err.message)
      setIsLoading(false)
    });
},[])
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && <p className={classes.isLoading}>loading ...</p>}
        {error && <p className={classes.error}>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
