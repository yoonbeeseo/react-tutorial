import React from "react";

const CustomAlert = () => {
  return (
    <div className="fixed w-full h-screen flex justify-center items-center">
      <div className="flex gap-x-2.5 border max-w-100 rounded-md border-gray-200 p-2.5 bg-white shadow-md">
        <img
          src="https://cdn.pixabay.com/photo/2018/06/28/12/34/panda-3503779_640.jpg"
          alt=""
          width={200}
          height={200}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="flex flex-col gap-y-2.5">
          <div>
            <p className="font-bold">title</p>
            <p className="text-gray-600 text-sm leading-[1.2]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores veritatis, neque, officia incidunt labore ipsum ducimus
            </p>
          </div>
          <div className="flex gap-x-2.5">
            <button className="rounded px-2.5 py-1.5 border border-gray-200 text-gray-500 cursor-pointer hover:text-gray-700 hover:border-gray-700 transition">
              확인
            </button>
            <button className="rounded px-2.5 py-1.5 cursor-pointer transition bg-blue-500 text-white hover:bg-blue-400">
              취소
            </button>
          </div>
        </div>
      </div>
      <span className="block absolute w-full h-full -z-1" />
    </div>
  );
};

export default CustomAlert;
