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

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
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
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('HRMS')}</span>
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
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('home')}</span>
                                    </div>
                                    <div className={currentMenu !== 'home' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'home' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('executive_overview')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/approvals">{t('my_approvals_center')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Organization */}
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('organization')}</span>
                            </h2>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'organization' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('organization')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('organization')}</span>
                                    </div>
                                    <div className={currentMenu !== 'organization' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'organization' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/org/settings">{t('company_settings')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/org/grades">{t('grades_bands_designations')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/org/chart">{t('org_chart')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* People */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'people' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('people')}>
                                    <div className="flex items-center">
                                        <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('people')}</span>
                                    </div>
                                    <div className={currentMenu !== 'people' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'people' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/people/directory">{t('directory_search')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/people/profile/:id">{t('employee_profile')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/people/id-cards">{t('id_cards')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/security/gate-passes">{t('gate_passes')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Attendance & Time */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'attendance' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('attendance')}>
                                    <div className="flex items-center">
                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('attendance_time')}</span>
                                    </div>
                                    <div className={currentMenu !== 'attendance' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'attendance' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/attendance/dashboard">{t('dashboard_realtime')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/logs">{t('daily_logs_regularization')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/shifts">{t('shifts_scheduling')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/calendars">{t('weekly_off_holidays')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/overtime">{t('overtime_rules')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/freeze">{t('attendance_freeze')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/devices">{t('device_integrations')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/attendance/geo-fence">{t('geo_fence_zones')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Leave */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'leave' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('leave')}>
                                    <div className="flex items-center">
                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('leave')}</span>
                                    </div>
                                    <div className={currentMenu !== 'leave' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'leave' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/leave/policies">{t('policies_leave_types')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/leave/entitlements">{t('entitlements_accruals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/leave/requests">{t('requests_approvals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/leave/calendar">{t('team_calendar_reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Recruitment */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'recruitment' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('recruitment')}>
                                    <div className="flex items-center">
                                        <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('recruitment')}</span>
                                    </div>
                                    <div className={currentMenu !== 'recruitment' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'recruitment' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/recruitment/jobs">{t('jobs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/recruitment/candidates">{t('candidates')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/recruitment/interviews">{t('interviews_offers')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/recruitment/reports">{t('hiring_reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Onboarding */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'onboarding' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('onboarding')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('onboarding')}</span>
                                    </div>
                                    <div className={currentMenu !== 'onboarding' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'onboarding' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/onboarding/templates">{t('templates_task_library')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/onboarding/checklists">{t('new_hire_checklists')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/onboarding/documents">{t('document_collection')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/onboarding/status">{t('status_dashboard')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Compliance & Documents */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'docs' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('docs')}>
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('compliance_documents')}</span>
                                    </div>
                                    <div className={currentMenu !== 'docs' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'docs' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/docs/repository">{t('repository')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/docs/policy-acknowledgements">{t('policy_acknowledgements')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/docs/e-signature">{t('e_signature_flows')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Performance */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'performance' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('performance')}>
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('performance')}</span>
                                    </div>
                                    <div className={currentMenu !== 'performance' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'performance' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/performance/goals">{t('goals_kpis')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/performance/appraisals">{t('appraisal_cycles')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/performance/ratings">{t('ratings_calibration')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/performance/feedback">{t('360_feedback')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Reimbursements */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'reimbursements' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('reimbursements')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('reimbursements')}</span>
                                    </div>
                                    <div className={currentMenu !== 'reimbursements' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'reimbursements' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/reimbursements/policies">{t('policies_categories')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reimbursements/claims">{t('claims')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reimbursements/payouts">{t('payout_queue_reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Payroll & Compensation */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'payroll' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('payroll')}>
                                    <div className="flex items-center">
                                        <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('payroll_compensation')}</span>
                                    </div>
                                    <div className={currentMenu !== 'payroll' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'payroll' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/payroll/structures">{t('compensation_structures')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/payroll/runs">{t('payroll_runs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/payroll/statutory">{t('statutory_deductions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/payroll/reports">{t('payroll_reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Learning, Skills & Career */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'learning' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('learning')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('learning_skills_career')}</span>
                                    </div>
                                    <div className={currentMenu !== 'learning' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'learning' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/learning/catalog">{t('training_catalog')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/learning/feedback">{t('training_feedback')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/learning/skills">{t('skills_career_paths')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Assets & Vendors */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'admin-assets' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('admin-assets')}>
                                    <div className="flex items-center">
                                        <IconMenuTables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('assets_vendors')}</span>
                                    </div>
                                    <div className={currentMenu !== 'admin-assets' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'admin-assets' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/admin-assets/inventory">{t('asset_inventory')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/admin-assets/vendors">{t('vendor_directory')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Facilities (Room Booking) */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'rooms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('rooms')}>
                                    <div className="flex items-center">
                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('facilities')}</span>
                                    </div>
                                    <div className={currentMenu !== 'rooms' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'rooms' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/rooms/calendar">{t('room_calendar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rooms/config">{t('rooms_equipment_config')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rooms/bookings">{t('book_edit_cancel')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Resignation & Offboarding */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'offboarding' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('offboarding')}>
                                    <div className="flex items-center">
                                        <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('resignation_offboarding')}</span>
                                    </div>
                                    <div className={currentMenu !== 'offboarding' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'offboarding' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/offboarding/submissions">{t('resignation_submissions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/offboarding/checklists">{t('offboarding_checklists')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/offboarding/survey">{t('exit_survey')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Workflows & Notifications */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'workflows' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('workflows')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('workflows_notifications')}</span>
                                    </div>
                                    <div className={currentMenu !== 'workflows' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'workflows' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/workflows/builder">{t('workflow_builder')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/workflows/templates">{t('notification_templates')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Mobile */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'mobile' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('mobile')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('mobile')}</span>
                                    </div>
                                    <div className={currentMenu !== 'mobile' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'mobile' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/mobile/notifications">{t('push_notification_templates')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/mobile/features">{t('mobile_feature_toggles')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/mobile/security">{t('security')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Integrations & IT */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'integrations' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('integrations')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('integrations_it')}</span>
                                    </div>
                                    <div className={currentMenu !== 'integrations' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'integrations' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/integrations/sso">{t('sso_gateways')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/integrations/biometric">{t('biometric_connectors')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/integrations/import">{t('data_import_migration')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Reporting & Analytics */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'reports' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('reports')}>
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('reporting_analytics')}</span>
                                    </div>
                                    <div className={currentMenu !== 'reports' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'reports' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/reports/library">{t('report_library')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reports/builder">{t('custom_report_builder')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/reports/dashboards">{t('visual_dashboards')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* Security & IAM */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'iam' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('iam')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('security_iam')}</span>
                                    </div>
                                    <div className={currentMenu !== 'iam' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'iam' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/iam/roles">{t('roles_permissions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/iam/audit">{t('audit_logs')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* System */}
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('system')}</span>
                            </h2>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'system' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('system')}>
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('system')}</span>
                                    </div>
                                    <div className={currentMenu !== 'system' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'system' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/system/branding">{t('branding_theming')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/system/localization">{t('localization')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/system/backups">{t('backups_exports')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/system/uat">{t('uat_deployment_notes')}</NavLink>
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