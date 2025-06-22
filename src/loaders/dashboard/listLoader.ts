import { getInvitationList } from '@/apis/invitation';
import { invitationListSchema } from '@/schemas/invitation';
import handleLoaderError from '@/utils/error/handleLoaderError';

import type { DashboardListLoaderData } from './types';

export const loader = async (): Promise<DashboardListLoaderData> => {
  try {
    const rawInvitationList = await getInvitationList({});
    const invitationList = invitationListSchema.parse(rawInvitationList);

    return { invitationList };
  } catch (error) {
    return handleLoaderError(error);
  }
};
