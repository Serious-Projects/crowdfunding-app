import { useEffect, useState } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';
import { useStateContext } from '../context';

function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [campaigns, setCampaigns] = useState([]);
	const { address, contract, getCampaigns } = useStateContext();

	const fetchCampaigns = async () => {
		setIsLoading(true);
		const data = await getCampaigns();
		setCampaigns(data);
		setIsLoading(false);
	};

	useEffect(() => {
		if (getCampaigns) {
			fetchCampaigns();
		}
	}, [address, contract]);

	return <DisplayCampaigns title="All Campaigns" isLoading={isLoading} campaigns={campaigns} />;
}

export default Home;
