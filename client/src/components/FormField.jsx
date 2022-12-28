function FormField({
	labelName,
	placeholder,
	inputType,
	isTextArea,
	value,
	handleChange,
}) {
	return (
		<label className="w-full flex flex-1 flex-col">
			{labelName && (
				<span className="text-[14px] mb-[10px] font-epilogue font-medium leading-[22px] text-[#808191]">
					{labelName}
				</span>
			)}
			{isTextArea ? (
				<textarea
					value={value}
					onChange={handleChange}
					rows={10}
					placeholder={placeholder}
					className="py-[15px] px-[15px] outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] rounded-[10px] placeholder:text-[#4b5264] sm:min-w-[300px] sm:px-[25px]"
					required
				/>
			) : (
				<input
					type={inputType}
					value={value}
					onChange={handleChange}
					step="0.1"
					placeholder={placeholder}
					className="py-[15px] px-[15px] outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] rounded-[10px] placeholder:text-[#4b5264] sm:min-w-[300px] sm:px-[25px]"
					required
				/>
			)}
		</label>
	);
}

export default FormField;
