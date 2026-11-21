import { Boxes, KeyRound, LayoutDashboard, ListChecks, Shield, Users } from 'lucide-react'
import { ACTION_CODES, MODULE_CODES } from '@/constants/permissionCodes'
import { ROUTES } from '@/constants/routes'

// permission na ho to item sabhi logged-in users ko dikhega
export const NAVIGATION = [
  {
    label: 'Overview',
    items: [{ title: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard }],
  },
  {
    label: 'Access Management',
    items: [
      {
        title: 'Roles',
        path: ROUTES.ROLES,
        icon: Shield,
        permission: { module: MODULE_CODES.ROLES, action: ACTION_CODES.VIEW },
      },
      {
        title: 'Users',
        path: ROUTES.USERS,
        icon: Users,
        permission: { module: MODULE_CODES.USERS, action: ACTION_CODES.VIEW },
      },
      {
        title: 'Modules',
        path: ROUTES.MODULES,
        icon: Boxes,
        permission: { module: MODULE_CODES.MODULES, action: ACTION_CODES.VIEW },
      },
      {
        title: 'Module Actions',
        path: ROUTES.MODULE_ACTIONS,
        icon: ListChecks,
        permission: { module: MODULE_CODES.MODULE_ACTIONS, action: ACTION_CODES.VIEW },
      },
      {
        title: 'Permissions',
        path: ROUTES.PERMISSIONS,
        icon: KeyRound,
        permission: { module: MODULE_CODES.PERMISSIONS, action: ACTION_CODES.VIEW },
      },
    ],
  },
]