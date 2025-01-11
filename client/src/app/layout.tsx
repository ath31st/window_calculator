import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './_theme/theme';
import './_styles/variables.css';
import './_styles/globals.css';
import { CssBaseline } from '@mui/material';
import AxiosInterceptorProvider from '@/providers/AxiosInterceptorProvider';
import AuthProvider from '@/providers/AuthProvider';
import ErrorSnackbar from '@/components/errors/ErrorSnackbar';
import InfiniteBackground from '@/components/backgrounds/InfiniteBackground';
import localFont from 'next/font/local';

const customFont = localFont({
  src: '../../public/fonts/AVFontimer-Regular.ttf', 
});

export const metadata = {
  title: 'Window calculator',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={customFont.className}>
        <InfiniteBackground imageUrl="/images/win.jpg" />
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <AxiosInterceptorProvider>
              <AuthProvider>
                <CssBaseline />
                <ErrorSnackbar />
                {children}
              </AuthProvider>
            </AxiosInterceptorProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
