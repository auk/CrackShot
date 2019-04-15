import { defineMessages } from 'react-intl';

export const defaultMessage = defineMessages({
  common: {
    close: {
      id: 'common.close',
      description: 'Close button',
      defaultMessage: 'Close'
    },
    delete: {
      id: 'common.delete',
      description: 'Delete button',
      defaultMessage: 'Delete'
    },
    view: {
      id: 'common.view',
      description: 'View button',
      defaultMessage: 'View'
    },
    edit: {
      id: 'common.edit',
      description: 'Edit button',
      defaultMessage: 'Edit'
    },
    search: {
      id: 'common.search',
      description: 'Search button',
      defaultMessage: 'Search'
    },
    create: {
      id: 'common.create',
      description: 'Create button',
      defaultMessage: 'Create'
    },
    add: {
      id: 'common.add',
      description: 'Add button',
      defaultMessage: 'Add'
    },
    login: {
      id: 'common.login',
      description: 'Login button',
      defaultMessage: 'Log in'
    },
    logout: {
      id: 'common.logout',
      description: 'Logout button',
      defaultMessage: 'Log out'
    },
    reset: {
      id: 'common.reset',
      description: 'Reset button',
      defaultMessage: 'Reset'
    },
    yes: {
      id: 'common.yes',
      description: 'Yes button',
      defaultMessage: 'Yes'
    },
    no: {
      id: 'common.no',
      description: 'No button',
      defaultMessage: 'No'
    },
    cancel: {
      id: 'common.cancel',
      description: 'Cancel button',
      defaultMessage: 'Cancel'
    },
    save: {
      id: 'common.save',
      defaultMessage: 'Save'
    },
    breadcrumb: {
      home: {
        id: 'common.breadcrumb.home',
        description: 'Home breadcrumb item',
        defaultMessage: 'Home'
      },
      about: {
        id: 'common.breadcrumb.about',
        description: 'About breadcrumb item',
        defaultMessage: 'About'
      },
    },
  },
  footer: {
    version: {
      id: 'footer.version',
      description: 'Application version',
      defaultMessage: 'Version'
    },
    rights: {
      id: 'footer.rights',
      description: 'All rights reserved',
      defaultMessage: 'All rights reserved.'
    },
    copyright: {
      id: 'footer.copyright',
      description: 'Copyright',
      defaultMessage: 'Copyright {copy} {year} {copyrightLink}.'
    }
  },
  navigation: {
    anonymous: {
      id: 'navigation.anonymous',
      description: 'Anonymous user',
      defaultMessage: 'Anonymous'
    },
    guest: {
      id: 'navigation.guest',
      description: 'Guest role',
      defaultMessage: 'Guest'
    },
    user: {
      id: 'navigation.user',
      description: 'User role',
      defaultMessage: 'User'
    },
    admin: {
      id: 'navigation.admin',
      description: 'Admin role',
      defaultMessage: 'Admin',
    },
    navItem: {
      home: {
        id: 'navigation.navItem.home',
        description: 'Home navigation item',
        defaultMessage: 'Home'
      },
      about: {
        id: 'navigation.navItem.about',
        description: 'About navigation item',
        defaultMessage: 'About'
      },
    }
  },
  language: {
    en: {
      id: 'language.en',
      description: 'English language',
      defaultMessage: 'English'
    },
    de: {
      id: 'language.de',
      description: 'German language',
      defaultMessage: 'German'
    },
    ru: {
      id: 'language.ru',
      description: 'Russian language',
      defaultMessage: 'Russian'
    }
  },
  loginpage: {
    welcome: {
      id: 'loginpage.welcome',
      description: 'Welcome message to the user',
      defaultMessage: 'Welcome in appName Project'
    },
    description: {
      id: 'loginpage.description',
      description: 'Login form description',
      defaultMessage: 'Sign in to start your session'
    },
    usernameHint: {
      id: 'loginpage.usernameHint',
      description: 'Username hint',
      defaultMessage: 'Username (hint: user)'
    },
    passwordHint: {
      id: 'loginpage.passwordHint',
      description: 'Password hint',
      defaultMessage: 'Password (hint: password)'
    },
    commonHint: {
      id: 'loginpage.commonHint',
      description: 'Commmon hont for login form',
      defaultMessage: 'Hint: use user/password to log in.'
    },
    title: {
      id: 'loginpage.title',
      description: 'Title for login page',
      defaultMessage: 'appName | Login'
    },
  },
  notFound: {
    title: {
      id: 'notFound.title',
      description: 'Title for 404 page',
      defaultMessage: 'appName | Page not found'
    },
    h3: {
      id: 'notFound.h3',
      description: 'Content header (h3)',
      defaultMessage: 'Page not found'
    },
    description: {
      id: 'notFound.description',
      description: 'Error description',
      defaultMessage: 'We could not find the page you were looking for. Meanwhile, you may {link}.'
    },
    return: {
      id: 'notFound.return',
      description: 'Return to main page link',
      defaultMessage: 'return to main page'
    }
  },
  home: {
    welcome: {
      id: 'home.welcome',
      description: 'Welcome message to the user',
      defaultMessage: 'Welcome in appName Project'
    },
    about: {
      id: 'home.about',
      description: 'About header',
      defaultMessage: 'The ultimate timer. It\'s insanely simple.'
    },
    intro: {
      id: 'home.intro',
      description: 'Introductive message about the website',
      defaultMessage: 'appName\'s time tracker is built for speed and ease of use. {br} Time logging with sxtToggl is so simple that you’ll actually use it.'
    },
    start: {
      id: 'home.start',
      description: 'Get Started button',
      defaultMessage: 'Get Started {arr}'
    },
    title: {
      id: 'home.title',
      description: 'Title for Home page',
      defaultMessage: 'appName | Home'
    }
  },
  about: {
    title: {
      id: 'about.title',
      description: 'Title for About page',
      defaultMessage: 'appName | About'
    },
    h2: {
      id: 'about.h2',
      description: 'Content header (h2)',
      defaultMessage: 'About'
    }
  },
})
