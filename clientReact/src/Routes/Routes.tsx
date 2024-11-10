import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import EventPage from "../Pages/EventPage/EventPage";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import PrintTicketPage from "../Pages/PrintTicketPage/PrintTicketPage";
import ShoppingCartPage from "../Pages/ShoppingCartPage/ShoppingCartPage";
import UserDetailsPage from "../Pages/UserDetailsPage/UserDetailsPage";
import TicketHistoryPage from "../Pages/TicketHistoryPage/TicketHistoryPage";
import BoughtTicketsPage from "../Pages/BoughtTicketsPage/BoughtTicketsPage";
import AllUsersPage from "../Pages/AllUsersPage/AllUsersPage";
import AdminEventsPage from "../Pages/AdminEventsPage/AdminEventsPage";
import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import ViewEvent from "../Components/ViewEvent/ViewEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "verify-email/:token", element: <VerifyEmail /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
      { path: "", element: <HomePage /> },
      { path: "user-details", element: <UserDetailsPage /> },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "events/:eventId",
        element: <ViewEvent />,
      },
      {
        path: "events/edit/:eventId",
        element: <EventPage componentState="edit" />,
      },
      { path: "shopping-cart", element: <ShoppingCartPage /> },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "tickets",
        element: <BoughtTicketsPage />,
        children: [{ path: ":ticketId", element: <PrintTicketPage /> }],
      },
      { path: "tickets-history", element: <TicketHistoryPage /> },
      {
        path: "admin-events",
        element: <AdminEventsPage />,
      },
      {
        path: "admin-events/create-event",
        element: <EventPage componentState="add" />,
      },
      { path: "all-users", element: <AllUsersPage /> },
    ],
  },
]);
