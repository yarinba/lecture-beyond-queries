import { useQuery, gql } from '@apollo/client';

const GET_MARKETPLACES = gql`
  query GetMarketplaces {
    marketplaces {
      _id
      name
    }
  }
`;

interface MarketplaceSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarketplaceSelect({ value, onChange }: MarketplaceSelectProps) {
  const { loading, error, data } = useQuery(GET_MARKETPLACES);

  if (loading) {
    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-400">
        Loading marketplaces...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>
          Select a marketplace
        </option>
        {data.marketplaces.map((marketplace: any) => (
          <option
            key={marketplace._id}
            value={marketplace._id}
            className="bg-gray-950 text-white"
          >
            {marketplace.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
