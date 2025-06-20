import type { ActionFunctionArgs } from 'react-router';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  // const detailIdString: string | undefined = params.dashboardId;
  const formData = await request.formData();
  const image = formData.get('imageUrl');
  const title = formData.get('title');

  console.log('✅ action 함수 호출됨!');
  console.log('📦 formData entries:', [...formData.entries()]);

  console.log('📦 title:', title);
  console.log('📎 image:', image);

  return null;
};
