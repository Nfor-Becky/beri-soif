import MetricCard from "../../components/Metricard"

const Dashboard = () => {
  return (
    <div className="">
        <h2 className="text-5xl text-center text-navColor font-bold mb-4">Beri Soif Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Stock Value" value="30" />
        <MetricCard title="Total Items in Stock" value="30" />
        <MetricCard title="Low Stock Alerts" value="30" />
        <MetricCard title="Recent Stock Movements" value="30" />

    </div>
    </div>
  )
}

export default Dashboard
