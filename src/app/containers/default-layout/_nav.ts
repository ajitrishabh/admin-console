import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Masters',
    url: '/',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'State',
        url: '/master/state'
      },
      {
        name: 'City',
        url: '/master/city'
      },
      {
        name: 'Facility Type',
        url: '/master/facility'
      },
      {
        name: 'Assets defination',
        url: '/master/asset'
      }
    ]
  },
  {
    name: 'Facility',
    url: '/',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Add',
        url: '/facility/add'
      },
      {
        name: 'View',
        url: '/facility/view'
      }
    ]
  },{
    name: 'Tanent',
    url: '/',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Add',
        url: '/tanent/add'
      },
      {
        name: 'View',
        url: '/tanent/view'
      }
    ]
  },{
    name: 'Assets',
    url: '/',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Map',
        url: '/assets/map'
      },{
        name: 'View',
        url: '/assets/map/view'
      }
    ]
  }
];
