import type { Invitation } from '@/schemas/invitation';

export interface InvitationItemProps {
  id: Invitation['id'];
  dashboardTitle: Invitation['dashboard']['title'];
  inviterNickname: Invitation['inviter']['nickname'];
  onResponse: (id: number, response: boolean) => Promise<void>;
}
