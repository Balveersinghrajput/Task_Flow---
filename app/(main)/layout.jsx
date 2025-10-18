import { Toaster } from 'sonner';

const Layout = ({ children }) => {
  return <div className="container mx-auto mt-5 px-4">{children}
   <Toaster position="bottom-right" richColors /> 
  </div>;
};

export default Layout;
