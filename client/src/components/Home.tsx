import userService from "../services/user";
import Questionnaire from "./Questionairre";

const Home = () => {
  const user = userService.getUser();

  return (
    <div
      className={`flex flex-col justify-center mx-auto max-w-screen-lg py-12`}
    >
      <div className="text-2xl font-bold text-center mb-4">
        Welcome, {user?.firstName}!
      </div>

      <div className="text-center mb-4 text-gray-700 dark:text-gray-300">
        Please take the time to fill out the questionnaire below.
        <br />
        This will help us better understand your mental health and how we can
        help you.
      </div>

      <Questionnaire />
    </div>
  );
};

export default Home;
