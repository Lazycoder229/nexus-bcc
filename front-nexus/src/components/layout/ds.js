import {
  Home,
  BarChart2,
  Bell,
  Users,
  Server,
  Layers,
  BookOpen,
  FileText,
  Clipboard,
  CreditCard,
  Wallet,
  Briefcase,
  Book,
  Box,
  CheckSquare,
  Settings,
  GraduationCap,
} from "lucide-react";

const sidebarSections = [
  // ======================
  // 📂 GENERAL SECTION
  // ======================
  {
    group: "General",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: Home,
        path: "/admin/dashboard",
      },
    ],
  },

  // ======================
  // 🎓 ACADEMICS SECTION
  // ======================
  {
    group: "Academics",
    items: [
      {
        id: "department-course",
        title: "Department & Course",
        icon: Layers,
        items: [
          {
            id: "dept-list",
            label: "Department Management",
            path: "/admin/departments",
          },
          {
            id: "create-course",
            label: "Course Management",
            path: "/admin/courses/new",
          },

          {
            id: "curriculum",
            label: "Curriculum Setup",
            path: "/admin/curriculum",
          },

          {
            id: "prereq",
            label: "Prerequisite Setup",
            path: "/admin/prerequisites",
          },
          {
            id: "course-fee",
            label: "Course Fee Setup",
            path: "/admin/course-fees",
          },

          {
            id: "academic-year",
            label: "Academic Year & Semester Management",
            path: "/admin/academic-year",
          },
        ],
      },
      {
        id: "enrollment",
        title: "Admission & Enrollment",
        icon: GraduationCap,
        items: [
          {
            id: "application",
            label: "Student Applications",
            path: "/admission/applications",
          },
          {
            id: "evaluation",
            label: "Applicant Evaluation",
            path: "/admission/evaluation",
          },
          {
            id: "admission-result",
            label: "Admission Results",
            path: "/admission/results",
          },
          {
            id: "enrollment-list",
            label: "Enrollment List",
            path: "/enrollment/list",
          },
          {
            id: "enrollment-statistics",
            label: "Enrollment Statistics",
            path: "/enrollment/statistics",
          },
        ],
      },
      {
        id: "student-management",
        title: "Student Management",
        icon: BookOpen,
        items: [
          {
            id: "student-list",
            label: "Student List",
            path: "/admin/students",
          },
          {
            id: "admission-form",
            label: "Admission Form",
            path: "/admin/admissions/new",
          },
          {
            id: "enrollment-records",
            label: "Enrollment Records",
            path: "/admin/enrollments",
          },
          {
            id: "course-transfers",
            label: "Course Transfers / Shifting",
            path: "/admin/transfers",
          },
          {
            id: "student-profile",
            label: "Student Profile (360 View)",
            path: "/admin/student/:id",
          },
          {
            id: "academic-history",
            label: "Academic History",
            path: "/admin/academic-history",
          },
          {
            id: "id-generation",
            label: "ID Generation & Barcode",
            path: "/admin/id-gen",
          },
          {
            id: "scholarship-assignment",
            label: "Scholarship Assignment",
            path: "/admin/scholarships/assign",
          },
          {
            id: "batch-management",
            label: "Batch Management",
            path: "/admin/batches",
          },
          {
            id: "clearance",
            label: "Student Clearance Processing",
            path: "/admin/clearance",
          },
          {
            id: "doc-archive",
            label: "Student Document Archive",
            path: "/admin/student-docs",
          },
        ],
      },
      {
        id: "faculty-management",
        title: "Faculty Management",
        icon: Briefcase,
        items: [
          {
            id: "faculty-profiles",
            label: "Faculty Profiles",
            path: "/admin/faculty",
          },
          {
            id: "assign-subjects",
            label: "Assign Subjects & Courses",
            path: "/admin/assign-subjects",
          },
          {
            id: "teaching-load",
            label: "Teaching Load Setup",
            path: "/admin/teaching-load",
          },
          {
            id: "evaluation",
            label: "Faculty Evaluation",
            path: "/admin/faculty-eval",
          },
          {
            id: "research-records",
            label: "Research / Extension Records",
            path: "/admin/research",
          },
          {
            id: "advisory-assignments",
            label: "Advisory Assignments",
            path: "/admin/advisory",
          },
          {
            id: "faculty-attendance",
            label: "Faculty Attendance Logs",
            path: "/admin/faculty-attendance",
          },
          {
            id: "workload-report",
            label: "Workload Report",
            path: "/admin/workload",
          },
          {
            id: "scheduling",
            label: "Faculty Scheduling",
            path: "/admin/faculty-schedule",
          },
          {
            id: "digital-portfolio",
            label: "Digital Portfolio",
            path: "/admin/portfolio",
          },
        ],
      },
      {
        id: "academic-management",
        title: "Academic Management",
        icon: Clipboard,
        items: [
          {
            id: "subjects-sections",
            label: "Subjects & Sections",
            path: "/admin/subjects",
          },
          {
            id: "timetable",
            label: "Timetable Builder",
            path: "/admin/timetable",
          },
          {
            id: "academic-calendar",
            label: "Academic Calendar",
            path: "/admin/calendar",
          },
          {
            id: "capacity-monitor",
            label: "Class Capacity Monitor",
            path: "/admin/capacity",
          },
          {
            id: "year-setup",
            label: "Academic Year Setup",
            path: "/admin/year-setup",
          },
          {
            id: "syllabus",
            label: "Syllabus Repository",
            path: "/admin/syllabus",
          },
          {
            id: "prerequisites",
            label: "Subject Prerequisites",
            path: "/admin/subject-prereq",
          },
          {
            id: "accreditation",
            label: "Program Accreditation Tracker",
            path: "/admin/accreditation",
          },
          {
            id: "advising-tools",
            label: "Academic Advising Tools",
            path: "/admin/advising",
          },
        ],
      },
      {
        id: "attendance-management",
        title: "Attendance Management",
        icon: CheckSquare,
        items: [
          {
            id: "student-attendance",
            label: "Student Attendance",
            path: "/admin/attendance/students",
          },
          {
            id: "staff-attendance",
            label: "Staff Attendance",
            path: "/admin/attendance/staff",
          },
          {
            id: "rfid-biometric",
            label: "RFID / Biometric Integration",
            path: "/admin/integrations/rfid",
          },
          {
            id: "manual-entry",
            label: "Manual Attendance Entry",
            path: "/admin/attendance/manual",
          },
          {
            id: "daily-summary",
            label: "Daily Summary Report",
            path: "/admin/attendance/daily",
          },
          {
            id: "absentee-alerts",
            label: "Absentee Alerts (SMS / Email)",
            path: "/admin/attendance/alerts",
          },
          {
            id: "attendance-analytics",
            label: "Attendance Analytics Dashboard",
            path: "/admin/attendance/analytics",
          },
          {
            id: "import-export",
            label: "Import / Export Attendance Data",
            path: "/admin/attendance/import-export",
          },
        ],
      },
      {
        id: "scholarships",
        title: "Scholarships & Grants",
        icon: Wallet,
        items: [
          {
            id: "application-form",
            label: "Application Form",
            path: "/admin/scholarships/apply",
          },
          {
            id: "eligibility",
            label: "Eligibility Screening",
            path: "/admin/scholarships/eligibility",
          },
          {
            id: "approval-workflow",
            label: "Approval Workflow",
            path: "/admin/scholarships/workflow",
          },
          {
            id: "fund-alloc",
            label: "Fund Allocation",
            path: "/admin/scholarships/funds",
          },
          {
            id: "disbursement-records",
            label: "Disbursement Records",
            path: "/admin/scholarships/disbursements",
          },
          {
            id: "renewals",
            label: "Renewal Management",
            path: "/admin/scholarships/renewals",
          },
          {
            id: "beneficiary-list",
            label: "Beneficiary List",
            path: "/admin/scholarships/beneficiaries",
          },
          {
            id: "scholarship-reports",
            label: "Scholarship Reports",
            path: "/admin/scholarships/reports",
          },
        ],
      },
      {
        id: "exams-grading",
        title: "Examinations & Grading",
        icon: FileText,
        items: [
          {
            id: "exam-setup",
            label: "Exam Setup (Midterm, Final, Special)",
            path: "/admin/exams/setup",
          },
          {
            id: "grade-entry",
            label: "Grade Entry & Approval",
            path: "/admin/grades",
          },
          {
            id: "grade-compute",
            label: "Grade Computation Setup",
            path: "/admin/grade-computation",
          },
          {
            id: "grade-audit",
            label: "Grade Audit (per Course / Faculty)",
            path: "/admin/grade-audit",
          },
          {
            id: "exam-schedule",
            label: "Exam Schedule Builder",
            path: "/admin/exam-schedule",
          },
          {
            id: "grade-appeal",
            label: "Grade Appeal Tracking",
            path: "/admin/grade-appeals",
          },
          {
            id: "transcript",
            label: "Transcript Generator",
            path: "/admin/transcripts",
          },
          { id: "gpa-report", label: "GPA & CGPA Report", path: "/admin/gpa" },
          {
            id: "auto-backup-grades",
            label: "Auto Grade Backup",
            path: "/admin/grades/backup",
          },
        ],
      },
    ],
  },

  // ======================
  // 💼 FINANCE & HR SECTION
  // ======================
  {
    group: "Finance & HR",
    items: [
      {
        id: "finance-accounting",
        title: "Finance & Accounting",
        icon: CreditCard,
        items: [
          {
            id: "tuition-setup",
            label: "Tuition Fee Setup (Course-based)",
            path: "/admin/finance/tuition",
          },
          {
            id: "payment-collection",
            label: "Payment Collection",
            path: "/admin/finance/payments",
          },
          {
            id: "invoices",
            label: "Invoice Management",
            path: "/admin/finance/invoices",
          },
          {
            id: "due-alerts",
            label: "Due Alerts (SMS/Email)",
            path: "/admin/finance/alerts",
          },
          {
            id: "chart-of-accounts",
            label: "Chart of Accounts",
            path: "/admin/finance/chart-of-accounts",
          },
          {
            id: "journal-entries",
            label: "Journal Entries",
            path: "/admin/finance/journals",
          },
          {
            id: "income-expense",
            label: "Income & Expense Reports",
            path: "/admin/finance/reports",
          },
          {
            id: "scholarship-fund",
            label: "Scholarship Fund Allocation",
            path: "/admin/finance/scholarships",
          },
          {
            id: "budget-planning",
            label: "Budget Planning",
            path: "/admin/finance/budget",
          },
          {
            id: "audit-trail-finance",
            label: "Audit Trail",
            path: "/admin/finance/audit",
          },
          {
            id: "payment-gateway",
            label: "Payment Gateway Integration",
            path: "/admin/finance/gateways",
          },
          {
            id: "financial-analytics",
            label: "Financial Analytics Dashboard",
            path: "/admin/finance/analytics",
          },
        ],
      },
      {
        id: "hr-payroll",
        title: "HR & Payroll",
        icon: Users,
        items: [
          {
            id: "employee-records",
            label: "Employee Records",
            path: "/admin/hr/employees",
          },
          {
            id: "load-incentives",
            label: "Faculty Load Incentives",
            path: "/admin/hr/incentives",
          },
          {
            id: "staff-attendance-leave",
            label: "Staff Attendance & Leave",
            path: "/admin/hr/attendance",
          },
          {
            id: "payroll",
            label: "Payroll Computation",
            path: "/admin/hr/payroll",
          },
          {
            id: "deductions",
            label: "Deductions & Allowances Setup",
            path: "/admin/hr/deductions",
          },
          {
            id: "payslip",
            label: "Payslip Generator",
            path: "/admin/hr/payslips",
          },
          {
            id: "govt-deductions",
            label: "Government Deductions (SSS, PhilHealth, Pag-IBIG)",
            path: "/admin/hr/govt",
          },
          {
            id: "payroll-reports",
            label: "Payroll Reports",
            path: "/admin/hr/reports",
          },
          {
            id: "recruitment",
            label: "Recruitment Tracker",
            path: "/admin/hr/recruitment",
          },
          {
            id: "contract-mgmt",
            label: "Contract Management",
            path: "/admin/hr/contracts",
          },
        ],
      },
    ],
  },

  // ======================
  // ⚙️ SYSTEM & OTHERS
  // ======================
  {
    group: "System & Others",
    items: [
      {
        id: "user-management",
        title: "User Management",
        icon: Users,
        items: [
          { id: "manage-users", label: "Manage Users", path: "/admin/users" },
          {
            id: "roles",
            label: "Create Role / Permission Groups",
            path: "/admin/roles",
          },

          // Sidebar/menu
          {
            id: "audit-logs",
            label: "Audit Logs",
            path: "/admin/audit-logs",
          },
          {
            id: "backup",
            label: "Data Backup & Restore",
            path: "/admin/backup",
          },
        ],
      },
      {
        id: "library-management",
        title: "Library Management",
        icon: Book,
        items: [
          {
            id: "book-catalog",
            label: "Book Catalog",
            path: "/admin/library/catalog",
          },
          {
            id: "borrow-return",
            label: "Borrow / Return Management",
            path: "/admin/library/borrow-return",
          },
          {
            id: "reservations",
            label: "Book Reservations",
            path: "/admin/library/reservations",
          },
          {
            id: "lost-damaged",
            label: "Lost / Damaged Book Logs",
            path: "/admin/library/lost-damaged",
          },
          {
            id: "penalties",
            label: "Penalty Management",
            path: "/admin/library/penalties",
          },
          {
            id: "rfid-tagging",
            label: "RFID Tagging",
            path: "/admin/library/rfid",
          },
          {
            id: "digital-library",
            label: "Digital Library (E-books / PDFs)",
            path: "/admin/library/digital",
          },
          {
            id: "library-analytics",
            label: "Library Analytics",
            path: "/admin/library/analytics",
          },
        ],
      },
      {
        id: "lms",
        title: "Learning Management",
        icon: Server,
        items: [
          {
            id: "course-lessons",
            label: "Course Lessons",
            path: "/admin/lms/lessons",
          },
          {
            id: "module-uploads",
            label: "Module Uploads",
            path: "/admin/lms/uploads",
          },
          {
            id: "assignments-quizzes",
            label: "Assignments & Quizzes",
            path: "/admin/lms/assignments",
          },
          {
            id: "video-lectures",
            label: "Video Lectures Integration",
            path: "/admin/lms/videos",
          },
          {
            id: "student-submissions",
            label: "Student Submissions",
            path: "/admin/lms/submissions",
          },
          {
            id: "discussion-forum",
            label: "Course Discussion Forum",
            path: "/admin/lms/forum",
          },
          {
            id: "class-announcements",
            label: "Class Announcements",
            path: "/admin/lms/announcements",
          },
          {
            id: "grading-integration",
            label: "Grading Integration",
            path: "/admin/lms/grading",
          },
          {
            id: "lms-activity",
            label: "LMS Activity Report",
            path: "/admin/lms/activity",
          },
          {
            id: "ai-tutor",
            label: "AI Tutor Integration (Chatbot Helpdesk)",
            path: "/admin/lms/ai-tutor",
          },
        ],
      },
      {
        id: "events-comm",
        title: "Events & Communication",
        icon: Bell,
        items: [
          {
            id: "announcement-center",
            label: "Announcement Center",
            path: "/admin/announcements",
          },
          {
            id: "campaigns",
            label: "SMS / Email Campaigns",
            path: "/admin/campaigns",
          },
          {
            id: "internal-messaging",
            label: "Internal Messaging System",
            path: "/admin/messaging",
          },
          {
            id: "discussion-boards",
            label: "Discussion Boards",
            path: "/admin/discussions",
          },
          {
            id: "school-calendar",
            label: "School Calendar",
            path: "/admin/events",
          },
          {
            id: "event-scheduling",
            label: "Event Scheduling",
            path: "/admin/events/schedule",
          },
          {
            id: "feedback-forms",
            label: "Feedback Forms",
            path: "/admin/feedback",
          },
          {
            id: "contact-directory",
            label: "Contact Directory",
            path: "/admin/contacts",
          },
          {
            id: "public-events",
            label: "Public Event Posting",
            path: "/admin/public-events",
          },
        ],
      },
      {
        id: "inventory-assets",
        title: "Inventory & Assets",
        icon: Box,
        items: [
          { id: "asset-list", label: "Asset List", path: "/admin/assets" },
          {
            id: "procurement",
            label: "Procurement Requests",
            path: "/admin/procurement",
          },
          {
            id: "maintenance",
            label: "Maintenance Logs",
            path: "/admin/maintenance",
          },
          {
            id: "department-allocation",
            label: "Department Allocation",
            path: "/admin/asset-allocation",
          },
          {
            id: "depreciation",
            label: "Asset Depreciation Tracker",
            path: "/admin/depreciation",
          },

          {
            id: "supplier-mgmt",
            label: "Supplier Management",
            path: "/admin/suppliers",
          },
          {
            id: "inventory-tracking",
            label: "Inventory Tracking",
            path: "/admin/inventory/tracking",
          },
          {
            id: "reorder-alerts",
            label: "Reorder Alerts",
            path: "/admin/inventory/alerts",
          },
        ],
      },
      {
        id: "system-settings",
        title: "System Settings",
        icon: Settings,
        items: [
          {
            id: "general-settings",
            label: "General Settings",
            path: "/admin/settings/general",
          },
          {
            id: "user-roles",
            label: "User Roles & Permissions",
            path: "/admin/settings/roles",
          },
          {
            id: "security",
            label: "Security Configuration",
            path: "/admin/settings/security",
          },
          {
            id: "audit-trail",
            label: "Audit Trail Logs",
            path: "/admin/settings/audit",
          },
          {
            id: "database-backup",
            label: "Database Backup & Restore",
            path: "/admin/settings/backup",
          },
          {
            id: "system-updates",
            label: "System Updates",
            path: "/admin/settings/updates",
          },
          {
            id: "api-integration",
            label: "API Integrations",
            path: "/admin/settings/api",
          },
          {
            id: "notifications",
            label: "Notification Settings",
            path: "/admin/settings/notifications",
          },
          {
            id: "themes",
            label: "Themes & Customization",
            path: "/admin/settings/themes",
          },
          {
            id: "activity-logs",
            label: "System Activity Logs",
            path: "/admin/settings/logs",
          },
        ],
      },
      {
        id: "analytics-reports",
        title: "Analytics & Reports",
        icon: BarChart2,
        items: [
          {
            id: "student-performance",
            label: "Student Performance Dashboard",
            path: "/admin/analytics/students",
          },
          {
            id: "faculty-performance",
            label: "Faculty Performance Reports",
            path: "/admin/analytics/faculty",
          },
          {
            id: "financial",
            label: "Financial Reports",
            path: "/admin/analytics/finance",
          },
          {
            id: "attendance",
            label: "Attendance Reports",
            path: "/admin/analytics/attendance",
          },
          {
            id: "enrollment-trends",
            label: "Enrollment Trends",
            path: "/admin/analytics/enrollment",
          },
          {
            id: "scholarship",
            label: "Scholarship Statistics",
            path: "/admin/analytics/scholarships",
          },
          {
            id: "library",
            label: "Library Usage Reports",
            path: "/admin/analytics/library",
          },
          {
            id: "system",
            label: "System Performance & Uptime",
            path: "/admin/analytics/system",
          },
          {
            id: "custom",
            label: "Custom Report Builder",
            path: "/admin/analytics/custom",
          },
          {
            id: "reports",
            label: "Inventory Reports",
            path: "/admin/inventory/reports",
          },
        ],
      },
    ],
  },
];

export default sidebarSections;
