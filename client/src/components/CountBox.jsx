import React from 'react';

function CountBox({ title, value }) {
	return (
		<div className="flex flex-col items-center w-[150px]">
			<h4 className="w-full font-epilogue font-bold text-[30px] text-white bg-[#1c1c24] rounded-t-[10px] text-center truncate">
				{value}
			</h4>
			<p className="w-full font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 rounded-b-[10px] text-center">
				{title}
			</p>
		</div>
	);
}

export default CountBox;
