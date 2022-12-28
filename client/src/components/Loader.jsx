import { loader } from '../assets';

function Loader() {
	return (
		<div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center flex-col">
			<img src={loader} alt="Loader" className="w-[100px] h-[100px] object-contain" />
			<p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
				Transaction is in progress <br />
				Please wait...
			</p>
		</div>
	);
}

export default Loader;
