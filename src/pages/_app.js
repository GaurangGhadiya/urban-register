'use client';
import "@/styles/globals.css";
import store from "@/utils/store";
import { Provider } from "react-redux";
import { appWithTranslation } from 'next-i18next';
import '../../i18n'
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "@/utils/LoadingContext";
import { AuthProvider } from "@/utils/AuthContext";
import useSessionCheck from "@/utils/useSessionCheck";


function MyApp({ Component, pageProps }) {
  useSessionCheck();
  return (
    <AuthProvider>
      <LoadingProvider>
        <Provider store={store}>
          <Toaster position="top-center" containerStyle={{
            top: 100,
          }} />
          <Component {...pageProps} />
        </Provider>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
