import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/home/statiscalmanage',
    home: true,
  },
  {
    title: 'Tính năng',
    group: true,
  },
  {
    title: 'Người dùng',
    icon: 'person-outline',
    link: '/home/userlists',
  },
  {
    title: 'Công việc đăng ký',
    icon: 'globe-2-outline',
    link: '/home/job_register',
  },
  {
    title: 'Sản phẩm',
    icon: 'globe-2-outline',
    link: '/home/product',
  },
  {
    title: 'Trang public',
    icon: 'globe-2-outline',
    link: '/public/jobpublic',
  },
  {
    title: 'Tin tuyển dụng',
    icon: 'globe-2-outline',
    link: '/home/jobcomponent',

  }
];