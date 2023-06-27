import { showAlert } from './alerts';
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51NNUzRDdBsc56zvHBdySUostnKQQErV36zmtkq5yt991q5bTshQaoUD82JEWbLrwe5oh53uW33vz5mdIc8z1WANo004mXgQwEV'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
