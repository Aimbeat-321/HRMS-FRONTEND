import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts";

const fills = ["#5ed790", "#ac5ade", "#62dce4"];
const data = [
  { name: "Office", value: 60 },
  { name: "Hybrid", value: 30 },
  { name: "Remote", value: 10 },
].map((item, index) => ({ ...item, fill: fills[index % fills.length] }));

const WorkingFormatChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xs border border-gray-200 p-4 w-full max-w-3xl mx-auto h-auto min-h-[300px] sm:min-h-[330px] md:min-h-[360px]">
        {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-gray-600">Person</h3>
                <span className="text-sm text-gray-400">Details</span>
            </div>

      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="40%" 
            outerRadius="80%" 
            data={data} 
            startAngle={90} 
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl sm:text-2xl font-proximaExtraBold text-dark"
            >
              418
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm sm:text-md font-proximaRegular text-dark-light"
            >
              Days
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-around mt-2 sm:mt-3 text-xs sm:text-sm font-proximaRegular gap-2 sm:gap-4">
          {data.map((item, index) => (
            <span key={item.name} className="flex items-center">
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 mr-1 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></span>
              {`${item.value}% ${item.name}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingFormatChart;