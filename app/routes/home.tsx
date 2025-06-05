import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Kabana' }, { name: 'description', content: 'Welcome to Kabana!' }];
}

export default function Home() {
  return <>이게 맞나?</>;
}
