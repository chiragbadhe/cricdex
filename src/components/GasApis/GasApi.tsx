import { useEffect, useState } from "react";
import axios from "axios";
import { useNetwork } from "wagmi";

const GasApis: React.FC = () => {
  const [gasData, setGasData] = useState<any | null>(null); // Adjust the type according to the actual structure of your gas data
  const { chain, chains } = useNetwork();

  console.log(chain?.id);

  useEffect(() => {
    const fetchData = async () => {
      const chainId = chain?.id; // Replace with your actual chain ID
      const Auth = "YOUR_AUTH_TOKEN"; // Replace with your actual authorization token

      try {
        const { data } = await axios.get(
          `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
          {
            headers: {
              Authorization: `Basic ${Auth}`,
            },
          }
        );
        console.log("Suggested gas fees:", data);
        setGasData(data); // Store the fetched data in state
      } catch (error) {
        console.log("Server responded with:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Your page content */}
      {gasData && (
        <div>
          <h2>Suggested Gas Fees:</h2>
          {/* Render and format the gasData as needed */}
          <pre>{JSON.stringify(gasData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GasApis;
