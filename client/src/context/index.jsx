import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { createContext, useContext } from 'react';

const StateContext = createContext();

export default function StateContextProvider({ children }) {
	const { contract } = useContract('0x373f5eA7a27A0a4579e72E826a59aD8054b0bF3D');
	const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
	const address = useAddress();
	const connect = useMetamask();

	const publishCampaign = async (form) => {
		try {
			const data = await createCampaign([
				address,
				form.title,
				form.description,
				form.target,
				new Date(form.deadline).getTime(),
				form.image,
			]);
			console.log('Contract call success!', data);
		} catch (error) {
			console.log('Contract call failure!', error);
		}
	};

	const getCampaigns = async () => {
		const campaigns = await contract?.call('getCampaigns');
		const parsedCampaigns = campaigns?.map((campaign, i) => ({
			owner: campaign.owner,
			title: campaign.title,
			description: campaign.description,
			target: ethers.utils.formatEther(campaign.target.toString()),
			deadline: campaign.deadline.toNumber(),
			amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
			image: campaign.image,
			pid: i,
		}));
		return parsedCampaigns;
	};

	const getUserCampaigns = async () => {
		const allCamapigns = await getCampaigns();
		const filteredCampaigns = allCamapigns.filter((c) => c.owner === address);
		return filteredCampaigns;
	};

	const donate = async (pId, amount) => {
		const data = await contract.call('donateToCampaign', pId, {
			value: ethers.utils.parseEther(amount),
		});
		return data;
	};

	const getDonations = async (pId) => {
		const donations = await contract.call('getDonators', pId);
		const numberOfDonations = donations[0]?.length;
		const parsedDonations = [];
		for (let i = 0; i < numberOfDonations; i++) {
			parsedDonations.push({
				donator: donations[0][i],
				donation: ethers.utils.formatEther(donations[1][i].toString()),
			});
		}
		return parsedDonations;
	};

	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				createCampaign: publishCampaign,
				getCampaigns,
				getUserCampaigns,
				donate,
				getDonations,
			}}
		>
			{children}
		</StateContext.Provider>
	);
}

export function useStateContext() {
	return useContext(StateContext);
}
