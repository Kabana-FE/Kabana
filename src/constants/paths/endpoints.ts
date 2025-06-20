export const AUTH_ENDPOINTS = {
  SIGNUP: '/users',
  SIGNIN: '/auth/login',
  CHANGE_PASSWORD: '/auth/password',
};

export const CARD_ENDPOINTS = {
  CREATE: '/cards',
  LIST: '/cards',
  DETAIL: (cardId: string) => `/cards/${cardId}`,
  UPDATE: (cardId: string) => `/cards/${cardId}`,
  DELETE: (cardId: string) => `/cards/${cardId}`,
};

export const COLUMN_ENDPOINTS = {
  CREATE: '/columns',
  LIST: '/columns',
  UPDATE: (columnId: string) => `/columns/${columnId}`,
  DELETE: (columnId: string) => `/columns/${columnId}`,
  UPLOAD_CARD_IMAGE: (columnId: string) => `/columns/${columnId}/card-image`,
};

export const COMMENT_ENDPOINTS = {
  CREATE: '/comments',
  LIST: '/comments',
  UPDATE: (commentId: string) => `/comments/${commentId}`,
  DELETE: (commentId: string) => `/comments/${commentId}`,
};

export const DASHBOARD_ENDPOINTS = {
  CREATE: '/dashboards',
  LIST: '/dashboards',
  DETAIL: (dashboardId: string) => `/dashboards/${dashboardId}`,
  UPDATE: (dashboardId: string) => `/dashboards/${dashboardId}`,
  DELETE: (dashboardId: string) => `/dashboards/${dashboardId}`,
  INVITE: (dashboardId: string) => `/dashboards/${dashboardId}/invitations`,
  GET_INVITATIONS: (dashboardId: string) => `/dashboards/${dashboardId}/invitations`,
  CANCEL_INVITATION: (dashboardId: string, invitationId: string) =>
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
};

export const INVITATION_ENDPOINTS = {
  LIST: '/invitations',
  RESPOND: (invitationId: string) => `/invitations/${invitationId}`,
};

export const MEMBER_ENDPOINTS = {
  LIST: '/members',
  DELETE: (memberId: string) => `/members/${memberId}`,
};

export const USER_ENDPOINTS = {
  MY_PROFILE: '/users/me',
  UPDATE_MY_PROFILE: '/users/me',
  UPLOAD_MY_PROFILE_IMAGE: '/users/me/image',
};
