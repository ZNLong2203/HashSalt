import React from 'react';

const Profile= () => {
  return (
    <div className="min-h-screen bg-teal-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg max-w-sm w-full">
        <div className="bg-cover h-28" style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}></div>
        <div className="flex justify-center -mt-12">
          <img
            className="rounded-full border-4 border-white"
            src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            alt="Rita Correia"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold">User <span className="text-gray-500 ml-1">32</span></h2>
          <p className="text-gray-600">VietNam</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h2 className="text-lg font-bold">0</h2>
              <span className="text-gray-500">Followers</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">0</h2>
              <span className="text-gray-500">Likes</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">0</h2>
              <span className="text-gray-500">Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
