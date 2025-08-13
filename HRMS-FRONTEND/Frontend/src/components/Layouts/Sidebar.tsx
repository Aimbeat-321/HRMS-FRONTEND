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

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
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

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex flex-col items-center shrink-0">
                            <img className="w-[200px]" src={Logo} alt="logo" />
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
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuContacts className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuTables className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
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
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
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
//import PerfectScrollbar from 'react-perfect-scrollbar';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useLocation } from 'react-router-dom';
// import { toggleSidebar } from '../../store/themeConfigSlice';
// import AnimateHeight from 'react-animate-height';
// import { IRootState } from '../../store';
// import { useState, useEffect } from 'react';
// import IconCaretsDown from '../Icon/IconCaretsDown';
// import IconCaretDown from '../Icon/IconCaretDown';
// import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
// import IconMinus from '../Icon/IconMinus';
// import IconMenuChat from '../Icon/Menu/IconMenuChat';
// import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
// import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
// import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
// import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
// import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
// import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
// import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
// import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
// import IconMenuElements from '../Icon/Menu/IconMenuElements';
// import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
// import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
// import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
// import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
// import IconMenuTables from '../Icon/Menu/IconMenuTables';
// import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
// import IconMenuForms from '../Icon/Menu/IconMenuForms';
// import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
// import IconMenuPages from '../Icon/Menu/IconMenuPages';
// import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
// import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';

// const Sidebar = () => {
//     const [currentMenu, setCurrentMenu] = useState<string>('');
//     const [errorSubMenu, setErrorSubMenu] = useState(false);
//     const themeConfig = useSelector((state: IRootState) => state.themeConfig);
//     const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const { t } = useTranslation();
//     const toggleMenu = (value: string) => {
//         setCurrentMenu((oldValue) => {
//             return oldValue === value ? '' : value;
//         });
//     };

//     useEffect(() => {
//         const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
//         if (selector) {
//             selector.classList.add('active');
//             const ul: any = selector.closest('ul.sub-menu');
//             if (ul) {
//                 let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
//                 if (ele.length) {
//                     ele = ele[0];
//                     setTimeout(() => {
//                         ele.click();
//                     });
//                 }
//             }
//         }
//     }, []);

//     useEffect(() => {
//         if (window.innerWidth < 1024 && themeConfig.sidebar) {
//             dispatch(toggleSidebar());
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [location]);

//     return (
//         <div className={semidark ? 'dark' : ''}>
//             <nav
//                 className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
//             >
//                 <div className="bg-white dark:bg-black h-full">
//                     <div className="flex justify-between items-center px-4 py-3">
//                         <NavLink to="/" className="main-logo flex items-center shrink-0">
//                             <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
//                             <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('VRISTO')}</span>
//                         </NavLink>

//                         <button
//                             type="button"
//                             className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
//                             onClick={() => dispatch(toggleSidebar())}
//                         >
//                             <IconCaretsDown className="m-auto rotate-90" />
//                         </button>
//                     </div>
//                     <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
//                         <ul className="relative font-semibold space-y-0.5 p-4 py-0">
//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
//                                     <div className="flex items-center">
//                                         <IconMenuDashboard
//                                          className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/">{t('sales')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/analytics">{t('analytics')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/finance">{t('finance')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/crypto">{t('crypto')}</NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
//                                 <IconMinus className="w-4 h-5 flex-none hidden" />
//                                 <span>{t('apps')}</span>
//                             </h2>

//                             <li className="nav-item">
//                                 <ul>
//                                     <li className="nav-item">
//                                         <NavLink to="/apps/chat" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuChat className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('chat')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink to="/apps/mailbox" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuMailbox className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('mailbox')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink to="/apps/todolist" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuTodo className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('todo_list')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink to="/apps/notes" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuNotes className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('notes')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink to="/apps/scrumboard" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('scrumboard')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink to="/apps/contacts" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuContacts className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('contacts')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>

//                                     <li className="menu nav-item">
//                                         <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
//                                             <div className="flex items-center">
//                                                 <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('invoice')}</span>
//                                             </div>

//                                             <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                                 <IconCaretDown />
//                                             </div>
//                                         </button>

