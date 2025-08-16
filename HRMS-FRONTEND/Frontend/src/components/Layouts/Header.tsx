import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconSearch from '../Icon/IconSearch';
import IconXCircle from '../Icon/IconXCircle';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import IconBell from '../Icon/IconBell'; // Assuming this is available
import IconUser from '../Icon/IconUser';
import IconSettings from '../Icon/IconSettings';
import IconLogout from '../Icon/IconLogout';
import IconCaretDown from '../Icon/IconCaretDown';
import IconPlus from '../Icon/IconPlus';
import IconGlobe from '../Icon/IconGlobe';
import IconClock from '../Icon/IconClock';
import { FiMail, FiFileText as IconFileText} from "react-icons/fi";
import IconBook from '../Icon/IconBook'; // Using Book for Training
import IconCreditCard from '../Icon/IconCreditCard'; // Using CreditCard for Reimbursement
import { FaSearch, FaShieldAlt as IconShield } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import InputField from '../../components/Form/Input';

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const { t } = useTranslation();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    const [search, setSearch] = useState(false);
    const [flag, setFlag] = useState(themeConfig.locale);
    const [timezones] = useState([
        { id: 1, name: 'UTC-05:00 EST', value: 'America/New_York' },
        { id: 2, name: 'UTC-08:00 PST', value: 'America/Los_Angeles' },
        { id: 3, name: 'UTC+01:00 CET', value: 'Europe/Paris' },
    ]);
    const [currentTimezone, setCurrentTimezone] = useState(timezones[0]);

    // Quick add menu items using available Lucide icons
    const quickAddItems = [
        { label: 'New Employee', icon: <IconUser className="w-4 h-4" /> },
        { label: 'Job Posting', icon: <IconFileText className="w-4 h-4" /> },
        { label: 'Training', icon: <IconBook className="w-4 h-4" /> },
        { label: 'Reimbursement', icon: <IconCreditCard className="w-4 h-4" /> },
        { label: 'Asset', icon: <IconShield className="w-4 h-4" /> },
    ];

    // Sample notifications
    const [notifications] = useState([
        { id: 1, text: 'Leave request from John Doe needs approval', time: '2h ago' },
        { id: 2, text: 'New candidate applied for Senior Developer', time: '5h ago' },
        { id: 3, text: 'Compliance audit due in 3 days', time: '1d ago' },
    ]);

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    // Remove horizontal menu active class logic
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.remove('active');
        }
    }, [location]);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo + Product Name */}
                    <div className="flex items-center">
                        
                        <span className="text-xl font-bold text-gray-800 dark:text-white">HRMS </span>
                    </div>

                    {/* Global Search Bar */}
                    <div className="flex-1 mx-4 max-w-2xl">
                        <div className="relative">
                               <InputField placeholder="Search Here" className='max-w-4xl' icon={<CiSearch className='text-2xl' /> } />
                           
                        </div>
                    </div>

                    {/* Right-side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Quick Add Button */}
                        <Dropdown
                            offset={[0, 8]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="flex items-center justify-center h-10 w-10 rounded-full btn-primary transition-colors"
                            button={<IconPlus className="w-5 h-5" />}
                        >
                            <ul className="py-1 min-w-[200px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                                {quickAddItems.map((item, index) => (
                                    <li key={index} className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                        <span className="mr-2 text-secondary-blue">{item.icon}</span>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </Dropdown>

                        {/* Notification Bell */}
                        <Dropdown
                            offset={[0, 8]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            button={
                                <span>
                                    <IconBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                </span>
                            }
                        >
                            <div className="w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h4>
                                </div>
                                <div className="overflow-y-auto max-h-80">
                                    {notifications.map((notification) => (
                                        <div 
                                            key={notification.id} 
                                            className="flex items-start px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                                    <button className="w-full py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        </Dropdown>

                        {/* User Menu */}
                        <Dropdown
                            offset={[0, 8]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="flex items-center"
                            button={
                                <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold">SA</span>
                                    </div>
                                </div>
                            }
                        >
                            <ul className="py-1 min-w-[200px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                                <li className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium">Super Admin</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@company.com</p>
                                </li>
                                <li>
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <IconUser className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <IconSettings className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                                        Settings
                                    </Link>
                                </li>
                                <li className="border-t border-gray-200 dark:border-gray-700">
                                    <Link to="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <IconLogout className="w-4 h-4 mr-2" />
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </Dropdown>

                        {/* Language & Timezone Switcher */}
                        <div className="flex items-center space-x-2">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="flex items-center text-gray-700 dark:text-gray-300"
                                button={
                                    <div className="flex items-center">
                                        <IconGlobe className="w-5 h-5 mr-1" />
                                        <span className="text-sm">EN</span>
                                    </div>
                                }
                            >
                                <ul className="py-1 min-w-[120px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                                    {themeConfig.languageList.map((item: any) => (
                                        <li key={item.code}>
                                            <button
                                                type="button"
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                                    i18next.language === item.code ? 'text-indigo-600 dark:text-indigo-400' : ''
                                                }`}
                                                onClick={() => {
                                                    i18next.changeLanguage(item.code);
                                                    setLocale(item.code);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                            
                            <span className="text-gray-400">|</span>
                            
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="flex items-center text-gray-700 dark:text-gray-300"
                                button={
                                    <div className="flex items-center">
                                        <IconClock className="w-5 h-5 mr-1" />
                                        <span className="text-sm">{currentTimezone.name.split(' ')[1]}</span>
                                    </div>
                                }
                            >
                                <ul className="py-1 min-w-[200px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                                    {timezones.map((tz) => (
                                        <li key={tz.id}>
                                            <button
                                                type="button"
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                                    currentTimezone.id === tz.id ? 'text-indigo-600 dark:text-indigo-400' : ''
                                                }`}
                                                onClick={() => setCurrentTimezone(tz)}
                                            >
                                                {tz.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;