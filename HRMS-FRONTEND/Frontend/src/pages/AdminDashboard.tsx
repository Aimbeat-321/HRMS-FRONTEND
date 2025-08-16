import * as React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Plus, Search, Globe, Clock, Building, CheckCircle, Loader2, BadgeCheck, Wallet, Calendar, Users, DollarSign, ChartLine, FileText, BookOpen, Shield, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import DashCard from '../components/DashCard';

import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import * as Tabs from '@radix-ui/react-tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [selectedBranch, setSelectedBranch] = useState('All Branches');
    const [time, setTime] = useState(new Date());
    const [headcountView, setHeadcountView] = useState<'department' | 'grade' | 'location'>('department');
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    useEffect(() => {
        dispatch(setPageTitle('Super Admin Dashboard'));
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, [dispatch]);

    const branches = ['All Branches', 'HQ', 'Branch A', 'Branch B'];
    const languages = ['English', 'Spanish', 'French', 'German'];
    const timezones = ['UTC-05:00 EST', 'UTC-08:00 PST', 'UTC+01:00 CET'];

    const kpiData = [
        { title: 'Total Employees', value: '1,245', percentage: '3', trend: 'up', icon: <Users size={20} /> },
        { title: 'Attendance Today', value: '980 / 120 / 45', subText: 'Present / Absent / Late', icon: <CheckCircle size={20} /> },
        { title: 'Active Job Openings', value: '18 | 142', subText: 'Openings | Candidates', icon: <FileText size={20} /> },
        { title: 'Pending Approvals', value: '26', subText: 'Pending', icon: <Loader2 size={20} /> },
        { title: 'Payroll Status', value: '75%', subText: 'Payday: Aug 30', icon: <DollarSign size={20} /> },
        { title: 'Attrition Rate', value: '7.8%', percentage: '0.5', trend: 'down', icon: <ChartLine size={20} /> },
        { title: 'Training Completion', value: '84%', percentage: '4', trend: 'up', icon: <BookOpen size={20} /> },
        { title: 'Compliance Status', value: '96%', subText: 'Compliant', icon: <Shield size={20} /> },
    ];

    const pendingActions = [
        {
            tab: 'My Approvals',
            items: [
                { id: '#01', date: 'Aug 10, 2025', name: 'Eric Page', type: 'Vacation', status: 'Approved' },
                { id: '#02', date: 'Aug 12, 2025', name: 'Nita Parr', type: 'Sick Leave', status: 'Pending' },
                { id: '#03', date: 'Aug 13, 2025', name: 'Mark Wong', type: 'WFH', status: 'Pending' },
            ],
        },
        {
            tab: 'Overdue Tasks',
            items: [
                { id: '#T01', description: 'Compliance Renewal', due: 'Aug 15, 2025' },
                { id: '#T02', description: 'Payroll Submission', due: 'Aug 16, 2025' },
            ],
        },
        {
            tab: 'Announcements',
            items: [
                { id: '#A01', title: 'New HR Policy Update', date: 'Aug 14, 2025' },
                { id: '#A02', title: 'Office Closure Notice', date: 'Aug 15, 2025' },
            ],
        },
        {
            tab: 'Upcoming Events',
            items: [
                { id: '#E01', title: 'Excel Training', date: 'Sep 12, 2025' },
                { id: '#E02', title: 'Quarterly All-Hands', date: 'Sep 30, 2025' },
            ],
        },
    ];

    const activityFeed = [
        { id: 1, text: 'John Doe approved Leave Request #1023', time: '2h ago' },
        { id: 2, text: 'Payroll for July 2025 finalized', time: '5h ago' },
        { id: 3, text: 'New hire onboarded – Sarah Lee', time: '1d ago' },
        { id: 4, text: 'Training: Advanced Excel scheduled for Sep 12', time: '2d ago' },
        { id: 5, text: 'Compliance audit completed successfully', time: '3d ago' },
    ];

    const departmentData = [
        { name: 'Engineering', value: 35, color: '#4f46e5' },
        { name: 'Marketing', value: 20, color: '#0ea5e9' },
        { name: 'Sales', value: 18, color: '#10b981' },
        { name: 'HR', value: 15, color: '#f59e0b' },
        { name: 'Operations', value: 12, color: '#ef4444' },
    ];

    const gradeData = [
        { name: 'Executive', value: 8, color: '#4f46e5' },
        { name: 'Senior', value: 32, color: '#0ea5e9' },
        { name: 'Mid-Level', value: 45, color: '#10b981' },
        { name: 'Junior', value: 35, color: '#f59e0b' },
        { name: 'Entry', value: 25, color: '#ef4444' },
    ];

    const locationData = [
        { name: 'Headquarters', value: 60, color: '#4f46e5' },
        { name: 'East Branch', value: 25, color: '#0ea5e9' },
        { name: 'West Branch', value: 15, color: '#10b981' },
        { name: 'Remote', value: 45, color: '#f59e0b' },
    ];

    // Get data based on current view
    const getHeadcountData = () => {
        switch (headcountView) {
            case 'grade':
                return gradeData;
            case 'location':
                return locationData;
            default:
                return departmentData;
        }
    };

    // Simple SVG-based Line Chart Component
    const WorkingFormatChart = () => (
        <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-between">
                <div className="flex justify-between text-xs text-gray-400">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                </div>
            </div>
            <svg viewBox="0 0 300 150" className="w-full h-full">
                {/* Grid lines */}
                <line x1="0" y1="30" x2="300" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="120" x2="300" y2="120" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />

                {/* Data line */}
                <polyline points="10,120 50,90 90,60 130,100 170,40 210,80 250,50 290,70" fill="none" stroke="#4f46e5" strokeWidth="3" />

                {/* Data points */}
                <circle cx="10" cy="120" r="4" fill="#4f46e5" />
                <circle cx="50" cy="90" r="4" fill="#4f46e5" />
                <circle cx="90" cy="60" r="4" fill="#4f46e5" />
                <circle cx="130" cy="100" r="4" fill="#4f46e5" />
                <circle cx="170" cy="40" r="4" fill="#4f46e5" />
                <circle cx="210" cy="80" r="4" fill="#4f46e5" />
                <circle cx="250" cy="50" r="4" fill="#4f46e5" />
                <circle cx="290" cy="70" r="4" fill="#4f46e5" />
            </svg>
        </div>
    );

    // Enhanced Pie Chart Component with view selector
    const PieChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const radius = 70;
        const center = 100;
        let startAngle = 0;

        return (
            <div className="w-full h-full flex flex-col items-center">
                <div className="relative">
                    <svg viewBox="0 0 200 200" className="w-64 h-64">
                        {data.map((item, index) => {
                            const percentage = item.value / total;
                            const endAngle = startAngle + percentage * Math.PI * 2;

                            // Calculate start and end points
                            const x1 = center + Math.sin(startAngle) * radius;
                            const y1 = center - Math.cos(startAngle) * radius;
                            const x2 = center + Math.sin(endAngle) * radius;
                            const y2 = center - Math.cos(endAngle) * radius;

                            // Create large arc flag if angle is > 180 degrees
                            const largeArcFlag = percentage > 0.5 ? 1 : 0;

                            const pathData = [`M ${center},${center}`, `L ${x1},${y1}`, `A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`, 'Z'].join(' ');

                            startAngle = endAngle;

                            return <path key={index} d={pathData} fill={item.color} stroke="white" strokeWidth="2" />;
                        })}

                        {/* Center circle */}
                        <circle cx={center} cy={center} r={radius * 0.4} fill="white" />
                        <text x={center} y={center} textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-gray-800 dark:fill-gray-200">
                            {total}
                        </text>
                        <text x={center} y={center + 15} textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">
                            Employees
                        </text>
                    </svg>

                    <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2 mt-4">
                        {data.map((item, i) => (
                            <div key={i} className="flex items-center text-xs">
                                <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="font-medium">{item.name}</span>
                                <span className="ml-1 text-gray-500">({item.value})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Custom button components for view selector
    const ViewButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
        >
            {children}
        </button>
    );

    // Quick add menu items
    const quickAddItems = [
        { label: 'New Employee', icon: <Users size={16} /> },
        { label: 'Job Posting', icon: <FileText size={16} /> },
        { label: 'Training', icon: <BookOpen size={16} /> },
        { label: 'Reimbursement', icon: <Wallet size={16} /> },
        { label: 'Asset', icon: <BadgeCheck size={16} /> },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 px-4 py-6">
                {/* 2️⃣ Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Super Admin Dashboard</h1>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <div className="flex items-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">
                                {time.toLocaleString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZone: 'Asia/Kolkata',
                                })}
                            </span>
                        </div>
                        <div className="relative">
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 pl-3 pr-8 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                {branches.map((branch) => (
                                    <option key={branch} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="h-4 w-4 absolute right-2 top-2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* 3️⃣ KPI Summary Cards (Top Row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                    {kpiData.map((kpi, index) => (
                        <DashCard key={index} icon={kpi.icon} title={kpi.title} value={kpi.value} percentage={kpi.percentage} subText={kpi.subText} trend={kpi.trend} className="h-full" />
                    ))}
                </div>

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* 4️⃣ Pending Actions & Alerts (Center-Left Panel) */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pending Actions & Alerts</h2>
                        </div>
                        <Tabs.Root defaultValue="My Approvals" className="p-1">
                            <Tabs.List className="flex px-4 pt-2 space-x-4 border-b border-gray-100 dark:border-gray-700">
                                {pendingActions.map((action) => (
                                    <Tabs.Trigger
                                        key={action.tab}
                                        value={action.tab}
                                        className="pb-3 px-1 text-sm font-medium text-gray-500 dark:text-gray-400 data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 transition-colors"
                                    >
                                        {action.tab}
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            <div className="overflow-y-auto max-h-[320px]">
                                {pendingActions.map((action) => (
                                    <Tabs.Content key={action.tab} value={action.tab} className="py-3 px-1">
                                        <div className="space-y-3">
                                            {action.items.map((item) => (
                                                <div key={item.id} className="flex items-start px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{item.id}</span>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                                {'date' in item ? item.date : 'description' in item ? item.description : item.title}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate mt-1">
                                                            {'name' in item ? item.name : 'title' in item ? item.title : item.description}
                                                        </p>
                                                        {'type' in item && (
                                                            <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                                                                {item.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {'status' in item && (
                                                        <span
                                                            className={`text-xs px-2.5 py-1 rounded-full ${
                                                                item.status === 'Approved'
                                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                                            }`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </Tabs.Content>
                                ))}
                            </div>
                        </Tabs.Root>
                    </div>

                    {/* 5️⃣ Analytics Snapshot (Center-Right Panel) */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Analytics Snapshot</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 p-5">
                            <div className="space-y-4">
                                <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">Attendance Trend (Last 30 Days)</h3>
                                <div className="h-64">
                                    <WorkingFormatChart />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">Headcount Distribution</h3>
                                    <div className="flex space-x-2">
                                        <ViewButton active={headcountView === 'department'} onClick={() => setHeadcountView('department')}>
                                            Department
                                        </ViewButton>
                                        <ViewButton active={headcountView === 'grade'} onClick={() => setHeadcountView('grade')}>
                                            Grade
                                        </ViewButton>
                                        <ViewButton active={headcountView === 'location'} onClick={() => setHeadcountView('location')}>
                                            Location
                                        </ViewButton>
                                    </div>
                                </div>
                                <div className="h-80 flex items-center justify-center">
                                    <PieChart data={getHeadcountData()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6️⃣ Quick Access Shortcuts (Bottom Row) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {[
                        { label: 'Add Employee', icon: <Users size={20} />, color: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300' },
                        { label: 'Run Payroll', icon: <DollarSign size={20} />, color: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300' },
                        { label: 'Post Job', icon: <FileText size={20} />, color: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300' },
                        { label: 'Create Training', icon: <BookOpen size={20} />, color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300' },
                        { label: 'Custom Report', icon: <ChartLine size={20} />, color: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300' },
                        { label: 'Configure Workflow', icon: <Shield size={20} />, color: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300' },
                    ].map((shortcut, index) => (
                        <Link
                            key={index}
                            to="#"
                            className="flex flex-col items-center justify-center p-5 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${shortcut.color}`}>{shortcut.icon}</div>
                            <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">{shortcut.label}</span>
                        </Link>
                    ))}
                </div>

                {/* 7️⃣ Live Activity Feed (Bottom Panel) */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Live Activity Feed</h2>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                        {activityFeed.map((activity) => (
                            <div key={activity.id} className="flex items-start px-5 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-750">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                                        <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                                    </div>
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{activity.text}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* 8️⃣ Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>HRMS v1.0</span>
                        <div className="mt-2 md:mt-0">
                            <a href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline mr-4">
                                Support/Help
                            </a>
                            <span>© 2025 HRMS. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;