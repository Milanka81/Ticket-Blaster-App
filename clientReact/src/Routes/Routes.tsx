import { createBrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import EventPage from "../Pages/EventPage/EventPage";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import ShoppingCartPage from "../Pages/ShoppingCartPage/ShoppingCartPage";
import UserDetailsPage from "../Pages/UserDetailsPage/UserDetailsPage";
import TicketHistoryPage from "../Pages/TicketHistoryPage/TicketHistoryPage";
import AllUsersPage from "../Pages/AllUsersPage/AllUsersPage";
import AdminEventsPage from "../Pages/AdminEventsPage/AdminEventsPage";
import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import ViewEvent from "../Components/ViewEvent/ViewEvent";
import ThankYouPage from "../Pages/ThankYouPage/ThankYouPage";
import ProtectedRoutes from "../Pages/ProtectedRoutes";
import AdminRoutes from "../Pages/AdminRoutes";
import Error from "../Pages/Error";

const stripePromise = loadStripe(
  "pk_test_51Px6L7Rr71tg4yvXK2U9aiuumSrEzxap2KNix5lbEezZeoc0qvxcvtGtts2jeXVTTeTaz7QP9xu61FqUnmNPIz3O00cMIG1E50"
);
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "verify-email/:token", element: <VerifyEmail /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
      { path: "", element: <HomePage /> },

      {
        path: "events",
        element: <EventsPage />,
      },
      { path: "user-details", element: <UserDetailsPage /> },
      {
        path: "events/:eventId",
        element: <ViewEvent />,
      },
      {
        path: "ecommerce",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "shopping-cart",
            element: <ShoppingCartPage />,
          },
          {
            path: "checkout",
            element: (
              <Elements stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            ),
          },
          {
            path: "tickets",
            element: <ThankYouPage />,
          },

          {
            path: "tickets-history",
            element: <TicketHistoryPage />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminRoutes />,
        children: [
          {
            path: "events",
            element: <AdminEventsPage />,
          },
          {
            path: "edit/:eventId",
            element: <EventPage componentState="edit" />,
          },
          {
            path: "create-event",
            element: <EventPage componentState="add" />,
          },
          { path: "users", element: <AllUsersPage /> },
        ],
      },
    ],
  },
]);
