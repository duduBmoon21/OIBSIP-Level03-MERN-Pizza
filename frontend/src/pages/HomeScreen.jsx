import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import { getUserDetails } from '../redux/asyncThunks/userThunks';

// Import Components
import FeaturedPizzasSection from '../components/Home/FeaturedPizzasSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import Jumbotron from '../components/Home/Jumbotron';


function HomeScreen() {
 

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails({}));
    }

    if (userDetails && !userDetails.isVerified) {
      setModalVisible(true);
    }
  }, [dispatch, userDetails]);

  return (
    <>
      <Jumbotron />
      <FeaturedPizzasSection />
      <HowItWorksSection />
    
    </>
  );
}

export default HomeScreen;
