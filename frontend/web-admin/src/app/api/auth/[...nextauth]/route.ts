import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'admin@nexus.ai' && credentials?.password === 'password') {
          return { id: '1', name: 'Admin', email: 'admin@nexus.ai' };
        }
        return null;
      }
    })
  ],
  pages: { signIn: '/login' }
});

export { handler as GET, handler as POST };