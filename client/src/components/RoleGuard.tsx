import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

interface RoleGuardProps {
  roles: string[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ roles, children }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/401');
      return;
    }

    if (user && !roles.includes(user.role)) {
      router.push('/403');
      return;
    }
  }, [isAuthenticated, user, roles, router, isLoading]);

  if (isLoading || !isAuthenticated || (user && !roles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