//                                         <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
//                                             <ul className="sub-menu text-gray-500">
//                                                 <li>
//                                                     <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
//                                                 </li>
//                                                 <li>
//                                                     <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
//                                                 </li>
//                                                 <li>
//                                                     <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
//                                                 </li>
//                                                 <li>
//                                                     <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
//                                                 </li>
//                                             </ul>
//                                         </AnimateHeight>
//                                     </li>

//                                     <li className="nav-item">
//                                         <NavLink to="/apps/calendar" className="group">
//                                             <div className="flex items-center">
//                                                 <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
//                                                 <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('calendar')}</span>
//                                             </div>
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li>

//                             <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
//                                 <IconMinus className="w-4 h-5 flex-none hidden" />
//                                 <span>{t('user_interface')}</span>
//                             </h2>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
//                                     <div className="flex items-center">
//                                         <IconMenuComponents className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('components')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/components/tabs">{t('tabs')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/accordions">{t('accordions')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/modals">{t('modals')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/cards">{t('cards')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/carousel">{t('carousel')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/countdown">{t('countdown')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/counter">{t('counter')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/sweetalert">{t('sweet_alerts')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/timeline">{t('timeline')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/notifications">{t('notifications')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/media-object">{t('media_object')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/list-group">{t('list_group')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/pricing-table">{t('pricing_tables')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/components/lightbox">{t('lightbox')}</NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
//                                     <div className="flex items-center">
//                                         <IconMenuElements className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('elements')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'element' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/elements/alerts">{t('alerts')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/avatar">{t('avatar')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/badges">{t('badges')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/breadcrumbs">{t('breadcrumbs')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/buttons">{t('buttons')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/buttons-group">{t('button_groups')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/color-library">{t('color_library')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/dropdown">{t('dropdown')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/infobox">{t('infobox')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/jumbotron">{t('jumbotron')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/loader">{t('loader')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/pagination">{t('pagination')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/popovers">{t('popovers')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/progress-bar">{t('progress_bar')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/search">{t('search')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/tooltips">{t('tooltips')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/treeview">{t('treeview')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/elements/typography">{t('typography')}</NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <li className="menu nav-item">
//                                 <NavLink to="/charts" className="group">
//                                     <div className="flex items-center">
//                                         <IconMenuCharts className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('charts')}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>

//                             <li className="menu nav-item">
//                                 <NavLink to="/widgets" className="group">
//                                     <div className="flex items-center">
//                                         <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('widgets')}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>

//                             <li className="menu nav-item">
//                                 <NavLink to="/font-icons" className="group">
//                                     <div className="flex items-center">
//                                         <IconMenuFontIcons className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('font_icons')}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>

//                             <li className="menu nav-item">
//                                 <NavLink to="/dragndrop" className="group">
//                                     <div className="flex items-center">
//                                         <IconMenuDragAndDrop className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('drag_and_drop')}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>

//                             <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
//                                 <IconMinus className="w-4 h-5 flex-none hidden" />
//                                 <span>{t('tables_and_forms')}</span>
//                             </h2>

