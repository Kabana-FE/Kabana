import type { Invitation } from '@/schemas/invitation';

export interface InvitationItemProps {
  dashboardTitle: Invitation['dashboard']['title'];
  inviterNickname: Invitation['inviter']['nickname'];
}
