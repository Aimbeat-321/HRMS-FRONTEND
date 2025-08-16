import { Link } from 'react-router-dom';
import { CheckCircle, Loader2, BadgeCheck, Wallet } from 'lucide-react';
import Dropdown from '../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect } from 'react';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconUsers from '../components/Icon/IconUsers';
import IconCalendar from '../components/Icon/IconCalendar';
import IconCheck from '../components/Icon/IconChecks';
import DashCard from '../components/DashCard';
import DashProfileCard from '../components/DashProfileCard';
import WorkingFormatChart from '../components/WorkingFormatChart';
import { FaUsers, FaDollarSign, FaChartLine, FaTasks } from 'react-icons/fa';

const HRMS = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('HRMS Dashboard'));
    });

    const fakeProfile = {
        imgUrl: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        position: 'Software Engineer',
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>HRMS</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <DashCard icon={<CheckCircle />} title="Days in Company" value="295" percentage="5.2" subText="last month" active={true} />
                    <DashCard icon={<Loader2 />} title="Projects in progress" value="6" percentage="1" subText="last month" />
                    <DashCard icon={<BadgeCheck />} title="Active HR Projects" value="48" percentage="7.8" subText="increase" />
                    <DashCard icon={<Wallet />} title="Salary" value="$3,287" percentage="12.4" subText="last week" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3  gap-[30px]">
                    <DashProfileCard
                        imgUrl={fakeProfile.imgUrl}
                        firstName={fakeProfile.firstName}
                        lastName={fakeProfile.lastName}
                        emailAddress={fakeProfile.emailAddress}
                        position={fakeProfile.position}
                    />
                    <DashProfileCard
                        imgUrl={'https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg'}
                        firstName={fakeProfile.firstName}
                        lastName={fakeProfile.lastName}
                        emailAddress={fakeProfile.emailAddress}
                        position={fakeProfile.position}
                    />
                    <WorkingFormatChart />
                    <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Employee Distribution</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark">
                                See Details
                            </button>
                        </div>
                        <div className="panel">
                            {/* Chart.js chart rendered here */}
                            <div className="mb-5">
                                {/* Placeholder for the Chart.js pie chart */}
                                <div className="text-center">Employee Distribution by Department (See Chart Above)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Last Payroll</div>
                                    <div className="text-success"> Processed on June 27, 2022 </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="hover:opacity-80"
                                        button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">View Report</button>
                                            </li>
                                            <li>
                                                <button type="button">Edit Report</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCheck className="text-success opacity-20 w-full h-full" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Total Payroll</div>
                                        <div className="mt-2 font-semibold text-2xl">$87,500.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Employees Paid</div>
                                        <div className="mt-2 font-semibold text-2xl">1,245</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Avg. Salary</div>
                                        <div className="mt-2 font-semibold text-2xl">$70.28</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="mb-5 text-lg font-bold">Recent Leave Requests</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>TYPE</th>
                                        <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">#01</td>
                                        <td className="whitespace-nowrap">Oct 08, 2022</td>
                                        <td className="whitespace-nowrap">Eric Page</td>
                                        <td>Vacation</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#02</td>
                                        <td className="whitespace-nowrap">Dec 18, 2022</td>
                                        <td className="whitespace-nowrap">Nita Parr</td>
                                        <td>Sick Leave</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#03</td>
                                        <td className="whitespace-nowrap">Dec 25, 2022</td>
                                        <td className="whitespace-nowrap">Carl Bell</td>
                                        <td>Personal Leave</td>
                                        <td className="text-center">
                                            <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Rejected</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#04</td>
                                        <td className="whitespace-nowrap">Nov 29, 2022</td>
                                        <td className="whitespace-nowrap">Dan Hart</td>
                                        <td>Vacation</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Approved</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRMS;
