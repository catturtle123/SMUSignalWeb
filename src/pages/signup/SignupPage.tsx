import React, { useState } from "react";
import femaleIcon from "../../assets/female.png";
import maleIcon from "../../assets/male.png";

type Gender = "male" | "female" | null;

const SignupPage: React.FC = () => {
  const [selectedGender, setSelectedGender] =
    useState<Gender>(null);

  const handleGenderSelect = (gender: "male" | "female") => {
    if (selectedGender === gender) {
      setSelectedGender(null);
    } else {
      setSelectedGender(gender);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold text-left mb-6">
        성별을 알려주세요.
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer ${
            selectedGender === "male"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => handleGenderSelect("male")}
        >
          <div className="w-16 h-16 mb-2">
            <img
              src={maleIcon}
              alt="남성"
              className="w-full h-full"
            />
          </div>
          <span className="text-sm font-medium">남성</span>
        </div>

        <div
          className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer ${
            selectedGender === "female"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => handleGenderSelect("female")}
        >
          <div className="w-16 h-16 mb-2">
            <img
              src={femaleIcon}
              alt="여성"
              className="w-full h-full"
            />
          </div>
          <span className="text-sm font-medium">여성</span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
