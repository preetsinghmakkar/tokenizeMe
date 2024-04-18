import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { UserIdState } from "../../atom/userAtom";
import { FetchProfileState } from "../../atom/fetchProfile";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProfile() {
  const userId = useRecoilValue(UserIdState);

  const [profilePic, setImage] = useState(null);
  const [bio, setBio] = useState("");

  const setFetchProfileState = useSetRecoilState(FetchProfileState);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profilePic", profilePic);
      formData.append("bio", bio);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result;

        try {
          await axios.post(`/api/users/profile/profileImage/${userId}`, {
            profilePic: imageUrl,
            bio: bio,
          });
          setFetchProfileState(true);
        } catch (error) {
          toast.error("Error in Uploading Profile Image");
          <ToastContainer />;
        }
      };
      reader.readAsDataURL(profilePic);
    } catch (error) {
      toast.error("Error in Uploading Profile and Bio");
    }
  };

  const handleSkip = async (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center mb-4">
          {profilePic ? (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <label htmlFor="profile-image" className="cursor-pointer">
              <BiImageAdd className="text-gray-400 w-24 h-24" />
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        <h4>
          <b>Bio</b>
        </h4>
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Write something about yourself..."
          className="w-full h-40 p-4 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-500"
        ></textarea>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSkip}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Skip
          </button>
          <button
            type="submit"
            className="mt-4 ml-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProfile;
