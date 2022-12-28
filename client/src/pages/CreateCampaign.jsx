import { ethers } from 'ethers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { useStateContext } from '../context';
import { checkIfImage } from '../data/utils';

function CreateCampaign() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		name: '',
		title: '',
		description: '',
		target: '',
		deadline: '',
		image: '',
	});
	const { createCampaign } = useStateContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		checkIfImage(form.image, async (exists) => {
			if (exists) {
				setIsLoading(true);
				await createCampaign({
					...form,
					target: ethers.utils.parseUnits(form.target, 18),
				});
				setIsLoading(false);
				navigate('/');
			} else {
				alert('Provide valid image URL.');
				setForm({ ...form, image: '' });
			}
		});
	};

	const handleFormFieldChange = (fieldName, e) => {
		setForm((prevFormState) => ({
			...prevFormState,
			[fieldName]: e.target.value,
		}));
	};

	return (
		<div className="flex justify-center items-center flex-col rounded-[10px] p-4 bg-[#1c1c24] sm:p-10">
			{isLoading && <Loader />}
			<div className="flex justify-center items-center p-[16px] bg-[#3a3a43] rounded-[10px] sm:min-w-[380px]">
				<h1 className="font-epilogue font-bold text-[18px] leading-[38px] text-white sm:text-[25px]">
					Start A Campaign
				</h1>
			</div>

			<form className="w-full mt-[65px] flex flex-col gap-[30px]" onSubmit={handleSubmit}>
				<div className="flex flex-wrap gap-[40px]">
					<FormField
						labelName="Your Name *"
						placeholder="John Doe"
						inputType="text"
						value={form.name}
						handleChange={(e) => handleFormFieldChange('name', e)}
					/>

					<FormField
						labelName="Campaign Title *"
						placeholder="Write a title"
						inputType="text"
						value={form.title}
						handleChange={(e) => handleFormFieldChange('title', e)}
					/>
				</div>

				<FormField
					labelName="Story *"
					placeholder="Write your story"
					isTextArea
					value={form.description}
					handleChange={(e) => handleFormFieldChange('description', e)}
				/>

				<div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
					<img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
					<h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
						Your will get 100% of the raised amount
					</h4>
				</div>

				<div className="flex flex-wrap gap-[40px]">
					<FormField
						labelName="Goal *"
						placeholder="Eth 0.50"
						inputType="text"
						value={form.target}
						handleChange={(e) => handleFormFieldChange('target', e)}
					/>

					<FormField
						labelName="End Date *"
						placeholder="End Date"
						inputType="date"
						value={form.deadline}
						handleChange={(e) => handleFormFieldChange('deadline', e)}
					/>
				</div>

				<FormField
					labelName="Campaign Image *"
					placeholder="Place image url of your campaign"
					inputType="url"
					value={form.image}
					handleChange={(e) => handleFormFieldChange('image', e)}
				/>

				<div className="flex justify-center items-center mt-[40px]">
					<CustomButton btnType="submit" title="Submit new campaign" styles="bg-[#1dc071]" />
				</div>
			</form>
		</div>
	);
}

export default CreateCampaign;