//                             <li className="menu nav-item">
//                                 <NavLink to="/tables" className="group">
//                                     <div className="flex items-center">
//                                         <IconMenuTables className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('tables')}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'datalabel' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('datalabel')}>
//                                     <div className="flex items-center">
//                                         <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('datatables')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'datalabel' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'datalabel' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/datatables/basic">{t('basic')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/skin">{t('skin')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/multi-column">{t('multi_column')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/multiple-tables">{t('multiple_tables')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/alt-pagination">{t('alt_pagination')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/checkbox">{t('checkbox')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/range-search">{t('range_search')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/export">{t('export')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/datatables/column-chooser">{t('column_chooser')}</NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'forms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('forms')}>
//                                     <div className="flex items-center">
//                                         <IconMenuForms className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('forms')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'forms' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'forms' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/forms/basic">{t('basic')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/input-group">{t('input_group')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/layouts">{t('layouts')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/validation">{t('validation')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/input-mask">{t('input_mask')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/select2">{t('select2')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/touchspin">{t('touchspin')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/checkbox-radio">{t('checkbox_and_radio')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/switches">{t('switches')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/wizards">{t('wizards')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/file-upload">{t('file_upload')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/quill-editor">{t('quill_editor')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/markdown-editor">{t('markdown_editor')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/date-picker">{t('date_and_range_picker')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/forms/clipboard">{t('clipboard')}</NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
//                                 <IconMinus className="w-4 h-5 flex-none hidden" />
//                                 <span>{t('user_and_pages')}</span>
//                             </h2>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
//                                     <div className="flex items-center">
//                                         <IconMenuUsers className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/users/profile">{t('profile')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/users/user-account-settings">{t('account_settings')}</NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
//                                     <div className="flex items-center">
//                                         <IconMenuPages className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('pages')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'page' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/pages/knowledge-base">{t('knowledge_base')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/pages/contact-us-boxed" target="_blank">
//                                                 {t('contact_us_boxed')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/pages/contact-us-cover" target="_blank">
//                                                 {t('contact_us_cover')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/pages/faq">{t('faq')}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/pages/coming-soon-boxed" target="_blank">
//                                                 {t('coming_soon_boxed')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/pages/coming-soon-cover" target="_blank">
//                                                 {t('coming_soon_cover')}
//                                             </NavLink>
//                                         </li>
//                                         <li className="menu nav-item">
//                                             <button
//                                                 type="button"
//                                                 className={`${
//                                                     errorSubMenu ? 'open' : ''
//                                                 } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
//                                                 onClick={() => setErrorSubMenu(!errorSubMenu)}
//                                             >
//                                                 {t('error')}
//                                                 <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
//                                                     <IconCaretsDown fill={true} className="w-4 h-4" />
//                                                 </div>
//                                             </button>
//                                             <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
//                                                 <ul className="sub-menu text-gray-500">
//                                                     <li>
//                                                         <a href="/pages/error404" target="_blank">
//                                                             {t('404')}
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="/pages/error500" target="_blank">
//                                                             {t('500')}
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="/pages/error503" target="_blank">
//                                                             {t('503')}
//                                                         </a>
//                                                     </li>
//                                                 </ul>
//                                             </AnimateHeight>
//                                         </li>

//                                         <li>
//                                             <NavLink to="/pages/maintenence" target="_blank">
//                                                 {t('maintenence')}
//                                             </NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <li className="menu nav-item">
//                                 <button type="button" className={`${currentMenu === 'auth' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('auth')}>
//                                     <div className="flex items-center">
//                                         <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('authentication')}</span>
//                                     </div>

//                                     <div className={currentMenu !== 'auth' ? 'rtl:rotate-90 -rotate-90' : ''}>
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>

//                                 <AnimateHeight duration={300} height={currentMenu === 'auth' ? 'auto' : 0}>
//                                     <ul className="sub-menu text-gray-500">
//                                         <li>
//                                             <NavLink to="/auth/boxed-signin" target="_blank">
//                                                 {t('login_boxed')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/boxed-signup" target="_blank">
//                                                 {t('register_boxed')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/boxed-lockscreen" target="_blank">
//                                                 {t('unlock_boxed')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/boxed-password-reset" target="_blank">
//                                                 {t('recover_id_boxed')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/cover-login" target="_blank">
//                                                 {t('login_cover')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/cover-register" target="_blank">
//                                                 {t('register_cover')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/cover-lockscreen" target="_blank">
//                                                 {t('unlock_cover')}
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/auth/cover-password-reset" target="_blank">
//                                                 {t('recover_id_cover')}
//                                             </NavLink>
//                                         </li>
//                                     </ul>
//                                 </AnimateHeight>
//                             </li>

//                             <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
//                                 <IconMinus className="w-4 h-5 flex-none hidden" />
//                                 <span>{t('supports')}</span>
//                             </h2>

//                             <li className="menu nav-item">
//                                 <NavLink to="https://vristo.sbthemes.com" target="_blank" className="nav-link group">
//                                     <div className="flex items-center">
//                                         <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
//                                         <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('documentation')}</span>
//                                     </div>
//                                 </NavLink>
//                             </li>
//                         </ul>
//                     </PerfectScrollbar>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default Sidebar; 