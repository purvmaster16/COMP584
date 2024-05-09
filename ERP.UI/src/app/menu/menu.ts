import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'home',
    badge: {
      title: '2',
      translate: 'MENU.DASHBOARD.BADGE',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'analytics',
        title: 'Analytics',
        translate: 'MENU.DASHBOARD.ANALYTICS',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'dashboard/analytics'
      },
      {
        // If role is not assigned will be display to all
        id: 'ecommerce',
        title: 'eCommerce',
        translate: 'MENU.DASHBOARD.ECOMMERCE',
        type: 'item',
        icon: 'circle',
        url: 'dashboard/ecommerce'
      }
    ]
  },
  // Apps & Pages
  {
      id: 'apps',
    type: 'section',
    title: 'Apps & Pages',
    translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
    //   {
    //     id: 'pages',
    //     title: 'Pages',
    //     translate: 'MENU.PAGES.SECTION',
    //     type: 'collapsible',
    //     icon: 'file-text',
    //     children: [
    //       {
    //         id: 'authentication',
    //         title: 'Authentication',
    //         translate: 'MENU.PAGES.AUTH.COLLAPSIBLE',
    //         type: 'collapsible',
    //         icon: 'circle',
    //         children: [
    //           {
    //             id: 'login-v1',
    //             title: 'Login V1',
    //             translate: 'MENU.PAGES.AUTH.LOGIN1',
    //             type: 'item',
    //             url: 'pages/authentication/login-v1',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'login-v2',
    //             title: 'Login V2',
    //             translate: 'MENU.PAGES.AUTH.LOGIN2',
    //             type: 'item',
    //             url: 'pages/authentication/login-v2',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'register-v1',
    //             title: 'Register V1',
    //             translate: 'MENU.PAGES.AUTH.REGISTER1',
    //             type: 'item',
    //             url: 'pages/authentication/register-v1',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'register-v2',
    //             title: 'Register V2',
    //             translate: 'MENU.PAGES.AUTH.REGISTER2',
    //             type: 'item',
    //             url: 'pages/authentication/register-v2',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'forgot-password-v1',
    //             title: 'Forgot Password V1',
    //             translate: 'MENU.PAGES.AUTH.FORGOTPASSWORD1',
    //             type: 'item',
    //             url: 'pages/authentication/forgot-password-v1',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'forgot-password-v2',
    //             title: 'Forgot Password V2',
    //             translate: 'MENU.PAGES.AUTH.FORGOTPASSWORD2',
    //             type: 'item',
    //             url: 'pages/authentication/forgot-password-v2',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'reset-password-v1',
    //             title: 'Reset Password V1',
    //             translate: 'MENU.PAGES.AUTH.RESETPASSWORD1',
    //             type: 'item',
    //             url: 'pages/authentication/reset-password-v1',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'reset-password-v2',
    //             title: 'Reset Password V2',
    //             translate: 'MENU.PAGES.AUTH.RESETPASSWORD2',
    //             type: 'item',
    //             url: 'pages/authentication/reset-password-v2',
    //             openInNewTab: true
    //           }
    //         ]
    //       },
    //       {
    //         id: 'account-settings',
    //         title: 'Account Settings',
    //         translate: 'MENU.PAGES.ACCOUNTSETTINGS',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'pages/account-settings'
    //       },
    //       {
    //         id: 'profile',
    //         title: 'Profile',
    //         translate: 'MENU.PAGES.PROFILE',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'pages/profile'
    //         // collapsed: true
    //       },
    //       {
    //         id: 'faq',
    //         title: 'FAQ',
    //         translate: 'MENU.PAGES.FAQ',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'pages/faq'
    //       },
    //       {
    //         id: 'knowledgeBase',
    //         title: 'Knowledge Base',
    //         translate: 'MENU.PAGES.KB',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'pages/knowledge-base'
    //       },
    //       {
    //         id: 'pricing',
    //         title: 'Pricing',
    //         translate: 'MENU.PAGES.PRICING',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'pages/pricing'
    //       },

    //       {
    //         id: 'blog',
    //         title: 'Blog',
    //         translate: 'MENU.PAGES.BLOG.COLLAPSIBLE',
    //         type: 'collapsible',
    //         icon: 'circle',
    //         children: [
    //           {
    //             id: 'blog-list',
    //             title: 'List',
    //             translate: 'MENU.PAGES.BLOG.LIST',
    //             type: 'item',
    //             url: 'pages/blog-list'
    //           },
    //           {
    //             id: 'blog-details',
    //             title: 'Detail',
    //             translate: 'MENU.PAGES.BLOG.DETAILS',
    //             type: 'item',
    //             url: 'pages/blog-details'
    //           },
    //           {
    //             id: 'blog-edit',
    //             title: 'Edit',
    //             translate: 'MENU.PAGES.BLOG.EDIT',
    //             type: 'item',
    //             url: 'pages/blog-edit'
    //           }
    //         ]
    //       },

    //       {
    //         id: 'mail-template',
    //         title: 'Mail Template',
    //         translate: 'MENU.PAGES.MAIL.COLLAPSIBLE',
    //         type: 'collapsible',
    //         icon: 'circle',
    //         children: [
    //           {
    //             id: 'mail-welcome',
    //             title: 'Welcome',
    //             translate: 'MENU.PAGES.MAIL.WELCOME',
    //             type: 'item',
    //             url: 'https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html',
    //             externalUrl: true,
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'mail-reset',
    //             title: 'Reset Password',
    //             translate: 'MENU.PAGES.MAIL.RESET',
    //             type: 'item',
    //             url: 'https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html',
    //             externalUrl: true,
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'mail-verify',
    //             title: 'Verify',
    //             translate: 'MENU.PAGES.MAIL.VERIFY',
    //             type: 'item',
    //             url: 'https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html',
    //             externalUrl: true,
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'mail-deactivate',
    //             title: 'Deactivate',
    //             translate: 'MENU.PAGES.MAIL.DEACTIVATE',
    //             type: 'item',
    //             url: 'https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html',
    //             externalUrl: true,
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'mail-invoice',
    //             title: 'Invoice',
    //             translate: 'MENU.PAGES.MAIL.INVOICE',
    //             type: 'item',
    //             url: 'https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html',
    //             externalUrl: true,
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'mail-promotional',
    //             title: 'Promotional',
    //             translate: 'MENU.PAGES.MAIL.PROMOTIONAL',
    //             type: 'item',
    //             url: 'https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html',
    //             externalUrl: true,
    //             openInNewTab: true
    //           }
    //         ]
    //       },

    //       {
    //         id: 'miscellaneous',
    //         title: 'Miscellaneous',
    //         translate: 'MENU.PAGES.MISC.COLLAPSIBLE',
    //         type: 'collapsible',
    //         icon: 'circle',
    //         children: [
    //           {
    //             id: 'misc-comingsoon',
    //             title: 'Coming Soon',
    //             translate: 'MENU.PAGES.MISC.COMINGSOON',
    //             type: 'item',
    //             url: 'pages/miscellaneous/coming-soon',
    //             openInNewTab: true
    //           },

    //           {
    //             id: 'misc-not-authorized',
    //             title: 'Not Authorized',
    //             translate: 'MENU.PAGES.MISC.NOTAUTH',
    //             type: 'item',
    //             url: 'pages/miscellaneous/not-authorized',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'maintenance',
    //             title: 'Maintenance',
    //             translate: 'MENU.PAGES.MISC.MAINTENANCE',
    //             type: 'item',
    //             url: 'pages/miscellaneous/maintenance',
    //             openInNewTab: true
    //           },
    //           {
    //             id: 'error',
    //             title: 'Error',
    //             translate: 'MENU.PAGES.MISC.ERROR',
    //             type: 'item',
    //             url: 'pages/miscellaneous/error',
    //             openInNewTab: true
    //           }
    //         ]
    //       }
    //     ]
    //   },
      // {
      //   id: 'e-commerce',
      //   title: 'eCommerce',
      //   translate: 'MENU.APPS.ECOMMERCE.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'shopping-cart',
      //   children: [
      //     {
      //       id: 'shop',
      //       title: 'Shop',
      //       translate: 'MENU.APPS.ECOMMERCE.SHOP',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/shop'
      //     },
      //     {
      //       id: 'details',
      //       title: 'Details',
      //       translate: 'MENU.APPS.ECOMMERCE.DETAIL',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/details'
      //     },
      //     {
      //       id: 'wishList',
      //       title: 'Wish List',
      //       translate: 'MENU.APPS.ECOMMERCE.WISHLIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/wishlist'
      //     },
      //     {
      //       id: 'checkout',
      //       title: 'Checkout',
      //       translate: 'MENU.APPS.ECOMMERCE.CHECKOUT',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/checkout'
      //     }
      //   ]
      // },
      {
        id: 'users',
        title: 'Users',
        translate: 'MENU.APPS.USER.COLLAPSIBLE',
        type: 'item',
        icon: 'user',
        url: 'apps/user/user-list'
        // children: [
        //   {
        //     id: 'list',
        //     title: 'List',
        //     translate: 'MENU.APPS.USER.LIST',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'apps/user/user-list'
        //   },
        //   {
        //     id: 'add',
        //     title: 'Add',
        //     // translate: 'MENU.APPS.USER.VIEW',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'apps/user/user-manage'
        //   },
          // {
          //   id: 'edit',
          //   title: 'Edit',
          //   translate: 'MENU.APPS.USER.EDIT',
          //   type: 'item',
          //   icon: 'circle',
          //   url: 'apps/user/user-edit'
          // }
          // ]
      },
      {
        id: 'roles',
        title: 'Roles',
        translate: 'MENU.APPS.ROLE.COLLAPSIBLE',
        type: 'item',
        icon: 'user',
        url: 'apps/role/role-list'
        // children: [
        //   {
        //     id: 'list',
        //     title: 'List',
        //     translate: 'MENU.APPS.ROLE.LIST',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'apps/role/role-list'
        //   },
        //   // {
        //   //   id: 'edit',
        //   //   title: 'Edit',
        //   //   translate: 'MENU.APPS.ROLE.EDIT',
        //   //   type: 'item',
        //   //   icon: 'circle',
        //   //   url: 'apps/role/role-edit'
        //   // }
        // ]
      },
      // {
      //   id: 'products',
      //   title: 'Product',
      //   translate: 'MENU.APPS.PRODUCT.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'user',
      //   children: [
      //     {
      //       id: 'list',
      //       title: 'List',
      //       translate: 'MENU.APPS.PRODUCT.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/product/product-list'
      //     },
      //     {
      //       id: 'view',
      //       title: 'View',
      //       translate: 'MENU.APPS.PRODUCT.VIEW',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/product/product-view'
      //     },
      //     {
      //       id: 'edit',
      //       title: 'Edit',
      //       translate: 'MENU.APPS.PRODUCT.EDIT',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/product/product-edit'
      //     }
      //   ]
      // },
      {
        id: 'user-role-permission',
        title: 'User-Roles',
        translate: 'MENU.APPS.USERROLEPERMISSION.COLLAPSIBLE',
        type: 'item',
        icon: 'user',
        url: 'apps/user-role/user-role-permission'
        // children: [
        //   {
        //     id: 'user-role',
        //     title: 'List',
        //     translate: 'MENU.APPS.USERROLEPERMISSION.LIST',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'apps/user-role/user-role-permission'
        //   }
        // ]
      },
       {
        id: 'role-menu-permission',
        title: 'Role-Menus',
        translate: 'MENU.APPS.ROLEMENUPERMISSION.COLLAPSIBLE',
        type: 'item',
        icon: 'user',
        url: 'apps/role-menu/role-menu-permission'
        // children: [
        //   {
        //     id: 'role-menu',
        //     title: 'List',
        //     translate: 'MENU.APPS.ROLEMENUPERMISSION.LIST',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'apps/role-menu/role-menu-permission'
        //   }
        // ]
      }
    ]
  },
];
