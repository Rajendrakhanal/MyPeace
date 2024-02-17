import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { INotification } from "../types/notification";

interface LandingPageProps {
  notification: INotification | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ notification }) => {
  return (
    <div
      className={`flex flex-col md:flex-row px-16 ${notification ? "py-3 md:py-5" : "py-8 md:py-16"} items-center text-center justify-center`}
    >
      <img
        src="/landing_page.jpg"
        alt="MyPeace Landing Page Image"
        className="mb-8 md:mb-0 w-[400px] md:w-[325px] lg:w-[500px]"
      />

      <div className="ml-0 md:ml-16 text-left my-auto">
        <div className="flex flex-col gap-2 text-4xl md:text-5xl font-semibold mb-4">
          <div>Get Emotional</div>
          <div>Health Support</div>
          <div>Now</div>
        </div>

        <div className="flex flex-col text-lg md:text-xl">
          <div>
            Use our<span className="font-medium"> AI-powered Assistant </span>
            for Your
            <br />
            <span className="font-medium">
              {" "}
              Complete Emotional Health Support
            </span>
          </div>

          <Link to="/signup">
            <button className="flex flex-row justify-center items-center gap-2 mt-5 px-5 py-3 w-18 text-white font-bold tracking-wide rounded-full bg-[#11253e] hover:bg-gray-900">
              Get Started <MdArrowForwardIos />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
