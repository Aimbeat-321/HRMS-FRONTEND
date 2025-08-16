import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import Logo from "../../assets/WeConnect Logo.png";
import DarkLogo from "../../assets/WeConnect Logo Dark.png";
import smallLogo from "../../../public/logo192.png";
import { 
  HiOutlineHome, 
  HiOutlineBuildingOffice,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineClipboard,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineReceiptRefund,
  HiOutlineSlash,
  HiOutlineAcademicCap,
  HiOutlineCube,
  HiOutlineCalendarDays,
  HiOutlineCog,
  HiOutlineLightBulb,
  HiOutlineDevicePhoneMobile,
  HiOutlinePause,
  HiOutlineChartPie,
  HiOutlineShieldCheck,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDown,
  HiOutlineMinus
} from 'react-icons/hi2';


interface MenuItem {
  id: string;
  title: string;
  icon: React.ElementType;
  subItems: { path: string; label: string }[];
  isHeader?: boolean;
}

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      title: 'Home',
      icon: HiOutlineHome,
      subItems: [
        { path: '/', label: 'Executive Overview' },
        { path: '/approvals', label: 'My Approvals Center' }
      ]
    },
    {
      id: 'organization-header',
      title: 'Organization',
      icon: HiOutlineMinus,
      subItems: [],
      isHeader: true
    },
    {
      id: 'organization',
      title: 'Organization',
      icon: HiOutlineBuildingOffice,
      subItems: [
        { path: '/org/settings', label: 'Company Settings' },
        { path: '/org/grades', label: 'Grades/Bands/Designations' },
        { path: '/org/chart', label: 'Org Chart' }
      ]
    },
    {
      id: 'people',
      title: 'People',
      icon: HiOutlineUserGroup,
      subItems: [
        { path: '/people/directory', label: 'Directory & Advanced Search' },
        { path: '/people/profile/:id', label: 'Employee Profile' },
        { path: '/people/id-cards', label: 'ID Cards' },
        { path: '/security/gate-passes', label: 'Gate Passes' }
      ]
    },
    {
      id: 'attendance',
      title: 'Attendance & Time',
      icon: HiOutlineClock,
      subItems: [
        { path: '/attendance/dashboard', label: 'Dashboard & Real-time In/Out' },
        { path: '/attendance/logs', label: 'Daily Logs & Regularization Requests' },
        { path: '/attendance/shifts', label: 'Shifts & Scheduling' },
        { path: '/attendance/calendars', label: 'Weekly Off & Holiday Calendars' },
        { path: '/attendance/overtime', label: 'Overtime Rules' },
        { path: '/attendance/freeze', label: 'Attendance Freeze' },
        { path: '/attendance/devices', label: 'Device Integrations' },
        { path: '/attendance/geo-fence', label: 'Geo-fence Zones' }
      ]
    },
    {
      id: 'leave',
      title: 'Leave',
      icon: HiOutlineCalendar,
      subItems: [
        { path: '/leave/policies', label: 'Policies & Leave Types' },
        { path: '/leave/entitlements', label: 'Entitlements/Accruals' },
        { path: '/leave/requests', label: 'Requests & Approvals' },
        { path: '/leave/calendar', label: 'Team Calendar & Reports' }
      ]
    },
    {
      id: 'recruitment',
      title: 'Recruitment',
      icon: HiOutlineUser,
      subItems: [
        { path: '/recruitment/jobs', label: 'Jobs' },
        { path: '/recruitment/candidates', label: 'Candidates' },
        { path: '/recruitment/interviews', label: 'Interviews & Offers' },
        { path: '/recruitment/reports', label: 'Hiring Reports' }
      ]
    },
    {
      id: 'onboarding',
      title: 'Onboarding',
      icon: HiOutlineClipboard,
      subItems: [
        { path: '/onboarding/templates', label: 'Templates & Task Library' },
        { path: '/onboarding/checklists', label: 'New Hire Checklists' },
        { path: '/onboarding/documents', label: 'Document Collection & E-sign Checkpoints' },
        { path: '/onboarding/status', label: 'Status Dashboard' }
      ]
    },
    {
      id: 'docs',
      title: 'Compliance & Documents',
      icon: HiOutlineDocumentText,
      subItems: [
        { path: '/docs/repository', label: 'Repository' },
        { path: '/docs/policy-acknowledgements', label: 'Policy Acknowledgements & Expiry/Renewals Tracker' },
        { path: '/docs/e-signature', label: 'E-Signature Flows' }
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: HiOutlineChartBar,
      subItems: [
        { path: '/performance/goals', label: 'Goals & KPIs' },
        { path: '/performance/appraisals', label: 'Appraisal Cycles' },
        { path: '/performance/ratings', label: 'Ratings & Calibration' },
        { path: '/performance/feedback', label: '360° Feedback & Survey Results' }
      ]
    },
    {
      id: 'reimbursements',
      title: 'Reimbursements',
      icon: HiOutlineReceiptRefund,
      subItems: [
        { path: '/reimbursements/policies', label: 'Policies & Categories' },
        { path: '/reimbursements/claims', label: 'Claims' },
        { path: '/reimbursements/payouts', label: 'Finance Payout Queue & Reports' }
      ]
    },
    {
      id: 'payroll',
      title: 'Payroll & Compensation',
      icon: HiOutlineSlash,
      subItems: [
        { path: '/payroll/structures', label: 'Compensation Structures & Benefits' },
        { path: '/payroll/runs', label: 'Payroll Runs' },
        { path: '/payroll/statutory', label: 'Statutory Deductions/Tax Rules' },
        { path: '/payroll/reports', label: 'Payroll Reports' }
      ]
    },
    {
      id: 'learning',
      title: 'Learning, Skills & Career',
      icon: HiOutlineAcademicCap,
      subItems: [
        { path: '/learning/catalog', label: 'Training Catalog, Sessions & Enrollments' },
        { path: '/learning/feedback', label: 'Training Feedback' },
        { path: '/learning/skills', label: 'Skills & Career Paths' }
      ]
    },
    {
      id: 'admin-assets',
      title: 'Assets & Vendors',
      icon: HiOutlineCube,
      subItems: [
        { path: '/admin-assets/inventory', label: 'Asset Inventory, Assign/Return, Maintenance/Warranty Alerts' },
        { path: '/admin-assets/vendors', label: 'Vendor Directory, Contracts & Renewal Reminders' }
      ]
    },
    {
      id: 'rooms',
      title: 'Facilities',
      icon: HiOutlineCalendarDays,
      subItems: [
        { path: '/rooms/calendar', label: 'Calendar' },
        { path: '/rooms/config', label: 'Rooms & Equipment Config' },
        { path: '/rooms/bookings', label: 'Book/Edit/Cancel, Conflict Handling' }
      ]
    },
    {
      id: 'offboarding',
      title: 'Resignation & Offboarding',
      icon: HiOutlineCog,
      subItems: [
        { path: '/offboarding/submissions', label: 'Resignation Submissions & Approvals' },
        { path: '/offboarding/checklists', label: 'Offboarding Checklists' },
        { path: '/offboarding/survey', label: 'Exit Survey & Final Settlement Hand-offs' }
      ]
    },
    {
      id: 'workflows',
      title: 'Workflows & Notifications',
      icon: HiOutlineLightBulb,
      subItems: [
        { path: '/workflows/builder', label: 'Workflow Builder' },
        { path: '/workflows/templates', label: 'Notification Templates' }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile',
      icon: HiOutlineDevicePhoneMobile,
      subItems: [
        { path: '/mobile/notifications', label: 'Push Notification Templates' },
        { path: '/mobile/features', label: 'Mobile Feature Toggles' },
        { path: '/mobile/security', label: 'Security' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations & IT',
      icon: HiOutlinePause,
      subItems: [
        { path: '/integrations/sso', label: 'SSO' },
        { path: '/integrations/biometric', label: 'Biometric Device Connectors' },
        { path: '/integrations/import', label: 'Data Import/Migration Tools' }
      ]
    },
    {
      id: 'reports',
      title: 'Reporting & Analytics',
      icon: HiOutlineChartPie,
      subItems: [
        { path: '/reports/library', label: 'Library' },
        { path: '/reports/builder', label: 'Custom Report Builder' },
        { path: '/reports/dashboards', label: 'Visual Dashboards & Export' }
      ]
    },
    {
      id: 'iam',
      title: 'Security & IAM',
      icon: HiOutlineShieldCheck,
      subItems: [
        { path: '/iam/roles', label: 'Roles & Permissions' },
        { path: '/iam/audit', label: 'Audit Logs' }
      ]
    },
    {
      id: 'system-header',
      title: 'System',
      icon: HiOutlineMinus,
      subItems: [],
      isHeader: true
    },
    {
      id: 'system',
      title: 'System',
      icon: HiOutlineCog,
      subItems: [
        { path: '/system/branding', label: 'Branding & Theming' },
        { path: '/system/localization', label: 'Localization' },
        { path: '/system/backups', label: 'Backups & Exports' },
        { path: '/system/uat', label: 'UAT/Deployment Notes' }
      ]
    }
  ];

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => oldValue === value ? '' : value);
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

  const MenuHeader = ({ title }: { title: string }) => (
    <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
      <HiOutlineMinus className="w-4 h-5 flex-none" />
      <span>{t(title)}</span>
    </h2>
  );

  const MenuItem = ({ item }: { item: MenuItem }) => (
    <li className="menu nav-item">
      <button 
        type="button" 
        className={`${currentMenu === item.id ? 'active' : ''} nav-link group w-full`} 
        onClick={() => toggleMenu(item.id)}
      >
        <div className="flex items-center">
          <item.icon className="group-hover:text-secondary-blue! shrink-0 w-5 h-5" />
          <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t(item.title)}</span>
        </div>
        {item.subItems.length > 0 && (
          <div className={currentMenu !== item.id ? 'rtl:rotate-90 -rotate-90' : ''}>
            <HiOutlineChevronDown className="w-4 h-4" />
          </div>
        )}
      </button>
      {item.subItems.length > 0 && (
        <AnimateHeight duration={300} height={currentMenu === item.id ? 'auto' : 0}>
          <ul className="sub-menu text-gray-500">
            {item.subItems.map((subItem, index) => (
              <li key={index} className='flex items-center'>
                <NavLink to={subItem.path}>{t(subItem.label)}</NavLink>
              </li>
            ))}
          </ul>
        </AnimateHeight>
      )}
    </li>
  );

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
                  style={{ width: '170px' }}
                />
                <img
                  src={smallLogo}
                  alt="small-logo"
                  className={`absolute left-3 transition-opacity duration-300 ease-in-out ${showBigLogo ? 'opacity-0' : 'opacity-100'}`}
                  style={{ width: '38px' }}
                />
              </div>
            </NavLink>
            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <HiOutlineChevronDoubleLeft className="m-auto rotate-90 w-5 h-5" />
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              {menuItems.map((item) => (
                item.isHeader ? (
                  <MenuHeader key={item.id} title={item.title} />
                ) : (
                  <MenuItem key={item.id} item={item} />
                )
              ))}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;