import AdminDashboard from './AdminDashboard';

export const metadata = {
  title: 'Admin - País do Mês',
};

export default function AdminPage() {
  // In a real app, you'd use NextAuth or a middleware session check here.
  return <AdminDashboard />;
}
