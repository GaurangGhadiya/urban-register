import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookieValues } from './cookies';
import { getImagePath } from './CustomImagePath';

const useSessionCheck = () => {
  const router = useRouter();

  const apicall = async () => {
    try {
      // alert("try")
      const response = await fetch(getImagePath('/api/check-session'));
      if (response.status === 401) {

        router.push("/")
        // router.push('/'); // Redirect to home page if session expired
      }
    } catch (error) {
      // alert("catch")

      console.error('Error checking session:', error);
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const getValu = await getCookieValues('userData')
      if (getValu) {
        apicall()
      }
      else if (window.location.pathname != "/urbanregister") {


        router.push("/")

      }

    };

    // Check session on mount

    checkSession();

    // Set up interval to check session periodically
    const intervalId = setInterval(checkSession, 60 * 1000); // Check every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [router]);
};

export default useSessionCheck;
