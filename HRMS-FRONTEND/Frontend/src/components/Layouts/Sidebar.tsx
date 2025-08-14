import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import Logo from "../../assets/WeConnect Logo.png";
import DarkLogo from "../../assets/WeConnect Logo Dark.png"
import smallLogo from "../../../public/logo192.png";
import { GoOrganization } from "react-icons/go";
import { IoPeopleOutline } from "react-icons/io5";
import { PiCalendarBlank, PiCalendarMinus } from "react-icons/pi";



const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location, dispatch]);

    const isSidebarExpanded = themeConfig.sidebar && !(window.innerWidth < 1024);
    const showBigLogo = isSidebarExpanded || (!themeConfig.sidebar && isHovered);
    console.log('this is semidark and it',)
    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 ${isSidebarExpanded || isHovered ? 'w-[260px]' : 'w-[80px]'} shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex flex-col items-center shrink-0">
                            <div className="h-12 flex items-center justify-center">
                                <img
                                    src={themeConfig.isDarkMode ? DarkLogo : Logo}
                                    alt="logo"
                                    className={`absolute left-8 transition-opacity duration-300 ease-in-out ${showBigLogo ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ width: '180px' }}
                                />
                                <img
                                    src={smallLogo}
                                    alt="small-logo"
                                    className={`absolute left-3  transition-opacity duration-300 ease-in-out ${showBigLogo ? 'opacity-0' : 'opacity-100'}`}
                                    style={{ width: '38px' }}
                                />
                            </div>
                        </NavLink>
                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            {/* Home */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'home' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('home')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Home')}</span>
                                    </div>
                                    <div className={currentMenu !== 'home' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'home' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('Executive Overview')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/approvals">{t('My Approvals Center')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Organization */}
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Organization')}</span>
                            </h2>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'organization' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('organization')}>
                                    <div className="flex items-center">
                                      
                                        <GoOrganization className="group-hover:text-primary! shrink-0"  />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Organization')}</span>
                                    </div>
                                    <div className={currentMenu !== 'organization' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'organization' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/org/settings">{t('Company Settings')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/org/grades">{t('Grades/Bands/Designations')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/org/chart">{t('Org Chart')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* People */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'people' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('people')}>
                                    <div className="flex items-center">
                                     
                                        <IoPeopleOutline   className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('People')}</span>
                                    </div>
                                    <div className={currentMenu !== 'people' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'people' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/people/directory">{t('Directory & Advanced Search')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/people/profile/:id">{t('Employee Profile')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/people/id-cards">{t('ID Cards')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/security/gate-passes">{t('Gate Passes')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Attendance & Time */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'attendance' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('attendance')}>
                                    <div className="flex items-center">
                                        <PiCalendarBlank className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Attendance & Time')}</span>
                                    </div>
                                    <div className={currentMenu !== 'attendance' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'attendance' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/attendance/dashboard">{t('Dashboard & Real-time In/Out')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/logs">{t('Daily Logs & Regularization Requests')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/shifts">{t('Shifts & Scheduling')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/calendars">{t('Weekly Off & Holiday Calendars')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/overtime">{t('Overtime Rules')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/freeze">{t('Attendance Freeze')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/devices">{t('Device Integrations')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/geo-fence">{t('Geo-fence Zones')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Leave */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'leave' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('leave')}>
                                    <div className="flex items-center">
                                        <PiCalendarMinus className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Leave')}</span>
                                    </div>
                                    <div className={currentMenu !== 'leave' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'leave' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/leave/policies">{t('Policies & Leave Types')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/leave/entitlements">{t('Entitlements/Accruals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/leave/requests">{t('Requests & Approvals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/leave/calendar">{t('Team Calendar & Reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Recruitment */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'recruitment' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('recruitment')}>
                                    <div className="flex items-center">
                                        <IconMenuScrumboard className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Recruitment')}</span>
                                    </div>
                                    <div className={currentMenu !== 'recruitment' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'recruitment' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/recruitment/jobs">{t('Jobs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/recruitment/candidates">{t('Candidates')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/recruitment/interviews">{t('Interviews & Offers')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/recruitment/reports">{t('Hiring Reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Onboarding */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'onboarding' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('onboarding')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Onboarding')}</span>
                                    </div>
                                    <div className={currentMenu !== 'onboarding' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'onboarding' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/onboarding/templates">{t('Templates & Task Library')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/onboarding/checklists">{t('New Hire Checklists')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/onboarding/documents">{t('Document Collection & E-sign Checkpoints')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/onboarding/status">{t('Status Dashboard')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Compliance & Documents */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'docs' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('docs')}>
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Compliance & Documents')}</span>
                                    </div>
                                    <div className={currentMenu !== 'docs' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'docs' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/docs/repository">{t('Repository')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/docs/policy-acknowledgements">{t('Policy Acknowledgements & Expiry/Renewals Tracker')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/docs/e-signature">{t('E-Signature Flows')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Performance */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'performance' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('performance')}>
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Performance')}</span>
                                    </div>
                                    <div className={currentMenu !== 'performance' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'performance' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/performance/goals">{t('Goals & KPIs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/performance/appraisals">{t('Appraisal Cycles')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/performance/ratings">{t('Ratings & Calibration')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/performance/feedback">{t('360° Feedback & Survey Results')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Reimbursements */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'reimbursements' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('reimbursements')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Reimbursements')}</span>
                                    </div>
                                    <div className={currentMenu !== 'reimbursements' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'reimbursements' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/reimbursements/policies">{t('Policies & Categories')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reimbursements/claims">{t('Claims')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reimbursements/payouts">{t('Finance Payout Queue & Reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Payroll & Compensation */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'payroll' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('payroll')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payroll & Compensation')}</span>
                                    </div>
                                    <div className={currentMenu !== 'payroll' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'payroll' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/payroll/structures">{t('Compensation Structures & Benefits')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/payroll/runs">{t('Payroll Runs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/payroll/statutory">{t('Statutory Deductions/Tax Rules')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/payroll/reports">{t('Payroll Reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Learning, Skills & Career */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'learning' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('learning')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Learning, Skills & Career')}</span>
                                    </div>
                                    <div className={currentMenu !== 'learning' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'learning' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/learning/catalog">{t('Training Catalog, Sessions & Enrollments')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/learning/feedback">{t('Training Feedback')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/learning/skills">{t('Skills & Career Paths')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Assets & Vendors */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'admin-assets' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('admin-assets')}>
                                    <div className="flex items-center">
                                        <IconMenuTables className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Assets & Vendors')}</span>
                                    </div>
                                    <div className={currentMenu !== 'admin-assets' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'admin-assets' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/admin-assets/inventory">{t('Asset Inventory, Assign/Return, Maintenance/Warranty Alerts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/admin-assets/vendors">{t('Vendor Directory, Contracts & Renewal Reminders')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Facilities (Room Booking) */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'rooms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('rooms')}>
                                    <div className="flex items-center">
                                        <IconMenuCalendar className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Facilities')}</span>
                                    </div>
                                    <div className={currentMenu !== 'rooms' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'rooms' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/rooms/calendar">{t('Calendar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rooms/config">{t('Rooms & Equipment Config')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rooms/bookings">{t('Book/Edit/Cancel, Conflict Handling')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Resignation & Offboarding */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'offboarding' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('offboarding')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Resignation & Offboarding')}</span>
                                    </div>
                                    <div className={currentMenu !== 'offboarding' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'offboarding' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/offboarding/submissions">{t('Resignation Submissions & Approvals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/offboarding/checklists">{t('Offboarding Checklists')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/offboarding/survey">{t('Exit Survey & Final Settlement Hand-offs')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Workflows & Notifications */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'workflows' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('workflows')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Workflows & Notifications')}</span>
                                    </div>
                                    <div className={currentMenu !== 'workflows' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'workflows' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/workflows/builder">{t('Workflow Builder')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/workflows/templates">{t('Notification Templates')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Mobile */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'mobile' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('mobile')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Mobile')}</span>
                                    </div>
                                    <div className={currentMenu !== 'mobile' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'mobile' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/mobile/notifications">{t('Push Notification Templates')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/mobile/features">{t('Mobile Feature Toggles')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/mobile/security">{t('Security')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Integrations & IT */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'integrations' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('integrations')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Integrations & IT')}</span>
                                    </div>
                                    <div className={currentMenu !== 'integrations' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'integrations' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/integrations/sso">{t('SSO')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/integrations/biometric">{t('Biometric Device Connectors')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/integrations/import">{t('Data Import/Migration Tools')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Reporting & Analytics */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'reports' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('reports')}>
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Reporting & Analytics')}</span>
                                    </div>
                                    <div className={currentMenu !== 'reports' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'reports' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/reports/library">{t('Library')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reports/builder">{t('Custom Report Builder')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reports/dashboards">{t('Visual Dashboards & Export')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Security & IAM */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'iam' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('iam')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Security & IAM')}</span>
                                    </div>
                                    <div className={currentMenu !== 'iam' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'iam' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/iam/roles">{t('Roles & Permissions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/iam/audit">{t('Audit Logs')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* System */}
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('System')}</span>
                            </h2>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'system' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('system')}>
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:text-primary! shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('System')}</span>
                                    </div>
                                    <div className={currentMenu !== 'system' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'system' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/system/branding">{t('Branding & Theming')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/system/localization">{t('Localization')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/system/backups">{t('Backups & Exports')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/system/uat">{t('UAT/Deployment Notes')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;