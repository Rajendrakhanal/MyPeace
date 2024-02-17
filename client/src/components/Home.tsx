import userService from "../services/user";

const Home = () => {
  const user = userService.getUser();

  return (
    <div
      className={`flex flex-col justify-center mx-auto max-w-screen-lg py-12`}
    >
      Start the questionairre here
      <div>
        Hello, {user?.firstName} {user?.lastName}
      </div>
    </div>
  );
};

export default Home;
