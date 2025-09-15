import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { UserSigned } = useContext(DataContext)!;
  const page = UserSigned === true ? "/dashboard" : "/";
  console.log(page);
  

  useEffect(() => {
    const navHome = setTimeout(() => {
      navigate(page);
    }, 2000);

    return () => clearTimeout(navHome);
  }, []);

  return (
    <div className="min-h-screen text-white pt-4 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 mt-10">
        <h1 className="font-semibold text-3xl text-center text-blue-400">
          ERROR
        </h1>
      </div>
      <div className="flex flex-col gap-3 border rounded-b-2xl border-white/10 p-4 pb-8  ">
        <div className="flex flex-col justify-center items-center flex-1 text-3xl text-white/40 capitalize p-8">
          page not found
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
